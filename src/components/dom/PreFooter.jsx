import FruitNinja from '@src/components/dom/prefooter/Index';
import clsx from 'clsx';
import styles from '@src/components/dom/styles/preFooter.module.scss';

function PreFooter() {
  return (
    <section className={clsx(styles.root, 'layout-block-inner')}>
      <div className={styles.textsContainer}>
        <div>
          <h2 className="h1">Let&apos;s build something</h2>
          <h2 className="h1"> real for the web</h2>
          <h2 className="h1"> together.</h2>
        </div>
        <div>
          <p className="h6">Have a project in mind? Let&apos;s talk.</p>
        </div>
      </div>

      <div className={styles.canvas}>
        <FruitNinja />
      </div>
    </section>
  );
}

export default PreFooter;
