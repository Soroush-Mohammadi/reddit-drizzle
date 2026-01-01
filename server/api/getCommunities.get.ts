import { db } from '~~/src/db';
import { communities } from '~~/src/db/schema';

// server/api/getCommunities.get.ts

export default defineEventHandler(async () => {
  const communityNames = await db
    .select({
      name: communities.name
    })
    .from(communities);

  return communityNames;
});
