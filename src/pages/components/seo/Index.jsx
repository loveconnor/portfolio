import clsx from 'clsx';
import styles from '@src/pages/components/seo/styles/seo.module.scss';
import PropTypes from 'prop-types';

const defaultServices = [
  {
    title: 'Creative development',
    text: 'Interactive websites, motion systems, and details that make interfaces feel intentional.',
  },
  {
    title: 'Frontend systems',
    text: 'React, Next.js, responsive layouts, reusable components, and maintainable architecture.',
  },
  {
    title: 'Product interfaces',
    text: 'Dashboards, learning tools, workflow products, design systems, and rich content rendering.',
  },
  {
    title: 'Performance',
    text: 'Fast pages, semantic HTML, structured content, and frontend code that can scale.',
  },
];

const content = {
  home: {
    eyebrow: 'Creative development, frontend systems, and product interfaces',
    heading: 'What I do',
    subheading: 'Creative systems for the web.',
    paragraphs: [
      'I build custom websites, interactive web applications, and product interfaces with React, Next.js, Three.js, and modern frontend tooling.',
      'My work sits between design and engineering: clear structure, strong performance, accessible interaction, and polished details that make digital products easier to use and easier to maintain.',
      'I care about the full shape of a build, from the first layout pass to the final production details. That means clean components, readable content, purposeful motion, responsive behavior, and code that can keep moving after launch.',
    ],
    services: defaultServices,
  },
  about: {
    eyebrow: 'About Connor Love and the development practice',
    heading: 'How I work',
    subheading: 'Built with structure, motion, and intent.',
    paragraphs: [
      'My work combines frontend engineering, interaction design, and product thinking. I build web applications and marketing sites that need to feel polished while still being easy to maintain, measure, and extend.',
      'The technical foundation usually includes React, Next.js, structured content, accessible HTML, thoughtful animation, and performance-minded implementation.',
    ],
    services: defaultServices,
  },
  projects: {
    eyebrow: 'Creative development portfolio and case studies',
    heading: 'What the work shows',
    subheading: 'Selected systems, tools, and interfaces.',
    paragraphs: [
      'The projects in this portfolio show how I approach product interfaces from both the design and engineering sides. Each project focuses on a specific problem: reusable UI systems, chat workflows, personalized learning, typography for digital products, or secure API infrastructure.',
      'Across the work, the common thread is frontend quality: responsive interfaces, component systems, animation, data-driven UI, and maintainable product architecture.',
    ],
    services: defaultServices,
  },
};

const getProjectContent = (project) => ({
  eyebrow: `${project.title} case study`,
  heading: `${project.title}, built with intent.`,
  subheading: 'Project focus',
  paragraphs: [
    `${project.title} is part of my creative development portfolio. It shows how I approach frontend engineering, product interface design, and modern web application implementation from Columbus, Ohio.`,
    ...project.desc,
  ],
  services: defaultServices,
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
        <div className={styles.extractableContent}>
          <h3 className="h4">Core services</h3>
          <ul className={styles.list}>
            {selectedContent.services.map((service) => (
              <li key={service.title}>
                <span className="h6">{service.title}</span>
                <p className="p-l">{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
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
