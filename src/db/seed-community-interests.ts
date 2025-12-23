// seed-community-interests.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { eq, inArray } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// Define keyword → interest mappings
const keywordToInterests: Record<string, string[]> = {
  // Tech & Programming
  tech: ['technology', 'gadgets', 'software-development'],
  program: ['technology', 'software-development'],
  code: ['technology', 'software-development'],
  dev: ['software-development'],
  web: ['technology'],

  // Gaming
  game: ['gaming', 'pc-gaming', 'entertainment'],
  play: ['gaming', 'entertainment'],
  gamer: ['gaming'],

  // Entertainment / Fun
  funny: ['funny', 'memes', 'entertainment'],
  meme: ['memes', 'funny'],
  lol: ['funny'],
  humor: ['funny'],

  // Animals / Cute
  cat: ['aww', 'animals'],
  dog: ['aww', 'animals'],
  pet: ['aww', 'animals'],
  cute: ['aww'],

  // News & Science
  news: ['news', 'world-news'],
  science: ['science'],
  space: ['science', 'nasa'],
  nasa: ['nasa', 'science'],

  // Finance
  money: ['finance'],
  stock: ['finance'],
  invest: ['finance'],

  // Food
  food: ['food'],
  cook: ['food'],
  recipe: ['food'],

  // Art & Design
  art: ['art'],
  draw: ['art'],
  design: ['art'],

  // Default fallback
  r: ['entertainment'] // catch-all for generic r/ communities
};

async function main() {
  console.log(
    '🔗 Auto-tagging communities with interests based on name keywords...'
  );

  // Get all communities
  const communities = await db
    .select({
      id: schema.communities.id,
      name: schema.communities.name,
      slug: schema.communities.slug
    })
    .from(schema.communities);

  let taggedCount = 0;

  for (const community of communities) {
    const lowerName = community.name.toLowerCase();

    // Find all matching keywords
    const matchedInterests = new Set<string>();

    for (const [keyword, interests] of Object.entries(keywordToInterests)) {
      if (lowerName.includes(keyword)) {
        interests.forEach((i) => matchedInterests.add(i));
      }
    }

    // Fallback: if no match, add a generic one
    if (matchedInterests.size === 0) {
      matchedInterests.add('entertainment');
    }

    const interestSlugs = Array.from(matchedInterests);

    // Get interest IDs
    const interests = await db
      .select({ id: schema.interests.id })
      .from(schema.interests)
      .where(inArray(schema.interests.slug, interestSlugs));

    if (interests.length === 0) continue;

    // Insert links
    const values = interests.map((i) => ({
      communityId: community.id,
      interestId: i.id
    }));

    await db
      .insert(schema.communityInterests)
      .values(values)
      .onConflictDoNothing();

    console.log(
      `✅ ${community.name} (${community.slug}) → ${interestSlugs.join(', ')}`
    );
    taggedCount++;
  }

  console.log(`\n🎉 Done! Tagged ${taggedCount} communities with interests.`);
  console.log(
    `   Now new users will get personalized feeds based on their choices!`
  );
}

main().catch((err) => {
  console.error('❌ Failed:', err);
});
