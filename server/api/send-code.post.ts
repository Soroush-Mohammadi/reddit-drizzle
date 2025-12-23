import { emailSchema } from '~~/schema/auth.schema';
import { verification } from '~~/src/db/schema';
import { db } from '~~/src/db';
import { generateVerificationCode } from '~~/server/utils/generateCode';
import { hashCode } from '~~/server/utils/hashCode';
import { sendVerificationEmail } from '~~/server/utils/sendVerficationEmail';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parsed = emailSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0].message
    });
  }

  const { email } = parsed.data;
  /* 
  const code = generateVerificationCode();
  const value = hashCode(code);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // 🔁 Remove previous codes for this email
  await db.delete(verification).where(eq(verification.identifier, email));

  await db.insert(verification).values({
    id: randomUUID(),
    identifier: email,
    value,
    expiresAt
  });

  await sendVerificationEmail(email, code); */

  return { success: true };
});
