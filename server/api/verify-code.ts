// server/api/verify-code.post.ts
import { db } from '~~/src/db';
import { verification } from '~~/src/db/schema';
import { eq, and, gte } from 'drizzle-orm';
import { hashCode } from '~~/server/utils/hashCode'; // assuming you have this util for consistent hashing

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.code || typeof body.code !== 'string' || body.code.length !== 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid code format'
    });
  }

  // You'll need the email – it's stored in your auth flow store
  // But for security, better to pass it in the body (from the client)
  // Update your client to send { email, code }
  const { email, code } = body;

  if (!email || typeof email !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    });
  }

  const hashedCode = hashCode(code.trim());

  const now = new Date();

  const record = await db
    .select()
    .from(verification)
    .where(
      and(
        eq(verification.identifier, email),
        eq(verification.value, hashedCode),
        gte(verification.expiresAt, now)
      )
    )
    .limit(1);

  if (!record.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or expired code'
    });
  }

  // Code is valid → delete it to prevent reuse
  await db.delete(verification).where(eq(verification.identifier, email));

  // Here you would normally mark the user's email as verified in the user table
  // But since you're likely using Better Auth for the actual sign-up later,
  // just return success for now.
  // If you have a user already created (pre-signup verification), update user.emailVerified = true

  return { success: true, message: 'Email verified successfully' };
});
