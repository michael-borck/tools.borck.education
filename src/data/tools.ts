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

export type TeachCategory = 'university' | 'workshop' | 'exec-ed' | 'research';

export interface Teaching {
  id: string;
  name: string;
  category: TeachCategory;
  audience: string;
  format: string;
  description: string;
  siteUrl: string;
  repoUrl: string;
  tags: string[];
}

export const teaching: Teaching[] = [
  { id: 'mgmt1003', name: 'MGMT1003', category: 'university', audience: 'Undergraduate business students', format: 'Semester course', description: 'Course materials and educational resources for MGMT1003. Covers management principles with AI-assisted learning workflows built on Quarto.', siteUrl: 'https://michael-borck.github.io/mgmt1003/', repoUrl: 'https://github.com/michael-borck/mgmt1003', tags: ['management', 'quarto', 'course'] },
  { id: 'assessment-2030-showcase', name: 'Assessment 2030', category: 'university', audience: 'Educators and assessment designers', format: 'Showcase / interactive demo', description: 'Demonstrates an AI-integrated assessment model where students collaborate with AI as client and intern. A vision for where assessment practice is heading.', siteUrl: 'https://michael-borck.github.io/assessment-2030-showcase/', repoUrl: 'https://github.com/michael-borck/assessment-2030-showcase', tags: ['assessment', 'AI in education', 'innovation'] },
  { id: 'ai-for-educators', name: 'AI for Educators', category: 'workshop', audience: 'Faculty and teaching staff', format: '60-minute faculty development session', description: 'Helps educators understand and practically use AI in teaching. Covers tool selection, prompt design, assessment integrity, and privacy considerations.', siteUrl: 'https://michael-borck.github.io/ai-for-educators/', repoUrl: 'https://github.com/michael-borck/ai-for-educators', tags: ['AI literacy', 'faculty development', 'teaching'] },
  { id: 'ai-foundations', name: 'AI Foundations', category: 'workshop', audience: 'Educators — individual or small group', format: '2-hour training session / self-paced', description: 'AI literacy training for educators covering how language models work, where they fail, and how to use them responsibly. Suitable for one-on-one sessions or self-paced learning.', siteUrl: 'https://michael-borck.github.io/ai-foundations/', repoUrl: 'https://github.com/michael-borck/ai-foundations', tags: ['AI literacy', 'training', 'foundations'] },
  { id: 'ai-in-the-curriculum', name: 'AI in the Curriculum', category: 'workshop', audience: 'Curriculum designers and educators', format: 'Presentation and workshop', description: 'Frameworks and practical materials for integrating AI into existing curricula. Covers alignment with learning outcomes, AI-resilient assessment design, and ethical considerations.', siteUrl: 'https://michael-borck.github.io/ai-in-the-curriculum/', repoUrl: 'https://github.com/michael-borck/ai-in-the-curriculum', tags: ['curriculum', 'AI in education', 'design'] },
  { id: 'ai-in-pedagogical-design-and-delivery', name: 'AI in Pedagogical Design', category: 'workshop', audience: 'Higher education teaching staff', format: 'Workshop', description: 'Workshop materials for integrating AI tools into higher education teaching practices. Covers pedagogical design principles, delivery strategies, and student engagement.', siteUrl: 'https://michael-borck.github.io/ai-in-pedagogical-design-and-delivery/', repoUrl: 'https://github.com/michael-borck/ai-in-pedagogical-design-and-delivery', tags: ['pedagogy', 'higher education', 'design'] },
  { id: 'beyond-generic-ai-chatbot', name: 'Beyond the Generic Chatbot', category: 'workshop', audience: 'Educators', format: 'Workshop', description: 'Privacy-focused AI tools for educators covering essay feedback, curriculum design, and communication. Moves beyond generic chatbot prompting toward purpose-built educational workflows.', siteUrl: 'https://michael-borck.github.io/beyond-generic-ai-chatbot/', repoUrl: 'https://github.com/michael-borck/beyond-generic-ai-chatbot', tags: ['privacy', 'AI tools', 'educators'] },
  { id: 'curtin-tso-ai-literacy', name: 'AI Literacy for TSOs', category: 'workshop', audience: 'Teaching Support Officers, Curtin University', format: 'Workshop', description: 'AI literacy training materials designed for Teaching Support Officers. Practical coverage of AI tools relevant to learning support, accessibility, and student engagement.', siteUrl: 'https://michael-borck.github.io/curtin-tso-ai-literacy/', repoUrl: 'https://github.com/michael-borck/curtin-tso-ai-literacy', tags: ['AI literacy', 'Curtin', 'support staff'] },
  { id: 'food-science-ai-workshop', name: 'AI for Food Science', category: 'workshop', audience: 'Food science students and researchers', format: 'Interactive workshop', description: 'Teaches food science students AI-assisted research workflows — literature synthesis, data analysis, and scientific writing with AI as a collaborative tool.', siteUrl: 'https://michael-borck.github.io/food-science-ai-workshop/', repoUrl: 'https://github.com/michael-borck/food-science-ai-workshop', tags: ['food science', 'research workflows', 'interdisciplinary'] },
  { id: 'agvise-ai-seminar-handouts', name: 'AI for AgriConsulting', category: 'workshop', audience: 'Agricultural consultants', format: 'Seminar with handouts', description: 'HTML-based seminar materials teaching AI applications for agricultural consulting — automation, client reporting, and decision-support tools relevant to the industry.', siteUrl: 'https://michael-borck.github.io/agvise-ai-seminar-handouts/', repoUrl: 'https://github.com/michael-borck/agvise-ai-seminar-handouts', tags: ['agriculture', 'consulting', 'AI applications'] },
  { id: 'ai-leadership-and-pm', name: 'AI Leadership & PM', category: 'exec-ed', audience: 'Managers and project leaders', format: 'Masterclass', description: 'Teaching materials and frameworks for leading AI projects and managing AI-enabled teams. Covers governance, risk, vendor evaluation, and building AI literacy within organisations.', siteUrl: 'https://michael-borck.github.io/ai-leadership-and-pm/', repoUrl: 'https://github.com/michael-borck/ai-leadership-and-pm', tags: ['leadership', 'project management', 'governance'] },
  { id: 'ai-for-professionals', name: 'AI for Professionals', category: 'exec-ed', audience: 'Working professionals', format: 'Hands-on workshop', description: 'Practical AI skills and literacy for workplace applications. Participants leave with working knowledge of prompting, tool selection, and responsible AI use in professional contexts.', siteUrl: 'https://michael-borck.github.io/ai-for-professionals/', repoUrl: 'https://github.com/michael-borck/ai-for-professionals', tags: ['professional development', 'AI skills', 'workplace'] },
  { id: 'ai-business-innovation', name: 'AI Business Innovation', category: 'exec-ed', audience: 'Executives and senior managers', format: 'Masterclass', description: 'Strategic frameworks and materials for evaluating and investing in AI initiatives. Covers opportunity assessment, build vs buy decisions, ROI, and organisational readiness.', siteUrl: 'https://michael-borck.github.io/ai-business-innovation/', repoUrl: 'https://github.com/michael-borck/ai-business-innovation', tags: ['strategy', 'innovation', 'executive'] },
  { id: 'aaac-ai-innovation', name: 'AAAC AI Innovation', category: 'exec-ed', audience: 'Business leaders and practitioners', format: 'Presentation and workshop', description: 'Strategic frameworks and presentation materials for implementing AI technologies in business. Covers adoption roadmaps, change management, and innovation governance.', siteUrl: 'https://michael-borck.github.io/AAAC-AI-Innovation/', repoUrl: 'https://github.com/michael-borck/AAAC-AI-Innovation', tags: ['AI adoption', 'innovation', 'implementation'] },
  { id: 'human-in-the-loop', name: 'Human-in-the-Loop ML', category: 'research', audience: 'Mixed: researchers, practitioners, students', format: 'Quarto book / presentation', description: 'Documentation and presentations covering human-in-the-loop machine learning concepts — where and why human judgment remains essential in automated systems.', siteUrl: 'https://michael-borck.github.io/human-in-the-loop/', repoUrl: 'https://github.com/michael-borck/human-in-the-loop', tags: ['machine learning', 'human-in-the-loop', 'research'] },
  { id: 'fbl-six-months-later', name: 'FBL: Six Months Later', category: 'research', audience: 'Academics and ML practitioners', format: 'Analysis and presentation', description: 'Analyses FBL machine learning system performance and changes six months post-deployment. Documents real-world drift, retraining decisions, and lessons from sustained production use.', siteUrl: 'https://michael-borck.github.io/fbl-six-months-later/', repoUrl: 'https://github.com/michael-borck/fbl-six-months-later', tags: ['machine learning', 'deployment', 'benchmarking'] },
];

export const goals = [
  { value: 'all', label: 'All' },
  { value: 'analyze', label: 'Analyze' },
  { value: 'feedback', label: 'Get feedback' },
  { value: 'create', label: 'Create' },
  { value: 'practice', label: 'Practice & learn' },
  { value: 'grade', label: 'Grade & assess' },
  { value: 'research', label: 'Research' },
  { value: 'engage', label: 'Engage a class' },
  { value: 'career', label: 'Career & writing' },
  { value: 'book', label: 'Books' },
  { value: 'teach', label: 'Teaching' },
];
