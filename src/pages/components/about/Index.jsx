import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/about/styles/about.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function About() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const animatedImageRef = useRef();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      gsap.set(animatedImageRef.current, { top: !isMobile ? '-20vw' : '0' });
      if (!isMobile) {
        gsap.to(animatedImageRef.current, {
          top: '20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation();
    return () => ctx.kill();
  }, [isMobile]);

  const renderImageContainer = () => (
    <div className={styles.imageContainer}>
      <Image priority src="/connor/front.webp" width={1024} height={1536} sizes="(max-width: 768px) 100vw, 50vw" alt="Connor Love" />
    </div>
  );

  return (
    <section ref={rootRef} className={styles.root}>
      <div className={clsx(styles.nameContainer, 'layout-block-inner')}>
        <AppearTitle>
          <h2 className={clsx('h1', 'medium')}>Hey, My name&apos;s</h2>
          <p className={clsx('h1', 'medium')}>Connor Love!</p>
        </AppearTitle>
      </div>

      <div className={clsx(styles.container, 'layout-grid-inner')}>
        {isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapper)} ref={animatedImageRef}>
          <AppearTitle>
            <div className="p-l">
              “My experience as a self-taught developer has pushed me to think creatively and build with intention, focusing on how things look, feel, and perform in real use.”
            </div>
          </AppearTitle>
        </div>
        {!isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapperBottom)}>
          {!isMobile ? (
            <AppearTitle key="desktop-descWrapperBottom">
              <p className="h6">A creative developer focused on building modern</p>
              <p className="h6">web experiences with a strong balance of design</p>
              <p className="h6">and engineering. I specialize in creating fast,</p>
              <p className="h6">interactive applications that are clean, scalable,</p>
              <p className="h6">and built to perform.</p>
            </AppearTitle>
          ) : (
            <AppearTitle key="mobile-descWrapperBottom">
              <p className="h6">A creative developer focused on building modern web</p>
              <p className="h6">experiences with a strong balance of design and</p>
              <p className="h6">engineering. I specialize in creating fast, interactive</p>
              <p className="h6">applications that are clean, scalable, and built to perform.</p>
            </AppearTitle>
          )}
          <div className={clsx(styles.buttonContainer)}>
            <ButtonLink href="/about" label="ABOUT ME" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
