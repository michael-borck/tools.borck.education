import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tools.borck.education',
  redirects: {
    // deep-talk was renamed to debrief (July 2026); keep the old URL working
    '/deep-talk/': '/debrief/',
  },
});
