/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useRef } from 'react';

import CustomHead from '@src/components/dom/CustomHead';
import NextProject from '@src/pages/projects/components/nextProject/NextProject';
import ProjectDetails from '@src/pages/projects/components/projectDetails/ProjectDetails';
import ProjectImages from '@src/pages/projects/components/projectsImages/ProjectImages';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SeoContent from '@src/pages/components/seo/Index';
import clsx from 'clsx';
import { gsap } from 'gsap';
import projects from '@src/constants/projects';
import styles from '@src/pages/projects/project.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';

function Page({ id }) {
  const isMobile = useIsMobile();
  const rightContainerRef = useRef();
  const leftContainerRef = useRef();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));
  const windowSize = useWindowSize();

  const projectIndex = useMemo(() => projects.findIndex((project) => project.id === id), [id]);
  const currentProject = useMemo(() => projects[projectIndex], [projectIndex]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!isLoading && !isMobile) {
        ScrollTrigger.create({
          id: 'project',
          trigger: rightContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: leftContainerRef.current,
          scrub: true,
          scroller: document?.querySelector('main'),
          invalidateOnRefresh: true,
          pinSpacing: false,
        });
      }
    });

    return () => {
      ctx.kill();
      ScrollTrigger.getById('project')?.kill();
    };
  }, [isMobile, isLoading, windowSize.width]);

  const seo = useMemo(
    () => ({
      title: currentProject.seoTitle || `${currentProject.title} Case Study | Connor Love Ohio Web Developer`,
      description:
        currentProject.seoDescription ||
        `${currentProject.title} is a web development case study by Connor Love, a Columbus-based Ohio web developer building websites, web apps, and AI product interfaces for clients across Ohio and worldwide.`,
      keywords: [
        `${currentProject.title} project`,
        `${currentProject.title} development`,
        `Connor Love ${currentProject.title}`,
        `Connor ${currentProject.title}`,
        `Web developer ${currentProject.title}`,
        `Web development ${currentProject.title}`,
        `Ohio web developer ${currentProject.title}`,
        `Creative developer ${currentProject.title}`,
        `Creative development ${currentProject.title}`,
        `Frontend development ${currentProject.title}`,
        `Website development ${currentProject.title}`,
        `Responsive design ${currentProject.title}`,
        `User interactions ${currentProject.title}`,
        `AI product interface ${currentProject.title}`,
        'Ohio web developer',
        'Web developer Columbus Ohio',
        'Website development Ohio',
        'Remote frontend developer',
        'Worldwide creative developer',
        'Columbus Ohio',
        ...(currentProject.seoKeywords || []),
      ],
    }),
    [currentProject],
  );

  return (
    <>
      <CustomHead {...seo} pageType="projects" project={currentProject} />
      <section className={clsx(styles.root, 'layout-grid-inner')}>
        <div ref={leftContainerRef} className={styles.leftContainer}>
          <ProjectDetails project={currentProject} />
        </div>
        <div ref={rightContainerRef} className={styles.rightContainer}>
          <ProjectImages project={currentProject} />
        </div>
      </section>
      <SeoContent variant="projects" project={currentProject} />
      <NextProject nextProject={projectIndex === projects.length - 1 ? projects[0] : projects[projectIndex + 1]} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = projects.map((project) => ({ params: { id: project.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  return { props: { id: params.id } };
}

export default Page;
