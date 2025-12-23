// seed-interests.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema'; // adjust path if needed (same as your main seed)

const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

const interestsData = [
  { name: 'Art', slug: 'art', icon: '🎨', color: '#FF6B6B' },
  { name: 'Beauty', slug: 'beauty', icon: '💄', color: '#FF8EDE' },
  { name: 'Career', slug: 'career', icon: '💼', color: '#4ECDC4' },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    icon: '🎬',
    color: '#45B7D1'
  },
  { name: 'Finance', slug: 'finance', icon: '📈', color: '#96CEB4' },
  { name: 'Food', slug: 'food', icon: '🍴', color: '#FFEEAD' },
  { name: 'Gaming', slug: 'gaming', icon: '🎮', color: '#D4A5A5' },
  { name: 'News', slug: 'news', icon: '📰', color: '#9B59B6' },
  { name: 'Sports', slug: 'sports', icon: '⚾', color: '#3498DB' },
  { name: 'Technology', slug: 'technology', icon: '👩‍💻', color: '#1ABC9C' },
  { name: 'Travel', slug: 'travel', icon: '🗺️', color: '#F39C12' },
  { name: 'Wellness', slug: 'wellness', icon: '🌱', color: '#2ECC71' }
];

async function main() {
  console.log('🌱 Seeding interests...');

  await db
    .insert(schema.interests)
    .values(interestsData)
    .onConflictDoNothing({ target: schema.interests.slug });

  console.log(`✅ Successfully seeded ${interestsData.length} interests`);
  console.log('   (Safe to run multiple times — duplicates ignored)');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
