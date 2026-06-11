export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://connorlove.com').replace(/\/$/, '');

export const SITE_NAME = 'Connor Love';

export const TWITTER_HANDLE = '@cando145';

export const OG_IMAGE = `${SITE_URL}/og.png`;

export const OG_IMAGE_ALT = 'Connor Love creative developer portfolio preview';

export const sameAsProfiles = ['https://www.linkedin.com/in/loveconnor/', 'https://github.com/loveconnor', 'https://twitter.com/cando145', 'https://www.instagram.com/connorlove__/'];

export const serviceFocus = [
  {
    title: 'Creative development',
    text: 'Interactive websites, motion systems, 3D web experiences, and polished details that make interfaces feel intentional.',
  },
  {
    title: 'Frontend systems',
    text: 'React, Next.js, responsive layouts, reusable components, semantic HTML, and maintainable application architecture.',
  },
  {
    title: 'Product interfaces',
    text: 'Dashboards, learning tools, AI chat products, workflow software, design systems, and rich content rendering.',
  },
  {
    title: 'Performance and search visibility',
    text: 'Fast pages, structured content, accessible interaction, crawlable content, and frontend code that can scale after launch.',
  },
];

export const serviceAreas = [
  {
    '@type': 'City',
    name: 'Columbus',
  },
  {
    '@type': 'State',
    name: 'Ohio',
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
      answer: 'Connor Love is a creative developer and frontend developer based in Columbus, Ohio. He builds custom websites, web applications, interactive interfaces, and AI product experiences.',
    },
    {
      question: 'Does Connor Love work with clients outside Ohio?',
      answer: 'Yes. Connor is based in Columbus, Ohio and works remotely with clients, founders, agencies, and product teams across the United States and worldwide.',
    },
    {
      question: 'What services does Connor Love offer?',
      answer:
        'Connor offers creative development, frontend development, React and Next.js implementation, interactive web experiences, product interface development, and performance-focused UI engineering.',
    },
  ],
  about: [
    {
      question: 'What kind of developer is Connor Love?',
      answer: 'Connor is a creative developer who works across frontend engineering, interaction design, product interfaces, animation, and production web implementation.',
    },
    {
      question: 'How does Connor Love approach projects?',
      answer: 'He starts with goals, audience, content, and technical constraints, then builds responsive, accessible, performance-minded interfaces with maintainable frontend systems.',
    },
    {
      question: 'Where can Connor Love work from?',
      answer: 'Connor is located in Columbus, Ohio and can work with local teams, United States clients, and international teams remotely.',
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
      answer: 'Yes. Connor builds websites, web applications, and product interfaces for Columbus, Ohio clients as well as remote teams across the United States and worldwide.',
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
      answer: 'Yes. Connor is based in Columbus, Ohio and works with remote clients and teams across the United States and worldwide.',
    },
  ];
};
