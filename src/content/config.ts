import { defineCollection, z } from 'astro:content';

// Define the transcripts collection
export const collections = {
  transcripts: defineCollection({
    type: 'content', // 'content' is for Markdown/MDX files
    schema: z.object({
      // You can add frontmatter fields here if needed
      // For example, if your transcripts have titles or other metadata
      title: z.string().optional(),
      episodeNumber: z.string().optional()
    })
  })
};