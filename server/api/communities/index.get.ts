// server/api/communities/index.get.ts   (or .ts)

import { auth } from '~~/lib/auth' // your Better-Auth instance

export default defineEventHandler(async (event) => {
  // This is the correct way with Better-Auth in Nitro routes
  const session = await auth.api.getSession({ headers: event.headers })

  console.log('Session in /api/communities →', session?.user ?? 'not logged in')

  // Example: return some data
  return {
    message: 'Hello from protected API',
    userId: session?.user?.id ?? null,
    userName : session?.user?.name ?? null,
    communities: [
      { id: 1, name: 'Nuxt Lovers' },
      { id: 2, name: 'Vue Masters' },
    ]
  }
})