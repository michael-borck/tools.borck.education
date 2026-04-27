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
  emoji: string;
  subtitle: string;
  shortDesc: string;
  url: string;
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
  { id: 'book-hands-on-ai', name: 'Hands-On AI', emoji: '🤖',
    subtitle: 'A practical guide for educators and students',
    shortDesc: 'Hands-on introduction to building AI apps in Python — chatbots, RAG, and agents.',
    url: 'https://books.borck.education' },
  { id: 'book-python-edu', name: 'Python for Educators', emoji: '🐍',
    subtitle: 'Automate the boring parts of teaching',
    shortDesc: 'Use Python for marking, reports, and educator workflows. No prior coding needed.',
    url: 'https://books.borck.education' },
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
