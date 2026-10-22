import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/seo/styles/seo.module.scss';
import PropTypes from 'prop-types';
import { serviceFocus } from '@src/constants/seo';

const content = {
  home: {
    eyebrow: 'What I do',
    heading: 'I build thoughtful digital products.',
    services: serviceFocus,
  },
  projects: {
    eyebrow: 'Selected work',
    heading: 'A closer look at my work.',
    subheading: 'Different problems, the same attention to detail.',
    paragraphs: [
      'These projects cover a restaurant discovery app, an AI coding agent, reusable interface systems, color tools, tokenizer research, and digital typography. Each one began with a different problem and called for a different balance of design and engineering.',
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
        <AppearTitle>
          <p className="h6">{selectedContent.eyebrow}</p>
          <h2 id={`${variant}-details-heading`} className="h2">
            {selectedContent.heading}
          </h2>
        </AppearTitle>
      </div>
      {selectedContent.subheading ? (
        <div className={styles.intro}>
          <AppearTitle>
            <h3 className="h6">{selectedContent.subheading}</h3>
          </AppearTitle>
          {selectedContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="p-l">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      <div className={styles.services}>
        <AppearTitle>
          <h3 className="h6">What I can help with</h3>
        </AppearTitle>
        <ul className={styles.list}>
          {selectedContent.services.map((service) => (
            <li key={service.title} className={styles.item}>
              <span className="h4">{service.title}</span>
              <p className="p-l">{service.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

SeoContent.propTypes = {
  variant: PropTypes.oneOf(['home', 'projects']),
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
