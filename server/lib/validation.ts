// server/validation/schemas.ts
import { z } from 'zod'

// 1. Create community (r/nuxtjs, r/memes, etc.)
export const createCommunitySchema = z.object({
  name: z.string().min(3).max(21).regex(/^[a-zA-Z0-9_]+$/, {
    message: "Only letters, numbers and underscores allowed",
  }),
  description: z.string().max(500).optional(),
  // You can add categoryId later when you implement categories UI
})

// 2. Create post
export const createPostSchema = z.object({
  title: z.string().min(3).max(300, "Title too long"),
  content: z.string().min(1).max(40000).optional(), // self-text post
  communitySlug: z.string().min(1), // we use slug on frontend usually
  // or communityId: z.number().int().positive(), // alternative
})

// 3. Edit post (basically same as create but all fields optional)
export const editPostSchema = createPostSchema.partial().extend({
  title: z.string().min(3).max(300).optional(),
})

// 4. Create comment/reply
export const createCommentSchema = z.object({
  content: z.string().min(1).max(10000),
  postId: z.number().int().positive(),
  parentId: z.number().int().positive().optional(), // for replies
})

// 5. Vote (post or comment)
export const voteSchema = z.object({
  value: z.enum(['-1', '0', '1']).transform(Number), // accepts string from frontend
  // postId or commentId will be in route params usually
})