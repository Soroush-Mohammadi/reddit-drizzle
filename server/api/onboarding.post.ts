// server/api/onboarding.post.ts
import { db } from '~~/src/db';
import { userInterests, interests } from '~~/src/db/schema';
import { auth } from '~~/lib/auth';
import { inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event);
  if (!session) throw createError({ statusCode: 401 });

  const body = await readBody(event);

  if (!body.interests?.length) {
    return { success: true };
  }

  // Convert slugs → IDs
  const interestRows = await db
    .select({
      id: interests.id,
      slug: interests.slug
    })
    .from(interests)
    .where(inArray(interests.slug, body.interests));

  const rows = interestRows.map((interest) => ({
    userId: session.user.id,
    interestId: interest.id
  }));

  await db.insert(userInterests).values(rows);

  return { success: true };
});
