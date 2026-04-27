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

export const tools: Tool[] = [
  { id: 'talk-buddy', name: 'talk-buddy', type: 'Desktop App', tags: ['practice', 'feedback'],
    shortDesc: 'AI conversation practice with speech recognition and real-time feedback.',
    download: { win: true, mac: true, linux: true }, brand: 'talk-buddy',
    page: '/talk-buddy/', github: 'https://github.com/michael-borck/talk-buddy' },

  { id: 'study-buddy', name: 'study-buddy', type: 'Desktop App', tags: ['practice'],
    shortDesc: 'Desktop AI tutoring with local inference via Ollama — no data leaves your machine.',
    download: { win: true, mac: true, linux: true }, pip: 'pip install study-buddy', brand: 'study-buddy',
    page: '/study-buddy/', github: 'https://github.com/michael-borck/study-buddy',
    pypi: 'https://pypi.org/project/study-buddy/' },

  { id: 'career-compass', name: 'career-compass', type: 'Desktop App', tags: ['career'],
    shortDesc: 'AI career guidance and resume analysis — runs locally, no data uploaded.',
    download: { win: true, mac: true, linux: true }, brand: 'career-compass',
    page: '/career-compass/', github: 'https://github.com/michael-borck/career-compass' },

  { id: 'deep-talk', name: 'deep-talk', type: 'Desktop App', tags: ['analyze', 'research'],
    shortDesc: 'Transcribes and analyzes audio/video conversations locally with AI-powered insights.',
    download: { win: true, mac: true, linux: true }, brand: 'deep-talk',
    page: '/deep-talk/', github: 'https://github.com/michael-borck/deep-talk' },

  { id: 'document-lens', name: 'document-lens', type: 'Desktop App', tags: ['analyze', 'research'],
    shortDesc: 'Batch PDF analysis with domain-specific keywords, n-grams, and research visualisations.',
    download: { win: true, mac: true, linux: true }, brand: 'document-lens',
    page: '/document-lens/', github: 'https://github.com/michael-borck/document-lens-desktop' },

  { id: 'insight-lens', name: 'insight-lens', type: 'Desktop App', tags: ['analyze'],
    shortDesc: 'Analyzes university survey PDFs with AI insights and data visualizations.',
    download: { win: true, mac: true, linux: true }, brand: 'insight-lens',
    page: '/insight-lens/', github: 'https://github.com/michael-borck/insight-lens' },

  { id: 'code-lens', name: 'code-lens', type: 'Desktop App', tags: ['grade', 'feedback'],
    shortDesc: 'Analyzes and grades student code with plagiarism detection and sandboxed execution.',
    download: { win: true, mac: true, linux: true },
    github: 'https://github.com/michael-borck/code-lens',
    features: [
      { title: 'Sandboxed execution', desc: 'Student code runs in isolation — no risk to your machine' },
      { title: 'Plagiarism detection', desc: 'Cross-submission similarity scoring across the whole cohort' },
      { title: 'AI code review', desc: 'Style, correctness, and logic feedback in natural language' },
      { title: 'Batch grading', desc: 'Process an entire cohort\'s submissions in one run' },
    ] },

  { id: 'video-lens', name: 'video-lens', type: 'Desktop App', tags: ['analyze', 'feedback'],
    shortDesc: 'Analyzes presentation videos with speech transcription, computer vision, and AI feedback.',
    download: { win: true, mac: true, linux: true },
    github: 'https://github.com/michael-borck/video-lens',
    features: [
      { title: 'Speech transcription', desc: 'Accurate local transcription via Whisper — no cloud needed' },
      { title: 'Body language analysis', desc: 'Eye contact, posture, and slide presence detection' },
      { title: 'AI coaching', desc: 'Presentation feedback written in plain language' },
      { title: 'Batch processing', desc: 'Grade multiple recordings overnight' },
    ] },

  { id: 'character-craft', name: 'character-craft', type: 'Desktop App', tags: ['create', 'engage'],
    shortDesc: 'Creates structured chatbot personalities for LLM prompts and RAG pipelines.',
    download: { win: true, mac: true, linux: true },
    github: 'https://github.com/michael-borck/character-craft',
    features: [
      { title: 'Personality builder', desc: 'Define voice, tone, expertise, and domain knowledge' },
      { title: 'Prompt export', desc: 'One-click export of ready-to-use system prompts' },
      { title: 'RAG configuration', desc: 'Set up retrieval-augmented responses with your documents' },
      { title: 'Multi-character', desc: 'Build a full cast of AI personas for a simulation or course' },
    ] },

  { id: 'case-crafter', name: 'case-crafter', type: 'Desktop App', tags: ['create', 'engage'],
    shortDesc: 'Generates AI-powered business case studies for education with offline functionality.',
    download: { win: true, mac: true, linux: true },
    github: 'https://github.com/michael-borck/case-crafter',
    features: [
      { title: 'Case generation', desc: 'AI writes realistic business case studies in minutes' },
      { title: 'Curriculum aligned', desc: 'Fits your learning outcomes, industry, and context' },
      { title: 'Offline mode', desc: 'Generates cases without an internet connection' },
      { title: 'Export ready', desc: 'PDF and web-friendly output for immediate classroom use' },
    ] },

  { id: 'mark-mate', name: 'mark-mate', type: 'Python · CLI', tags: ['grade'],
    shortDesc: 'Batch-grade assignments with consistent rubric application via AI.',
    pip: 'pip install mark-mate',
    github: 'https://github.com/michael-borck/mark-mate',
    pypi: 'https://pypi.org/project/mark-mate/',
    features: [
      { title: 'Rubric-driven', desc: 'Grades against your specific criteria — not a generic standard' },
      { title: 'Batch grading', desc: 'Process an entire cohort in one command' },
      { title: 'Consistent', desc: 'Same standard applied to every submission, every time' },
      { title: 'Review mode', desc: 'Human-in-the-loop override for any individual grade' },
    ] },

  { id: 'class-pulse', name: 'class-pulse', type: 'Web App', tags: ['engage'],
    shortDesc: 'Real-time audience engagement with polls, word clouds, and QR code joining.',
    web: 'https://classpulse.eduserver.au',
    github: 'https://github.com/michael-borck/class-pulse',
    features: [
      { title: 'Live polls', desc: 'Instant audience response from any device in the room' },
      { title: 'Word clouds', desc: 'Real-time visual aggregation of student responses' },
      { title: 'QR joining', desc: 'Students join a session with a single QR code scan' },
      { title: 'No accounts', desc: 'Guests participate instantly — no sign-up required' },
    ] },

  { id: 'feed-forward', name: 'feed-forward', type: 'Python · CLI', tags: ['feedback', 'grade'],
    shortDesc: 'Generates formative feedback on student assignments using multiple AI models.',
    pip: 'pip install feed-forward', github: 'https://github.com/michael-borck/feed-forward' },

  { id: 'curriculum-curator', name: 'curriculum-curator', type: 'Desktop App', tags: ['create'],
    shortDesc: 'AI-powered course content creation aligned with your teaching philosophy.',
    download: { win: true, mac: true, linux: true }, pip: 'pip install curriculum-curator',
    github: 'https://github.com/michael-borck/curriculum-curator',
    pypi: 'https://pypi.org/project/curriculum-curator/' },

  { id: 'assessment-bench', name: 'assessment-bench', type: 'Python · CLI', tags: ['grade'],
    shortDesc: 'Benchmarks AI grading systems using three-tier evaluation with statistical analysis.',
    github: 'https://github.com/michael-borck/assessment-bench' },

  { id: 'cite-sight', name: 'cite-sight', type: 'Desktop App', tags: ['research', 'career'],
    shortDesc: 'AI-powered citation and reference analysis for academic writing.',
    download: { win: true, mac: true, linux: true },
    github: 'https://github.com/michael-borck/cite-sight' },

  { id: 'style-mirror', name: 'style-mirror', type: 'Web App', tags: ['career', 'practice'],
    shortDesc: 'Analyzes and mirrors writing styles — get AI to write the way you do.',
    web: 'https://stylemirror.eduserver.au',
    github: 'https://github.com/michael-borck/style-mirror' },

  { id: 'slide-stream', name: 'slide-stream', type: 'Python', tags: ['create'],
    shortDesc: 'Convert Markdown or PowerPoint slides to AI-narrated video presentations.',
    pip: 'pip install slide-stream',
    github: 'https://github.com/michael-borck/slide-stream',
    pypi: 'https://pypi.org/project/slide-stream/' },

  { id: 'venture-lab', name: 'venture-lab', type: 'Desktop App', tags: ['practice', 'create'],
    shortDesc: 'AI tools for entrepreneurship education and business planning exercises.',
    download: { win: true, mac: true, linux: true },
    github: 'https://github.com/michael-borck/venture-lab' },

  { id: 'extracta', name: 'extracta', type: 'Python · Library', tags: ['analyze', 'research'],
    shortDesc: 'Python library for academic content analysis across multiple media types.',
    pip: 'pip install extracta',
    github: 'https://github.com/michael-borck/extracta' },

  { id: 'hands-on-ai', name: 'hands-on-ai', type: 'Jupyter', tags: ['practice', 'create'],
    shortDesc: 'Educational AI toolkit with chatbot, RAG, and agent modules for hands-on learning.',
    pip: 'pip install hands-on-ai',
    github: 'https://github.com/michael-borck/hands-on-ai',
    pypi: 'https://pypi.org/project/hands-on-ai/' },

  { id: 'critique-quest', name: 'critique-quest', type: 'Python', tags: ['practice', 'feedback'],
    shortDesc: 'AI case studies designed to build critical thinking and analytical skills.',
    github: 'https://github.com/michael-borck/critique-quest' },
];

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
  { value: 'all', label: 'All tools' },
  { value: 'analyze', label: 'Analyze' },
  { value: 'feedback', label: 'Get feedback' },
  { value: 'create', label: 'Create' },
  { value: 'practice', label: 'Practice & learn' },
  { value: 'grade', label: 'Grade & assess' },
  { value: 'research', label: 'Research' },
  { value: 'engage', label: 'Engage a class' },
  { value: 'career', label: 'Career & writing' },
  { value: 'book', label: 'Books' },
];
