// seed-real-communities.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema'; // ← make sure this path is correct!

const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

// ← REPLACE THIS WITH A REAL USER ID FROM YOUR DB
const defaultOwnerId = '81qegE1Do59UJfJljLhqRCuhiuSXN4DA'; // ← put your real user.id here

const realCommunities = [
  {
    name: 'r/gaming',
    slug: 'gaming',
    description: 'All about games',
    ownerId: defaultOwnerId
  },
  {
    name: 'r/programming',
    slug: 'programming',
    description: 'Code and dev',
    ownerId: defaultOwnerId
  },
  {
    name: 'r/aww',
    slug: 'aww',
    description: 'Cute animals',
    ownerId: defaultOwnerId
  },
  {
    name: 'r/technology',
    slug: 'technology',
    description: 'Tech news',
    ownerId: defaultOwnerId
  },
  {
    name: 'r/funny',
    slug: 'funny',
    description: 'Memes and humor',
    ownerId: defaultOwnerId
  },
  {
    name: 'r/art',
    slug: 'art',
    description: 'Art and creativity',
    ownerId: defaultOwnerId
  }
];

async function main() {
  console.log('🌱 Seeding real communities with valid owner...');

  await db
    .insert(schema.communities)
    .values(realCommunities)
    .onConflictDoNothing();

  console.log('✅ Successfully added real communities!');
  console.log('   Now run: npx tsx seed-community-interests.ts');
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
