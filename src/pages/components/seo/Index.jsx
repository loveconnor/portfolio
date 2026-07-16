import clsx from 'clsx';
import styles from '@src/pages/components/seo/styles/seo.module.scss';
import PropTypes from 'prop-types';
import { serviceFocus } from '@src/constants/seo';

const content = {
  home: {
    eyebrow: 'What I do',
    heading: 'I build thoughtful digital products.',
    subheading: 'From the first idea to the final production details.',
    paragraphs: [
      'I design and develop custom websites, web applications, and product interfaces. My work brings design and engineering together through clear structure, fast performance, accessible interaction, and details that make each experience feel considered.',
      'I am based in Columbus, Ohio, and work with founders, agencies, and product teams wherever they are.',
    ],
    services: serviceFocus,
  },
  about: {
    eyebrow: 'My approach',
    heading: 'Thoughtful by default.',
    subheading: 'Design and engineering belong in the same process.',
    paragraphs: [
      'I start by understanding the goal, the audience, and the constraints. From there, I shape the content, interaction, and technical foundation together so the finished product feels cohesive rather than assembled in pieces.',
      'My usual toolkit includes React, Next.js, semantic HTML, thoughtful motion, and performance-minded implementation. The tools can change; clarity, accessibility, and maintainability do not.',
    ],
    services: serviceFocus,
  },
  projects: {
    eyebrow: 'Selected work',
    heading: 'A closer look at my work.',
    subheading: 'Different problems, the same attention to detail.',
    paragraphs: [
      'These projects cover reusable interface systems, conversational products, learning tools, digital typography, and secure infrastructure. Each one began with a different problem and called for a different balance of design and engineering.',
      'Across the work, I focus on responsive interfaces, useful motion, durable component systems, and code that stays understandable as a product grows.',
    ],
    services: serviceFocus,
  },
};

const getProjectContent = (project) => ({
  eyebrow: 'Case study',
  heading: project.title,
  subheading: 'What I focused on',
  paragraphs: [`For ${project.title}, I brought product thinking, interface design, and frontend engineering together around one clear problem.`, ...project.desc],
  services: serviceFocus,
});

function SeoContent({ variant = 'home', project }) {
  const selectedContent = project ? getProjectContent(project) : content[variant] || content.home;

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')} aria-labelledby={`${variant}-details-heading`}>
      <div className={styles.heading}>
        <p className="p-l">{selectedContent.eyebrow}</p>
        <h2 id={`${variant}-details-heading`} className="h2">
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
          <h3 className="h4">What I can help with</h3>
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
