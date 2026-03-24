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
            <h3 className="h3">I build for the web with a focus on</h3>
            <h3 className="h3">
              <span className="medium">performance</span>, <span className="medium">clarity</span>,
            </h3>
            <h3 className="h3">
              and <span className="medium">how things feel</span> to use.
            </h3>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-queto">
            <h3 className="h3">I build for the web with a focus on</h3>
            <h3 className="h3">
              <span className="medium">performance</span>, <span className="medium">clarity</span>, and
            </h3>
            <h3 className="h3">
              <span className="medium">how things feel</span> to use.
            </h3>
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
            <h6 className="h6">I&apos;m Connor, a creative developer focused on building</h6>
            <h6 className="h6">modern web applications that balance design and</h6>
            <h6 className="h6">engineering. My work centers around performance,</h6>
            <h6 className="h6">interaction, and creating experiences that feel smooth</h6>
            <h6 className="h6">and intentional.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>I&apos;ve built projects ranging from interactive interfaces</h6>
            <h6 className="h6">to full-stack applications, always focusing on clean</h6>
            <h6 className="h6">systems and long-term scalability.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>Outside of coding, I spend time exploring design and</h6>
            <h6 className="h6">refining details to make my work feel more polished</h6>
            <h6 className="h6">and thoughtful.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>Connor Love.</h6>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-overview">
            <h6 className="h6">I&apos;m Connor, a creative developer focused on building modern</h6>
            <h6 className="h6">web applications that balance design and engineering.</h6>
            <h6 className="h6">My work centers around performance, interaction, and</h6>
            <h6 className="h6">creating experiences that feel smooth and intentional.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>I&apos;ve built projects ranging from interactive interfaces to</h6>
            <h6 className="h6">full-stack applications, always focusing on clean systems</h6>
            <h6 className="h6">and long-term scalability.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>Outside of coding, I spend time exploring design, refining</h6>
            <h6 className="h6">details, and pushing my work to feel more polished</h6>
            <h6 className="h6">and thoughtful.</h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>Connor Love.</h6>
          </AppearTitle>
        )}
      </div>
    </section>
  );
}
export default Overview;
