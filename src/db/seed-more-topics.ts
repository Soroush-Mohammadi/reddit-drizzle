// seed-more-topics.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema'; // same path as before

const connectionString = process.env.DATABASE_URL!;
if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

const moreTopics = [
  // Tech & Science
  {
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    icon: '🤖',
    color: '#6366F1'
  },
  {
    name: 'Machine Learning',
    slug: 'machine-learning',
    icon: '🧠',
    color: '#8B5CF6'
  },
  {
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    icon: '🔒',
    color: '#EF4444'
  },
  {
    name: 'Software Development',
    slug: 'software-development',
    icon: '💻',
    color: '#10B981'
  },
  { name: 'PC Gaming', slug: 'pc-gaming', icon: '🖥️', color: '#F59E0B' },
  { name: 'PC Building', slug: 'pc-building', icon: '🛠️', color: '#F97316' },
  { name: 'Gadgets', slug: 'gadgets', icon: '📱', color: '#06B6D4' },
  { name: 'Apple', slug: 'apple', icon: '🍎', color: '#1F2937' },
  { name: 'Google', slug: 'google', icon: '🔍', color: '#3B82F6' },
  { name: 'Microsoft', slug: 'microsoft', icon: '🪟', color: '#00A3E0' },
  { name: 'Tesla', slug: 'tesla', icon: '🚗', color: '#EF4444' },
  { name: 'SpaceX', slug: 'spacex', icon: '🚀', color: '#1E40AF' },
  {
    name: 'Electric Vehicles',
    slug: 'electric-vehicles',
    icon: '⚡',
    color: '#10B981'
  },
  { name: 'NASA', slug: 'nasa', icon: '🛰️', color: '#1E293B' },
  { name: 'Drones', slug: 'drones', icon: '🚁', color: '#8B5CF6' },
  {
    name: 'Virtual Reality',
    slug: 'virtual-reality',
    icon: '🥽',
    color: '#EC4899'
  },
  { name: '3D Printing', slug: '3d-printing', icon: '🖨️', color: '#F59E0B' },
  { name: 'Smart Home', slug: 'smart-home', icon: '🏠', color: '#14B8A6' },
  {
    name: 'Home Networking',
    slug: 'home-networking',
    icon: '📶',
    color: '#6366F1'
  },
  {
    name: 'Tech Startups',
    slug: 'tech-startups',
    icon: '💡',
    color: '#FBBF24'
  },

  // Add more categories as needed (Entertainment, Sports, etc.)
  // Example:
  { name: 'Movies', slug: 'movies', icon: '🎬', color: '#EF4444' },
  { name: 'Music', slug: 'music', icon: '🎵', color: '#8B5CF6' }
  // ... keep going!
];

async function main() {
  console.log('🌱 Seeding more specific topics...');

  await db
    .insert(schema.interests)
    .values(moreTopics)
    .onConflictDoNothing({ target: schema.interests.slug });

  console.log(`✅ Seeded ${moreTopics.length} additional topics`);
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
