import { defineCollection, z } from 'astro:content';

// Define the transcripts collection
export const collections = {
  transcripts: defineCollection({
    type: 'content', // 'content' is for Markdown/MDX files
    schema: z.object({
      title: z.string().optional(),
      episodeNumber: z.string().optional(),
      // Add hosts and guests to the transcript schema
      hosts: z.array(z.string()).optional(),
      guests: z.array(z.string()).optional()
    })
  }),
  // Define a new people collection
  people: defineCollection({
    type: 'data', // 'data' is for YAML/JSON/etc. 
    schema: z.object({
      id: z.string(),
      name: z.string(),
      img: z.string().optional(),
      bio: z.string().optional(),
      isHost: z.boolean().optional().default(false),
      links: z.object({
        twitter: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
      }).optional()
    })
  })
};
