'use client';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/landing.png';
import chatLanding from 'assets/chatLanding.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const baseDisciplines = [
  'VUkvVVggRXhwZXJ0',
  'RGV2ZWxvcGVy',
  'U0VPIE9wdGltaXplcg==',
  'QnJhbmQtQnVpbGRlcg==',
  'UGhvdG9zaG9wcGVy',
];

// hehe we decode the base64 strings to get the actual disciplines hehe
const disciplines = baseDisciplines.map(b64 =>
  Buffer.from(b64, 'base64').toString('utf-8')
);

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef(null);
  const projectOne = useRef(null);
  const projectTwo = useRef(null);
  const details = useRef(null);

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundNoise} />
      <Meta
        title="Designer + Developer"
        description="Design Portfolio of Connor Love — An innovative web and graphic designer specializing in creating dynamic web and mobile applications, with an emphasis on user-centric design, motion graphics, and universal accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        {...(visibleSections.includes(projectOne.current) ? { visible: true } : {})}
        index={1}
        title="EduSynapse"
        description="An AI Powered Learning Platform"
        buttonText="View Case Study"
        buttonLink="/projects/edusynapse"
        model={{
          type: 'laptop',
          alt: 'A project management tool',
          textures: [
            {
              srcSet: [sprTexture],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        {...(visibleSections.includes(projectTwo.current) ? { visible: true } : {})}
        index={2}
        title="LoveChat"
        description="T3 Chat cloneathon submission"
        buttonText="View Case Study"
        buttonLink="/projects/lovechat"
        model={{
          type: 'laptop',
          alt: 'T3 Chat Cloneathon Submission',
          textures: [
            {
              srcSet: [chatLanding],
              placeholder: sprTexturePlaceholder,
            },
          ]
        }}
      />

      <Profile
        sectionRef={details}
        {...(visibleSections.includes(details.current) ? { visible: true } : {})}
        id="details"
      />
      <Footer />
    </div>
  );
};
