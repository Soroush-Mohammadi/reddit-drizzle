// server/api/check-username.post.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '~~/src/db/schema';
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
const db = drizzle(sql, { schema });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username } = body;

  if (!username || typeof username !== 'string') {
    throw createError({ statusCode: 400, message: 'Username required' });
  }

  // Basic format check
  if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username)) {
    return { available: false };
  }

  try {
    const existing = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.name, username))
      .limit(1);

    return { available: existing.length === 0 };
  } catch (error) {
    console.error('Username check failed:', error);
    throw createError({ statusCode: 500, message: 'Database error' });
  }
});
