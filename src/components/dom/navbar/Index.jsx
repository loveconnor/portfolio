import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import { BOOK_CALL_URL } from '@src/constants/contact';
import Link from 'next/link';
import MenuButton from '@src/components/dom/navbar/components/MenuButton';
import MenuLinks from '@src/components/dom/navbar/components/MenuLinks';
import clsx from 'clsx';
import styles from '@src/components/dom/navbar/styles/index.module.scss';
import menuButtonStyles from '@src/components/dom/navbar/styles/menuButton.module.scss';
import { useCallback } from 'react';
import useIsMobile from '@src/hooks/useIsMobile';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function Navbar() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [lenis] = useStore(useShallow((state) => [state.lenis]));

  const scrollToPosition = useCallback(
    (position, duration = 1.5) => {
      if (lenis) {
        lenis.scrollTo(position, {
          duration,
          force: true,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          onComplete: () => {
            lenis.start();
          },
        });
      }
    },
    [lenis],
  );

  const goToTop = useCallback(() => {
    if (router.pathname === '/') {
      scrollToPosition(0);
    }
  }, [router.pathname, scrollToPosition]);

  return (
    <>
      <MenuLinks />

      <header className={styles.root} role="banner">
        <div className={styles.innerHeader}>
          <Link onClick={goToTop} aria-label="Go home" scroll={false} href="/">
            <span className={clsx('bold', 'h4')}>CONNOR</span>
          </Link>

          <div className={styles.rightContainer}>
            {!isMobile && <ButtonLink href={BOOK_CALL_URL} label="BOOK A CALL" target />}
            <a href="https://room.connorlove.com" className={clsx('p-xs', menuButtonStyles.button, styles.deskLink)}>
              <span className={clsx('p-x', menuButtonStyles.label)}>View in 3D</span>
            </a>
            <MenuButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
