// server/api/feed.get.ts
import { desc, eq, inArray, sql } from 'drizzle-orm';
import { db } from '~~/src/db/index';
import {
  posts,
  communities,
  user,
  postVotes,
  comments,
  userInterests,
  communityInterests
} from '~~/src/db/schema';
import { auth } from '~~/lib/auth';

export default defineEventHandler(async (event) => {
  let currentUserId: string | null = null;

  try {
    const session = await auth.api.getSession(event);
    currentUserId = session?.user?.id || null;
  } catch {}

  // reusable base query
  const baseQuery = () =>
    db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,

        community: {
          id: communities.id,
          name: communities.name,
          slug: communities.slug
        },

        author: {
          name: user.name
        },

        score: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`,
        commentCount: sql<number>`COALESCE(COUNT(${comments.id}), 0)`
      })
      .from(posts)
      .leftJoin(communities, eq(communities.id, posts.communityId))
      .leftJoin(user, eq(user.id, posts.authorId))
      .leftJoin(postVotes, eq(postVotes.postId, posts.id))
      .leftJoin(comments, eq(comments.postId, posts.id))
      .groupBy(posts.id, communities.id, user.id);

  // Case 1 — no user
  if (!currentUserId) {
    return baseQuery().orderBy(desc(posts.createdAt)).limit(25);
  }

  // load interests
  const interests = await db
    .select({ id: userInterests.interestId })
    .from(userInterests)
    .where(eq(userInterests.userId, currentUserId));

  const interestIds = interests.map((i) => i.id);

  // Case 2 — user without interests
  if (!interestIds.length) {
    return baseQuery().orderBy(desc(posts.createdAt)).limit(25);
  }

  // Case 3 — personalized feed
  const feed = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,

      community: {
        id: communities.id,
        name: communities.name,
        slug: communities.slug
      },

      author: {
        name: user.name
      },

      score: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`,
      commentCount: sql<number>`COALESCE(COUNT(${comments.id}), 0)`
    })
    .from(posts)
    .leftJoin(communities, eq(communities.id, posts.communityId))
    .leftJoin(
      communityInterests,
      eq(communityInterests.communityId, communities.id)
    )
    .leftJoin(user, eq(user.id, posts.authorId))
    .leftJoin(postVotes, eq(postVotes.postId, posts.id))
    .leftJoin(comments, eq(comments.postId, posts.id))
    .where(inArray(communityInterests.interestId, interestIds))
    .groupBy(posts.id, communities.id, user.id)
    .orderBy(desc(posts.createdAt))
    .limit(50);

  return feed;
});
