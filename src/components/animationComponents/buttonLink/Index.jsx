import { useCallback, useRef } from 'react';

import Arrow from '@src/components/imageComponents/Arrow';
import Link from 'next/link';
import clsx from 'clsx';
import gsap from 'gsap';
import styles from '@src/components/animationComponents/buttonLink/buttonLink.module.scss';

function ButtonLink({ href, label, target = false }) {
  const spanRef = useRef(null);
  const relsRef = useRef({ relX: 0, relY: 0 });
  const isMailtoHref = /^mailto:/i.test(href);
  const isExternalHref = /^(https?:\/\/|mailto:|tel:)/i.test(href);
  const useNativeAnchor = target || isExternalHref;

  const handleMouseEnter = useCallback((e) => {
    const button = e.currentTarget;
    const span = spanRef.current;
    if (!button || !span) return;

    const { clientY } = e;
    const parentOffset = button.getBoundingClientRect();
    const isTop = clientY < parentOffset.top + parentOffset.height / 2;
    const relX = ((e.pageX - parentOffset.left) / parentOffset.width) * 100;
    const relY = isTop ? 0 : 100;

    relsRef.current = { relX, relY };

    gsap.set(span, { top: `${relY}%`, left: `${relX}%` });
    gsap.to(span, {
      duration: 0.6,
      ease: 'cubic-bezier(.4,0,.1,1)',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const span = spanRef.current;
    if (!span) return;

    const { relX, relY } = relsRef.current;
    gsap.to(span, {
      duration: 0.6,
      top: `${relY}%`,
      left: `${relX}%`,
      ease: 'cubic-bezier(.4,0,.1,1)',
    });
  }, []);

  const handleMailtoClick = useCallback(
    (event) => {
      if (!isMailtoHref) {
        return;
      }

      event.preventDefault();
      window.location.assign(href);

      const fallbackUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(href.replace(/^mailto:/i, ''))}`;
      window.setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.assign(fallbackUrl);
        }
      }, 700);
    },
    [href, isMailtoHref],
  );

  return useNativeAnchor ? (
    <a
      target={target ? '_blank' : undefined}
      rel={target ? 'noopener noreferrer' : undefined}
      aria-label={label}
      href={href}
      className={clsx('p-xs', styles.btnPosnawr)}
      onClick={isMailtoHref ? handleMailtoClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={clsx('p-x', styles.labelClassic)}>{label}</span>
      <Arrow className={styles.arrowClassic} />
      <span className={styles.ball} ref={spanRef} />
    </a>
  ) : (
    <Link aria-label={label} scroll={false} href={href} className={clsx('p-xs', styles.btnPosnawr)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className={clsx('p-x', styles.labelClassic)}>{label}</span>
      <Arrow className={styles.arrowClassic} />
      <span className={styles.ball} ref={spanRef} />
    </Link>
  );
}

export default ButtonLink;
