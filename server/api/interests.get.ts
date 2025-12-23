// server/api/interests.get.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '~~/src/db/schema'; // adjust path if your schema is elsewhere

// Get connection string from environment (loaded via .env automatically in Nuxt)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw createError({
    statusCode: 500,
    statusMessage: 'DATABASE_URL is not set'
  });
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

export default defineEventHandler(async (event) => {
  try {
    const interests = await db
      .select({
        id: schema.interests.id,
        name: schema.interests.name,
        slug: schema.interests.slug,
        icon: schema.interests.icon,
        color: schema.interests.color
      })
      .from(schema.interests)
      .orderBy(schema.interests.name); // optional: sort alphabetically

    return {
      success: true,
      data: interests
    };
  } catch (error) {
    console.error('Failed to fetch interests:', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load interests'
    });
  }
});
