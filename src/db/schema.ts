import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean
} from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  age: integer('age'),
  email: text('email').notNull().unique()
});

// ------------------------------------------------------

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

//---------------------------------------------
export const communities = pgTable('communities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 120 }).notNull().unique(), // /r/nuxt
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
});

export const communitiesRelations = relations(communities, ({ many }) => ({
  posts: many(posts)
}));

export const communitySubscriptions = pgTable('community_subscriptions', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  communityId: integer('community_id')
    .notNull()
    .references(() => communities.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  communityId: integer('community_id')
    .notNull()
    .references(() => communities.id, { onDelete: 'cascade' }),
  authorId: text('author_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  community: one(communities, {
    fields: [posts.communityId],
    references: [communities.id]
  }),

  author: one(user, {
    fields: [posts.authorId],
    references: [user.id]
  }),

  comments: many(comments)
}));

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  authorId: text('author_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  parentId: integer('parent_id').references(() => comments.id), // optional nested comments
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  }),

  author: one(user, {
    fields: [comments.authorId],
    references: [user.id]
  })
}));

export const postVotes = pgTable('post_votes', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  value: integer('value').notNull(), // 1 or -1
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique()
});

export const communityCategories = pgTable('community_categories', {
  id: serial('id').primaryKey(),
  communityId: integer('community_id')
    .notNull()
    .references(() => communities.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id)
});

// New table for interest categories (topics)
export const interests = pgTable('interests', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), // e.g., "Art", "Gaming", "Sports"
  slug: varchar('slug', { length: 100 }).notNull().unique(), // e.g., "art", "gaming"
  icon: varchar('icon', { length: 255 }).notNull(), // URL or emoji or icon name
  // Optional: color for the circle background in UI
  color: varchar('color', { length: 7 }) // e.g., "#FF6B6B"
});

// Junction table: which interests the user selected
export const userInterests = pgTable('user_interests', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  interestId: integer('interest_id')
    .notNull()
    .references(() => interests.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Optional: make it unique so user can't select same interest twice
// Add this in schema if using Drizzle:
// .uniqueIndex("user_interests_unique_idx", ["userId", "interestId"])

// schema.ts
export const communityInterests = pgTable('community_interests', {
  id: serial('id').primaryKey(),
  communityId: integer('community_id')
    .notNull()
    .references(() => communities.id, { onDelete: 'cascade' }),
  interestId: integer('interest_id')
    .notNull()
    .references(() => interests.id, { onDelete: 'cascade' })
});
