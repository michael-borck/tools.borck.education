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

export interface Book {
  id: string;
  name: string;
  track: string;
  subtitle: string;
  description: string;
  readUrl: string;
  amazonUrl: string;
}

export const tools: Tool[] = toolsData as Tool[];

export const books: Book[] = [
  {
    id: 'book-conversation-not-delegation',
    name: 'Conversation, Not Delegation',
    track: 'Methodology',
    subtitle: 'How to Think With AI, Not Just Use It',
    description: 'The foundational methodology. Covers the Conversation Loop, the VET framework, cognitive traps, and the principle of AI Last. For anyone who uses AI as a thinking tool.',
    readUrl: 'https://michael-borck.github.io/conversation-not-delegation',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GTF9F4Q2',
  },
  {
    id: 'book-partner-dont-police',
    name: "Partner, Don't Police",
    track: 'Business Education',
    subtitle: 'AI in the Business Classroom',
    description: 'Applies the methodology to business education across eight disciplines. Process-based assessment, AI-resilient design, and practical frameworks for educators.',
    readUrl: 'https://michael-borck.github.io/partner-dont-police',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GVHV54RS',
  },
  {
    id: 'book-converse-python',
    name: 'Converse Python, Partner AI',
    track: 'Python Track',
    subtitle: 'The Intentional Prompting Methodology',
    description: 'Intentional AI collaboration for programmers. The six-step methodology, two-chat workflow, structured prompting patterns, and scaling to complex projects.',
    readUrl: 'https://michael-borck.github.io/converse-python-partner-ai',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GVN9JTN4',
  },
  {
    id: 'book-think-python',
    name: 'Think Python, Direct AI',
    track: 'Python Track',
    subtitle: 'Computational Thinking for Beginners',
    description: 'Learn to think computationally and direct AI to help you build solutions. Twelve projects from temperature converters to GUI applications. For absolute beginners.',
    readUrl: 'https://michael-borck.github.io/think-python-direct-ai',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GVT2KHVX',
  },
  {
    id: 'book-code-python',
    name: 'Code Python, Consult AI',
    track: 'Python Track',
    subtitle: 'Python Fundamentals for the AI Era',
    description: "Learn Python through AI conversation, not textbook explanations. Every chapter uses the two-chat method: explore the concept, then build with it. For anyone who has used AI to write code and wants to understand what it produces.",
    readUrl: 'https://michael-borck.github.io/code-python-consult-ai',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GW5TWPC6',
  },
  {
    id: 'book-ship-python',
    name: 'Ship Python, Orchestrate AI',
    track: 'Python Track',
    subtitle: 'Professional Python in the AI Era',
    description: 'One opinionated development pipeline. uv, ruff, mypy, pytest. Project structure, CI/CD, multi-platform distribution. The infrastructure that makes AI a force multiplier.',
    readUrl: 'https://michael-borck.github.io/ship-python-orchestrate-ai',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GW8Q5SS1',
  },
  {
    id: 'book-build-web',
    name: 'Build Web, Guide AI',
    track: 'Web Track',
    subtitle: 'Business Web Development with AI',
    description: 'Web development as a decision-making skill. HTML, CSS, JavaScript, WordPress, and React. Learn when to use each one, not just how. Concept before code, AI as exploration partner.',
    readUrl: 'https://michael-borck.github.io/build-web-guide-ai',
    amazonUrl: 'https://www.amazon.com.au/dp/B0GW8PMVDQ',
  },
];

export const goals = [
  { value: 'all', label: 'All' },
  { value: 'analyze', label: 'Analyse' },
  { value: 'feedback', label: 'Get feedback' },
  { value: 'create', label: 'Create' },
  { value: 'practice', label: 'Practise & learn' },
  { value: 'grade', label: 'Grade & assess' },
  { value: 'research', label: 'Research' },
  { value: 'engage', label: 'Engage a class' },
  { value: 'career', label: 'Career & writing' },
  { value: 'book', label: 'Books' },
];
