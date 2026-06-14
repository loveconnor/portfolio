import clsx from 'clsx';
import styles from '@src/pages/components/seo/styles/seo.module.scss';
import PropTypes from 'prop-types';
import { faqContent, getProjectFaqs, serviceFocus } from '@src/constants/seo';

const content = {
  home: {
    eyebrow: 'Ohio web development, frontend systems, and product interfaces',
    heading: 'Web developer in Ohio',
    subheading: 'Custom websites and web apps from Columbus.',
    paragraphs: [
      'I build custom websites, interactive web applications, and product interfaces with React, Next.js, Three.js, and modern frontend tooling for Columbus, Ohio clients, businesses across Ohio, and remote teams.',
      'My work sits between design and engineering: clear structure, strong performance, accessible interaction, and polished details that make digital products easier to use and easier to maintain.',
      'I care about the full shape of a web development project, from the first layout pass to the final production details. That means clean components, readable content, purposeful motion, responsive behavior, crawlable pages, and code that can keep moving after launch.',
      'I am based in Columbus, Ohio, but the work is not limited to one city. I can build for founders, agencies, product teams, and businesses across Central Ohio, Cleveland, Cincinnati, Dayton, Toledo, Akron, the rest of Ohio, the United States, and worldwide.',
    ],
    services: serviceFocus,
  },
  about: {
    eyebrow: 'About Connor Love and the web development practice',
    heading: 'How I work',
    subheading: 'Built with structure, motion, visibility, and intent.',
    paragraphs: [
      'My work combines web development, frontend engineering, interaction design, and product thinking. I build websites, web applications, and marketing sites that need to feel polished while still being easy to maintain, measure, and extend.',
      'The technical foundation usually includes React, Next.js, structured content, accessible HTML, thoughtful animation, performance-minded implementation, and SEO/AEO/GEO signals that help people and answer engines understand the work.',
      'The practice is Columbus-based and remote-friendly, so I can support local Columbus teams, clients across Ohio, United States clients, and international product work without tying the service area to a single city.',
    ],
    services: serviceFocus,
  },
  projects: {
    eyebrow: 'Web development portfolio and case studies',
    heading: 'What the work shows',
    subheading: 'Selected systems, tools, and interfaces.',
    paragraphs: [
      'The projects in this portfolio show how I approach product interfaces from both the design and engineering sides. Each project focuses on a specific problem: reusable UI systems, chat workflows, personalized learning, typography for digital products, or secure API infrastructure.',
      'Across the work, the common thread is frontend quality: responsive interfaces, component systems, animation, data-driven UI, and maintainable product architecture.',
      'These case studies are relevant for teams looking for an Ohio web developer, Columbus web developer, creative developer, frontend developer, React developer, Next.js developer, or product interface builder who can work remotely across time zones.',
    ],
    services: serviceFocus,
  },
};

const getProjectContent = (project) => ({
  eyebrow: `${project.title} case study`,
  heading: `${project.title}, built with intent.`,
  subheading: 'Project focus',
  paragraphs: [
    `${project.title} is part of my web development and creative development portfolio. It shows how I approach frontend engineering, product interface design, and modern web application implementation from Columbus, Ohio for clients across Ohio and teams anywhere.`,
    ...project.desc,
  ],
  services: serviceFocus,
});

function SeoContent({ variant = 'home', project }) {
  const selectedContent = project ? getProjectContent(project) : content[variant] || content.home;
  const selectedFaqs = project ? getProjectFaqs(project) : faqContent[variant] || faqContent.home;

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
        <div className={styles.faqs}>
          <h3 className="h4">Common questions</h3>
          {selectedFaqs.map((faq) => (
            <div key={faq.question} className={styles.faq}>
              <h4 className="h6">{faq.question}</h4>
              <p className="p-l">{faq.answer}</p>
            </div>
          ))}
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
