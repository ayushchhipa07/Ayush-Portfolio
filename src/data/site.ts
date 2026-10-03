export const site = {
  name: 'Ayush Chhipa',
  alternateName: 'Ayushchhipa',
  title: 'Software Developer',
  lastModified: '2026-10-03T00:00:00+05:30',
  email: 'ayushchhipa7@gmail.com',
  github: 'https://github.com/ayushchhipa07',
  linkedin: 'https://www.linkedin.com/in/ayush-chhipa/',
  certificate: 'https://www.hackerrank.com/certificates/iframe/ca4f374cd071',
  resume: import.meta.env.PUBLIC_RESUME_PATH || '/Ayush-Chhipa-Resume.docx',
};

interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  preview?: { description: string; features: string[] };
  role: string;
  timeline?: string;
  status?: string;
  image?: string;
  imageSmall?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  live?: string;
  github?: string;
  stack: string[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: 'docuguard-ai',
    name: 'DocuGuard AI',
    subtitle: 'AI-Powered Document Intelligence & RAG Platform',
    description:
      'An AI-powered platform for grounded interaction with PDF, DOCX, and Excel documents, built with RAG, embeddings, Qdrant vector search, hybrid semantic + lexical retrieval, deterministic reranking, and source validation.',
    preview: {
      description: 'A RAG platform for grounded Q&A across PDF, DOCX, and Excel documents.',
      features: ['Document Insights & streaming responses', 'Hybrid retrieval & source validation'],
    },
    role: 'Personal project · AI application development',
    timeline: 'Aug. 2026 – Present',
    status: 'Working / Ongoing',
    github: 'https://github.com/ayushchhipa07/DocuGuard-AI',
    stack: [
      'React',
      'Node.js',
      'Express.js',
      'RAG',
      'Generative AI',
      'Embeddings',
      'Qdrant',
      'Vector Search',
      'Hybrid Retrieval',
      'Document Intelligence',
    ],
    features: [
      'Document Insights & streaming AI responses',
      'Content-based caching & token-efficient processing',
      'Exact-value validation, conflict detection & controlled abstention for unsupported queries',
      'Reproducible RAG evaluation: retrieval quality, answer accuracy, groundedness, abstention & source accuracy',
    ],
  },
  {
    id: 'complyrelax',
    name: 'ComplyRelax',
    subtitle: 'Compliance and office management',
    description:
      'A platform for CA and CS professionals to manage compliance work, documents, and daily tasks. At Businessnow, I contribute to product features, filing integrations, and workflow improvements.',
    role: 'Businessnow · Product contributions',
    image: '/images/complyrelax.webp',
    imageSmall: '/images/complyrelax-small.webp',
    imageAlt: 'ComplyRelax compliance management platform logo',
    imageWidth: 936,
    imageHeight: 344,
    live: 'https://complyrelax.com/',
    stack: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'API Integration', 'AJAX'],
    features: [
      'Compliance & filing workflows',
      'MCA API integration',
      'Remote-support improvements',
      'Internal workflow automation',
    ],
  },
  {
    id: 'niyamhub',
    name: 'NiyamHub',
    subtitle: 'AI-powered compliance management',
    description:
      'A Businessnow Private Limited platform for CA and CS professionals, bringing MCA, GST, Income Tax, ROC, and director-management workflows into one dashboard.',
    role: 'Businessnow · Full-stack development',
    image: '/images/niyamhub.webp',
    imageSmall: '/images/niyamhub-small.webp',
    imageAlt: 'NiyamHub compliance platform logo',
    imageWidth: 936,
    imageHeight: 428,
    live: 'https://niyamhub.com/',
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'JWT Auth', 'Cashfree'],
    features: [
      'NiyamAI compliance assistant',
      'Secure credentials & document vault',
      'Cashfree wallet, payments & analytics',
      'English, Hindi, Marathi & Gujarati',
    ],
  },
];
