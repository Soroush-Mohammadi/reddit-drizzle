// server/api/feed.get.ts

import { desc, eq, inArray, sql, count } from 'drizzle-orm';
import { db } from '~~/src/db/index';
import {
  posts,
  communities,
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

  /*
   --------------------------------------------------
   Fallback feed (used when no user OR no interests)
   --------------------------------------------------
  */
  const getFallbackFeed = () =>
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

        score: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`.mapWith(
          Number
        ),
        commentCount: count(comments.id).mapWith(Number)
      })
      .from(posts)
      .leftJoin(communities, eq(communities.id, posts.communityId))
      .leftJoin(postVotes, eq(postVotes.postId, posts.id))
      .leftJoin(comments, eq(comments.postId, posts.id))
      .groupBy(posts.id, communities.id)
      .orderBy(desc(posts.createdAt))
      .limit(25);

  /*
   ------------------------
   Case 1: no logged-in user
   ------------------------
  */
  if (!currentUserId) {
    return getFallbackFeed();
  }

  /*
   ------------------------
   Load user interests
   ------------------------
  */
  const interests = await db
    .select({ id: userInterests.interestId })
    .from(userInterests)
    .where(eq(userInterests.userId, currentUserId));

  const interestIds = interests.map((i) => i.id);

  /*
   ------------------------
   Case 2: user has no interests
   ------------------------
  */
  if (!interestIds.length) {
    return getFallbackFeed();
  }

  /*
   ------------------------
   Personalized feed
   ------------------------
  */
  const results = await db
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

      score: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`.mapWith(Number),
      commentCount: count(comments.id).mapWith(Number)
    })
    .from(posts)
    .leftJoin(communities, eq(communities.id, posts.communityId))
    .leftJoin(
      communityInterests,
      eq(communityInterests.communityId, communities.id)
    )
    .leftJoin(postVotes, eq(postVotes.postId, posts.id))
    .leftJoin(comments, eq(comments.postId, posts.id))
    .where(inArray(communityInterests.interestId, interestIds))
    .groupBy(posts.id, communities.id)
    .orderBy(desc(posts.createdAt))
    .limit(50);

  return results;
});
