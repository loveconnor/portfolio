import clsx from 'clsx';
import { useId, useState } from 'react';
import styles from './samenessMachine.module.scss';

const controls = [
  { key: 'glow', label: 'Gradient glow' },
  { key: 'cards', label: 'Rounded cards' },
  { key: 'window', label: 'Floating product window' },
  { key: 'logos', label: 'Customer logo strip' },
  { key: 'copy', label: 'Vague AI copy' },
];

const initialState = {
  glow: false,
  cards: false,
  window: false,
  logos: false,
  copy: false,
};

function SamenessMachine() {
  const titleId = useId();
  const [enabled, setEnabled] = useState(initialState);
  const activeCount = Object.values(enabled).filter(Boolean).length;

  const toggle = (control) => {
    setEnabled((current) => ({
      ...current,
      [control]: !current[control],
    }));
  };

  const reset = () => setEnabled(initialState);

  return (
    <section className={styles.machine} aria-labelledby={titleId}>
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Interactive experiment</p>
          <h3 id={titleId}>Build the default website</h3>
          <p className={styles.description}>Add familiar choices to a plain product message. Notice how quickly “polished” appears—and how little the idea changes.</p>
        </div>

        <button className={styles.reset} type="button" onClick={reset} disabled={activeCount === 0}>
          Reset
        </button>
      </div>

      <div className={styles.layout}>
        <fieldset className={styles.controls}>
          <legend>Style controls</legend>

          {controls.map(({ key, label }) => (
            <label className={styles.control} htmlFor={`${titleId}-${key}`} key={key}>
              <span>{label}</span>
              <input id={`${titleId}-${key}`} type="checkbox" checked={enabled[key]} onChange={() => toggle(key)} />
              <span className={styles.switch} aria-hidden="true" />
            </label>
          ))}

          <p className={styles.score} aria-live="polite">
            {activeCount === 0 ? 'No defaults added.' : `${activeCount} of ${controls.length} familiar defaults added.`}
          </p>
        </fieldset>

        <div className={clsx(styles.preview, enabled.glow && styles.previewGlow, enabled.cards && styles.previewCards)}>
          <div className={styles.previewNav} aria-hidden="true">
            <span className={styles.previewBrand}>HARBOR</span>
            <span className={styles.previewNavLink}>Product</span>
            <span className={styles.previewNavLink}>Pricing</span>
            <span className={styles.previewButton}>Start free</span>
          </div>

          <div className={styles.previewHero}>
            <p className={styles.previewLabel}>Work planning for small studios</p>
            <h4>{enabled.copy ? 'Unlock your team’s full potential' : 'See every project at risk before Monday’s client meeting'}</h4>
            <p>
              {enabled.copy
                ? 'Streamline workflows, boost productivity, and move faster with an intelligent platform built for modern teams.'
                : 'Harbor combines deadlines, client feedback, and team capacity in one weekly view.'}
            </p>
            <button type="button">Try the weekly view</button>
          </div>

          {enabled.window && (
            <div className={styles.productWindow} aria-label="Example floating product window">
              <div className={styles.windowBar} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className={styles.windowBody}>
                <div className={styles.windowSidebar} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.windowContent} aria-hidden="true">
                  <span className={styles.windowHeading} />
                  <div className={styles.windowRows}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          )}

          {enabled.logos && (
            <div className={styles.previewLogos} aria-label="Example customer logos">
              <span>NORTH</span>
              <span>FORM</span>
              <span>STILL</span>
              <span>FIELD</span>
            </div>
          )}

          <div className={styles.previewFeatures}>
            <article>
              <span>01</span>
              <strong>Deadlines</strong>
              <p>See what is drifting before it becomes a client surprise.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Capacity</strong>
              <p>Plan the week around the people actually available.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Feedback</strong>
              <p>Keep approvals next to the work they can block.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SamenessMachine;
