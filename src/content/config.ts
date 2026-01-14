import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    pinned: z.boolean().optional().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const reports = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    sourceUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, reports };
