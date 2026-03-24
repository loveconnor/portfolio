import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/components/animationComponents/infiniteText/infiniteText.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function InfiniteText({ text, length, className, hasStroke = true }) {
  const containerRef = useRef();

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !container.children?.[0]) return undefined;

    const applyOffset = () => {
      const containerWidth = container.getBoundingClientRect().width;
      const itemWidth = container.children[0].getBoundingClientRect().width;

      if (containerWidth <= 0 || itemWidth <= 0) return;

      const initialOffset = ((2 * itemWidth) / containerWidth) * 100 * -1;

      gsap.set(container, {
        xPercent: `${initialOffset}`,
      });
    };

    const duration = 5;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(container, {
        ease: 'none',
        duration,
        xPercent: 0,
        repeat: -1,
      });
    }, containerRef);

    const rafId = requestAnimationFrame(applyOffset);

    const resizeObserver = new ResizeObserver(() => {
      applyOffset();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(container.children[0]);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      ctx.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.root}>
      {Array.from({ length }, (_, index) => (
        <div key={`${index}-${text}`} className={clsx(styles.infiniteItem, index % 2 === 0 && hasStroke && styles.stroke, className)}>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

export default InfiniteText;
