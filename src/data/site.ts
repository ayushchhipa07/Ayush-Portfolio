export const site = {
  name: 'Ayush Chhipa',
  email: 'ayushchhipa7@gmail.com',
  github: 'https://github.com/ayushchhipa07',
  linkedin: 'https://www.linkedin.com/in/ayush-chhipa/',
  certificate: 'https://www.hackerrank.com/certificates/iframe/ca4f374cd071',
  resume: import.meta.env.PUBLIC_RESUME_PATH || '',
};

export const projects = [
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
];
