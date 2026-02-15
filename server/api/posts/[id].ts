import { db } from '~~/src/db';
import { posts } from '~~/src/db/schema';
import { eq } from 'drizzle-orm';

// server/api/posts/[id].ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: { community: true }
  });

  return post;
});
