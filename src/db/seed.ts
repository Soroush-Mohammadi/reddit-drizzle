// seed.ts
import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import * as schema from './schema'; // your path

const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
const db = drizzle(sql, { schema });

async function main() {
  console.log('Seeding database...');

  // 1. Categories — unchanged
  const categoriesData = [
    { name: 'Technology', slug: 'technology' },
    { name: 'Gaming', slug: 'gaming' },
    { name: 'Science', slug: 'science' },
    { name: 'Memes', slug: 'memes' },
    { name: 'Aww', slug: 'aww' },
    { name: 'AskReddit', slug: 'askreddit' },
    { name: 'Programming', slug: 'programming' },
    { name: 'Funny', slug: 'funny' },
    { name: 'World News', slug: 'worldnews' },
    { name: 'JavaScript', slug: 'javascript' }
  ];

  await db
    .insert(schema.categories)
    .values(categoriesData)
    .onConflictDoNothing();
  console.log(`Seeded ${categoriesData.length} categories`);

  // 2. Users — fixed async mapping + faker methods
  const usersData = await Promise.all(
    Array.from({ length: 15 }, async () => ({
      id: faker.string.uuid(),
      name: faker.internet.username(),
      email: faker.internet.email().toLowerCase(),
      emailVerified: faker.datatype.boolean(),
      image: faker.image.avatar(),
      createdAt: faker.date.past(3), // fixed: number, not object
      updatedAt: new Date(),
      password: await bcrypt.hash('password123', 10)
    }))
  );

  await db.insert(schema.user).values(usersData).onConflictDoNothing();
  console.log(`Seeded ${usersData.length} users`);

  // 3. Communities
  const allUsers = await db.select().from(schema.user).limit(5);

  const communitiesData = Array.from({ length: 10 }, () => ({
    name: `r/${faker.lorem.slug(1)}`,
    slug: faker.lorem.slug(1).toLowerCase(),
    description: faker.lorem.sentences(faker.number.int({ min: 1, max: 4 })), // safe
    ownerId: faker.helpers.arrayElement(allUsers).id,
    createdAt: faker.date.past(2) // fixed
  }));

  await db
    .insert(schema.communities)
    .values(communitiesData)
    .onConflictDoNothing();
  console.log(`Seeded ${communitiesData.length} communities`);

  // 4. Posts
  const allCommunities = await db.select().from(schema.communities);

  const allPostsData = Array.from({ length: 20 }, () => ({
    title: faker.lorem.sentence({ min: 5, max: 15 }), // safe syntax
    content: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 4 })), // safe
    communityId: faker.helpers.arrayElement(allCommunities).id,
    authorId: faker.helpers.arrayElement(allUsers).id,
    createdAt: faker.date.recent(30), // fixed
    updatedAt: new Date()
  }));

  await db.insert(schema.posts).values(allPostsData);
  console.log(`Seeded ${allPostsData.length} posts`);

  // 5. Comments
  const allPosts = await db.select().from(schema.posts).limit(5);

  const commentsData = allPosts.flatMap((post) =>
    Array.from({ length: 5 }, () => ({
      content: faker.lorem.sentences(faker.number.int({ min: 1, max: 5 })), // safe
      postId: post.id,
      authorId: faker.helpers.arrayElement(allUsers).id,
      createdAt: faker.date.recent(30)
    }))
  );

  await db.insert(schema.comments).values(commentsData);
  console.log(`Seeded ${commentsData.length} comments`);

  console.log('Database seeded! All users: password123');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
