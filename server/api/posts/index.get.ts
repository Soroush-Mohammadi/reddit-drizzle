import { db } from '~~/src/db';
import { posts, postVotes, comments } from '~~/src/db/schema';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,

      // Score
      score: sql<number>`COALESCE(SUM(${postVotes.value}), 0)`,

      // Comment count
      commentCount: sql<number>`COALESCE(COUNT(${comments.id}), 0)`
    })
    .from(posts)
    .leftJoin(postVotes, eq(posts.id, postVotes.postId))
    .leftJoin(comments, eq(posts.id, comments.postId))
    .groupBy(posts.id);

  return allPosts;
});
