export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://connorlove.com').replace(/\/$/, '');

export const SITE_NAME = 'Connor Love';

export const TWITTER_HANDLE = '@cando145';

export const OG_IMAGE = `${SITE_URL}/og.png`;

export const OG_IMAGE_ALT = 'Connor Love Ohio web developer portfolio preview';

export const sameAsProfiles = ['https://www.linkedin.com/in/loveconnor/', 'https://github.com/loveconnor', 'https://twitter.com/cando145', 'https://www.instagram.com/connorlove__/'];

export const serviceFocus = [
  {
    title: 'Web development',
    text: 'Custom websites, web applications, and marketing pages built for Ohio businesses, Columbus teams, and remote clients.',
  },
  {
    title: 'Frontend development',
    text: 'React, Next.js, responsive layouts, reusable components, semantic HTML, and maintainable frontend architecture.',
  },
  {
    title: 'Creative development',
    text: 'Interactive websites, motion systems, 3D web experiences, and polished details that make interfaces feel intentional.',
  },
  {
    title: 'Product interfaces',
    text: 'Dashboards, learning tools, AI chat products, workflow software, design systems, and rich content rendering.',
  },
  {
    title: 'SEO, AEO, and GEO foundations',
    text: 'Fast pages, structured data, answer-ready content, AI-readable summaries, accessible interaction, and crawlable frontend code.',
  },
];

export const serviceAreas = [
  {
    '@type': 'City',
    name: 'Columbus',
  },
  {
    '@type': 'Place',
    name: 'Central Ohio',
  },
  {
    '@type': 'State',
    name: 'Ohio',
  },
  {
    '@type': 'City',
    name: 'Cleveland',
  },
  {
    '@type': 'City',
    name: 'Cincinnati',
  },
  {
    '@type': 'City',
    name: 'Dayton',
  },
  {
    '@type': 'City',
    name: 'Toledo',
  },
  {
    '@type': 'City',
    name: 'Akron',
  },
  {
    '@type': 'Country',
    name: 'United States',
  },
  {
    '@type': 'Place',
    name: 'Worldwide',
  },
];

export const faqContent = {
  home: [
    {
      question: 'Who is Connor Love?',
      answer:
        'Connor Love is a web developer, creative developer, and frontend developer based in Columbus, Ohio. He builds custom websites, web applications, interactive interfaces, and AI product experiences.',
    },
    {
      question: 'Is Connor Love a web developer in Ohio?',
      answer:
        'Yes. Connor is an Ohio web developer based in Columbus who builds websites and web applications for clients in Columbus, across Ohio, throughout the United States, and remotely worldwide.',
    },
    {
      question: 'Does Connor Love work with clients outside Ohio?',
      answer: 'Yes. Connor is based in Columbus, Ohio and works remotely with clients, founders, agencies, businesses, and product teams across Ohio, the United States, and worldwide.',
    },
    {
      question: 'What services does Connor Love offer?',
      answer:
        'Connor offers web development, website development, frontend development, React and Next.js implementation, interactive web experiences, product interface development, SEO foundations, AEO/GEO-friendly structured content, and performance-focused UI engineering.',
    },
  ],
  about: [
    {
      question: 'What kind of developer is Connor Love?',
      answer:
        'Connor is an Ohio web developer and creative developer who works across frontend engineering, website development, interaction design, product interfaces, animation, and production web implementation.',
    },
    {
      question: 'How does Connor Love approach projects?',
      answer: 'He starts with goals, audience, content, and technical constraints, then builds responsive, accessible, performance-minded interfaces with maintainable frontend systems.',
    },
    {
      question: 'Where can Connor Love work from?',
      answer: 'Connor is located in Columbus, Ohio and can work with local Columbus teams, clients across Ohio, United States clients, and international teams remotely.',
    },
  ],
  projects: [
    {
      question: "What is in Connor Love's portfolio?",
      answer: 'The portfolio includes creative development, frontend engineering, AI product interfaces, design systems, learning products, typography systems, and secure infrastructure tools.',
    },
    {
      question: 'What technologies appear in these projects?',
      answer: 'The work includes React, Next.js, Three.js, full-stack application architecture, AI workflows, component systems, interactive UI, and performance-focused frontend implementation.',
    },
    {
      question: 'Can Connor Love build similar projects for global clients?',
      answer: 'Yes. Connor builds websites, web applications, and product interfaces for Columbus clients, Ohio businesses, and remote teams across the United States and worldwide.',
    },
  ],
};

export const getProjectFaqs = (project) => {
  if (project.faqs?.length) {
    return project.faqs;
  }

  return [
    {
      question: `What is ${project.title}?`,
      answer: project.desc[0],
    },
    {
      question: `What does the ${project.title} case study show?`,
      answer: `${project.title} shows Connor Love's work across frontend engineering, product interface design, creative development, and modern web application implementation.`,
    },
    {
      question: 'Can Connor Love build similar work for clients worldwide?',
      answer: 'Yes. Connor is a web developer based in Columbus, Ohio and works with Ohio clients, remote teams across the United States, and clients worldwide.',
    },
  ];
};
