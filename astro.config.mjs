import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://kibauer.de/',
  integrations: [
    preact(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true
    })
  ],
  // These were specific redirects we needed for our podcast, if you do not have any routes to redirect, you can safely remove this.
  redirects: {
    //'/hot-takes-tan-stack-and-open-source-with-tanner-linsley':
    //  '/hot-takes-tanstack-and-open-source-with-tanner-linsley',
    //'/creating-code-pen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier':
    //  'creating-codepen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier',
    //'/coding-languages-ai-and-the-evolution-of-game-development-with-phillip-winston':
    //  '/coding-languages-ai-and-the-evolution-of-game-development-with-philip-winston'
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    domains: [],
    remotePatterns: []
  }
});
