import clsx from 'clsx';
import styles from '@src/pages/components/seo/styles/seo.module.scss';

function SeoContent() {
  return (
    <section className={clsx(styles.root, 'layout-grid-inner')} aria-labelledby="creative-development-heading">
      <div className={styles.heading}>
        <p className="p-l">Creative development, frontend systems, and AI product interfaces</p>
        <h2 id="creative-development-heading" className="h2">
          Websites and web apps built for people, search, and AI discovery.
        </h2>
      </div>
      <div className={styles.content}>
        <h3 className="h4">What I build</h3>
        <p className="p-l">
          I am Connor Love, a creative developer in Columbus, Ohio building custom websites, interactive web applications, and product interfaces with React, Next.js, Three.js, and modern frontend
          tooling. My work focuses on clear structure, fast performance, accessible interaction, and polished details that make digital products easier to use and easier to understand.
        </p>
        <p className="p-l">
          I work across creative development, website development, frontend engineering, and AI product interfaces. Recent projects include component systems, AI chat platforms, learning tools,
          typeface systems, and secure developer infrastructure. Each project is designed with durable content, semantic HTML, metadata, and structured data so search engines and generative engines
          can identify who the site represents, what services are offered, where the work is based, and which projects best demonstrate the work.
        </p>
      </div>
    </section>
  );
}

export default SeoContent;
