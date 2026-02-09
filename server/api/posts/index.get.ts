import { db } from '~~/src/db';
import { posts, postVotes, comments, communities } from '~~/src/db/schema';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const allPosts = await db
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

      // Score
      score: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`,

      // Comment count
      commentCount: sql<number>`COALESCE(COUNT(${comments.id}), 0)`
    })
    .from(posts)
    .leftJoin(communities, eq(posts.communityId, communities.id))
    .leftJoin(postVotes, eq(posts.id, postVotes.postId))
    .leftJoin(comments, eq(posts.id, comments.postId))
    .groupBy(posts.id, communities.id);

  return allPosts;
});
