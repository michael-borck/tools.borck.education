import toolsData from './tools.data.json';

export interface ToolFeature {
  title: string;
  desc: string;
}

export interface Tool {
  id: string;
  name: string;
  type: string;
  tags: string[];
  shortDesc: string;
  page?: string;
  github?: string;
  pypi?: string;
  web?: string;
  download?: { win?: boolean; mac?: boolean; linux?: boolean };
  pip?: string;
  brand?: string;
  features?: ToolFeature[];
}

export const tools: Tool[] = toolsData as Tool[];

// Goal shelves, grouped by audience. A tool tagged with goals from both
// audiences (e.g. talk-buddy: practice + feedback) appears in both sections —
// that's how dual-purpose lecturer/student apps are expressed.
export interface Goal {
  key: string;
  label: string;
  blurb: string;
  aud: 'staff' | 'students';
}

export const goals: Goal[] = [
  { key: 'feedback', label: 'Give better feedback',     blurb: 'Formative feedback and critique, at scale.',                        aud: 'staff' },
  { key: 'engage',   label: 'Engage your class',        blurb: 'Live polls, discussion and participation.',                          aud: 'staff' },
  { key: 'grade',    label: 'Grade & assess',           blurb: 'Marking support and assessment design.',                             aud: 'staff' },
  { key: 'create',   label: 'Create course content',    blurb: 'Slides, case studies, simulations and curriculum.',                  aud: 'staff' },
  { key: 'analyze',  label: 'Analyse documents & data', blurb: 'Pull insight out of documents and datasets.',                        aud: 'staff' },
  { key: 'research', label: 'Research & referencing',   blurb: 'Citations, papers and reading support.',                             aud: 'staff' },
  { key: 'infra',    label: 'Run AI privately',         blurb: 'Self-host the AI behind these tools on your own hardware.',           aud: 'staff' },
  { key: 'practice', label: 'Practise & prepare',       blurb: 'Safe spaces to rehearse — interviews, conversations, scenarios.',    aud: 'students' },
  { key: 'career',   label: 'Career & writing help',    blurb: 'CVs, professional writing and finding your voice.',                  aud: 'students' },
];

export const audSections = [
  { aud: 'staff' as const,    title: 'For your teaching', sub: 'Tools you use to prepare, run and mark your classes.' },
  { aud: 'students' as const, title: 'For your students', sub: 'Tools to share with students — several import scenarios you create with the teaching tools above.' },
];

// The rotating spotlight on the home page: a hand-picked advert, not a catalog.
// Order matters; ids missing from tools.data.json are skipped.
export const spotlightIds = [
  'talk-buddy',
  'playable-lessons',
  'lesson-loom',
  'ensayo',
  'curriculum-curator',
  'feed-forward',
  'puente',
];
