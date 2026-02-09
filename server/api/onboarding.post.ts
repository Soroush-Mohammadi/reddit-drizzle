// server/api/onboarding.post.ts
import { db } from '~~/src/db';
import { userInterests } from '~~/src/db/schema';
import { auth } from '~~/lib/auth';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event);
  if (!session) throw createError({ statusCode: 401 });

  const body = await readBody(event);

  const rows = body.interests.map((slug: string) => ({
    userId: session.user.id,
    interestSlug: slug
  }));

  if (rows.length) {
    await db.insert(userInterests).values(rows);
  }

  return { success: true };
});
