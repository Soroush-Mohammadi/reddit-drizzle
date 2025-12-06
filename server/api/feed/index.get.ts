// server/api/feed.get.ts
import { desc, eq, sql, count } from 'drizzle-orm'
import { db } from '~~/src/db/index' // your drizzle instance path
import { posts, communities, user, postVotes, comments } from '~~/src/db/schema'
import { auth } from '~~/lib/auth' 

export default defineEventHandler(async (event) => {
  // Optional: get current user if logged in (for showing their vote)
  let currentUserId: string | null = null
  try {
    const session = await auth.api.getSession(event) // Better-Auth helper
    currentUserId = session?.user?.id || null
  } catch {
    // not logged in → fine
  }

  const results = await db
    .select({
      post: {
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorId: posts.authorId,
        communityId: posts.communityId,
      },
      community: {
        name: communities.name,
        slug: communities.slug,
      },
      author: {
        name: user.name,
        image: user.image,
      },
      voteCount: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`.mapWith(Number),
      userVote: postVotes.value, // will be null if no vote
      commentCount: count(comments.id).mapWith(Number),
    })
    .from(posts)
    .leftJoin(communities, eq(communities.id, posts.communityId))
    .leftJoin(user, eq(user.id, posts.authorId))
    .leftJoin(postVotes, eq(postVotes.postId, posts.id)) // all votes
    .leftJoin(comments, eq(comments.postId, posts.id))
    .groupBy(
      posts.id,
      communities.id,
      communities.name,
      communities.slug,
      user.id,
      user.name,
      user.image,
      postVotes.value
    )
    .orderBy(desc(posts.createdAt)) // New first
    // .orderBy(sql`voteCount DESC, ${posts.createdAt} DESC`) // Hot-like
    .limit(50)

  return results
})