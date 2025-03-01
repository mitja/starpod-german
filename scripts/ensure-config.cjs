#!/usr/bin/env node

/**
 * This script ensures that the content collection config file exists
 * and includes both the transcripts and people collections.
 */

const fs = require('fs');
const path = require('path');

// Define the content config path
const contentConfigPath = path.join(__dirname, '..', 'src', 'content', 'config.ts');

// Content config file template
const contentConfigTemplate = `import { defineCollection, z } from 'astro:content';

// Define the collections
export const collections = {
  // Transcripts collection (for podcast episode transcripts)
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
  
  // People collection (for podcast hosts and guests)
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
`;

// Ensure the content directory exists
const contentDir = path.join(__dirname, '..', 'src', 'content');
if (!fs.existsSync(contentDir)) {
  console.log(`Creating content directory: ${contentDir}`);
  fs.mkdirSync(contentDir, { recursive: true });
}

// Check if config.ts exists
if (!fs.existsSync(contentConfigPath)) {
  console.log('Content config file does not exist. Creating it...');
  fs.writeFileSync(contentConfigPath, contentConfigTemplate, 'utf8');
  console.log(`Created content config file: ${contentConfigPath}`);
} else {
  console.log('Content config file already exists.');
  
  // Check if it has both collections
  const configContent = fs.readFileSync(contentConfigPath, 'utf8');
  
  if (!configContent.includes('transcripts:') || !configContent.includes('people:')) {
    console.log('Content config file is missing one or both collections. Updating it...');
    fs.writeFileSync(contentConfigPath, contentConfigTemplate, 'utf8');
    console.log(`Updated content config file: ${contentConfigPath}`);
  } else {
    console.log('Content config file already contains both collections.');
  }
}

console.log('Content config check complete.');
