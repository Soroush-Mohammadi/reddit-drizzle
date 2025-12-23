// temp-get-user.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema'; // adjust path

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const users = await db
    .select({ id: schema.user.id, name: schema.user.name })
    .from(schema.user)
    .limit(5);
  console.log('Available users:', users);
}

main();
