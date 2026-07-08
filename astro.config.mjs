import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tools.borck.education',
  redirects: {
    // Former on-site tool pages now live on each tool's own domain. These
    // preserve old links and pass SEO signal to the canonical home (Astro
    // emits a noindex meta-refresh page with rel=canonical to the target).
    '/talk-buddy/': 'https://talkbuddy.eduserver.au',
    '/study-buddy/': 'https://studybuddy.eduserver.au',
    '/career-compass/': 'https://careercompass.eduserver.au',
    '/debrief/': 'https://debrief.eduserver.au',
    '/insight-lens/': 'https://insightlens.eduserver.au',
    '/document-lens/': 'https://documentlens.eduserver.au',
    // deep-talk was renamed to debrief (July 2026); send straight to its home.
    '/deep-talk/': 'https://debrief.eduserver.au',
  },
});
