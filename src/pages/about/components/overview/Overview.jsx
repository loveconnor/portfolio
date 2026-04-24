import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';

function Overview() {
  const isMobile = useIsMobile();

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.title}>
        {isMobile ? (
          <AppearTitle key="mobile-queto">
            <p className="h3">I build for the web with a focus on</p>
            <p className="h3">
              <span className="medium">performance</span>, <span className="medium">clarity</span>,
            </p>
            <p className="h3">
              and <span className="medium">how things feel</span> to use.
            </p>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-queto">
            <p className="h3">I build for the web with a focus on</p>
            <p className="h3">
              <span className="medium">performance</span>, <span className="medium">clarity</span>, and
            </p>
            <p className="h3">
              <span className="medium">how things feel</span> to use.
            </p>
          </AppearTitle>
        )}
      </div>
      <div className={clsx(styles.text, 'p-l', styles.myStory)}>
        <AppearTitle>
          <span>About</span>
        </AppearTitle>
      </div>
      <div className={styles.desc}>
        {!isMobile ? (
          <AppearTitle key="mobile-overview">
            <p className="h6">I&apos;m Connor, a creative developer focused on building</p>
            <p className="h6">modern web applications that balance design and</p>
            <p className="h6">engineering. My work centers around performance,</p>
            <p className="h6">interaction, and creating experiences that feel smooth</p>
            <p className="h6">and intentional.</p>

            <p className={clsx(styles.paddingTop, 'h6')}>I&apos;ve built projects ranging from interactive interfaces</p>
            <p className="h6">to full-stack applications, always focusing on clean</p>
            <p className="h6">systems and long-term scalability.</p>

            <p className={clsx(styles.paddingTop, 'h6')}>Outside of coding, I spend time exploring design and</p>
            <p className="h6">refining details to make my work feel more polished</p>
            <p className="h6">and thoughtful.</p>

            <p className={clsx(styles.paddingTop, 'h6')}>Connor Love.</p>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-overview">
            <p className="h6">I&apos;m Connor, a creative developer focused on building modern</p>
            <p className="h6">web applications that balance design and engineering.</p>
            <p className="h6">My work centers around performance, interaction, and</p>
            <p className="h6">creating experiences that feel smooth and intentional.</p>

            <p className={clsx(styles.paddingTop, 'h6')}>I&apos;ve built projects ranging from interactive interfaces to</p>
            <p className="h6">full-stack applications, always focusing on clean systems</p>
            <p className="h6">and long-term scalability.</p>

            <p className={clsx(styles.paddingTop, 'h6')}>Outside of coding, I spend time exploring design, refining</p>
            <p className="h6">details, and pushing my work to feel more polished</p>
            <p className="h6">and thoughtful.</p>

            <p className={clsx(styles.paddingTop, 'h6')}>Connor Love.</p>
          </AppearTitle>
        )}
      </div>
    </section>
  );
}
export default Overview;
