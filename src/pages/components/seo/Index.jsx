import clsx from 'clsx';
import styles from '@src/pages/components/seo/styles/seo.module.scss';
import PropTypes from 'prop-types';

const content = {
  home: {
    eyebrow: 'Creative development, frontend systems, and AI product interfaces',
    heading: 'Websites and web apps built for people, search, and AI discovery.',
    subheading: 'What I build',
    paragraphs: [
      'I am Connor Love, a creative developer in Columbus, Ohio building custom websites, interactive web applications, and product interfaces with React, Next.js, Three.js, and modern frontend tooling. My work focuses on clear structure, fast performance, accessible interaction, and polished details that make digital products easier to use and easier to understand.',
      'I work across creative development, website development, frontend engineering, and AI product interfaces. Recent projects include component systems, AI chat platforms, learning tools, typeface systems, and secure developer infrastructure. Each project is designed with durable content, semantic HTML, metadata, and structured data so search engines and generative engines can identify who the site represents, what services are offered, where the work is based, and which projects best demonstrate the work.',
      'For clients and collaborators in Columbus, Ohio, Northeast Ohio, and across the United States, I focus on practical implementation: responsive layouts, reusable components, readable content, fast page loading, and stable frontend architecture that can support long-term product growth.',
    ],
  },
  about: {
    eyebrow: 'About Connor Love and the development practice',
    heading: 'Creative development grounded in performance, usability, and clear technical structure.',
    subheading: 'How I approach web projects',
    paragraphs: [
      'My work combines frontend engineering, interaction design, and product thinking. I build web applications and marketing sites that need to feel polished while still being easy to maintain, measure, and extend.',
      'The technical foundation usually includes React, Next.js, structured content, accessible HTML, thoughtful animation, and performance-minded implementation. I care about how a site feels to use, but I also care that the markup, metadata, and page copy explain the work clearly to search engines, AI assistants, and people evaluating the site.',
      'I am based in Columbus, Ohio and work with clients, startups, and product teams that need custom websites, interactive interfaces, AI product experiences, and frontend systems that can scale beyond a first version.',
    ],
  },
  projects: {
    eyebrow: 'Creative development portfolio and case studies',
    heading: 'Selected web applications, AI tools, design systems, and interactive product experiences.',
    subheading: 'What these projects show',
    paragraphs: [
      'The projects in this portfolio show how I approach product interfaces from both the design and engineering sides. Each project focuses on a specific problem: reusable UI systems, AI chat workflows, personalized learning, typography for digital products, or secure API infrastructure.',
      'Across the work, the common thread is frontend quality. I build responsive interfaces, component systems, animation, data-driven UI, and product experiences with enough structure for people, search engines, and AI systems to understand what each project does and why it matters.',
      'These case studies represent creative development and website development work from Columbus, Ohio, with an emphasis on React, Next.js, TypeScript, Three.js, AI interfaces, design systems, performance, and maintainable product architecture.',
    ],
  },
};

const getProjectContent = (project) => ({
  eyebrow: `${project.title} case study`,
  heading: `${project.title} is a ${project.date} creative development project by Connor Love.`,
  subheading: 'Project focus',
  paragraphs: [
    `${project.title} is part of Connor Love's creative development portfolio, showing frontend engineering, product interface design, and modern web application implementation from a Columbus, Ohio developer.`,
    ...project.desc,
    `The project demonstrates practical experience with structured product thinking, responsive interface development, and clear technical presentation for users, search engines, and AI discovery systems evaluating Connor Love's work.`,
  ],
});

function SeoContent({ variant = 'home', project }) {
  const selectedContent = project ? getProjectContent(project) : content[variant] || content.home;

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')} aria-labelledby={`${variant}-ai-geo-heading`}>
      <div className={styles.heading}>
        <p className="p-l">{selectedContent.eyebrow}</p>
        <h2 id={`${variant}-ai-geo-heading`} className="h2">
          {selectedContent.heading}
        </h2>
      </div>
      <div className={styles.content}>
        <h3 className="h4">{selectedContent.subheading}</h3>
        {selectedContent.paragraphs.map((paragraph) => (
          <p key={paragraph} className="p-l">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

SeoContent.propTypes = {
  variant: PropTypes.oneOf(['home', 'about', 'projects']),
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

SeoContent.defaultProps = {
  variant: 'home',
  project: null,
};

export default SeoContent;
