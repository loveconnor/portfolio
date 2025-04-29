import sliceAnnotationLarge from 'assets/flowpoint-annotation-large.png';
import sliceAnnotationPlaceholder from 'assets/flowpoint-annotation-placeholder.png';
import sliceAnnotation from 'assets/flowpoint-annotation.png';
import sliceAppLarge from 'assets/flowpoint-app-large.jpg';
import sliceAppPlaceholder from 'assets/flowpoint-app-placeholder.jpg';
import sliceApp from 'assets/flowpoint-app.jpg';
import sliceBackgroundBarLarge from 'assets/flowpoint-background-bar-large.jpg';
import sliceBackgroundBarPlaceholder from 'assets/flowpoint-background-bar-placeholder.jpg';
import sliceBackgroundBar from 'assets/flowpoint-background-bar.jpg';
import sliceBackgroundLarge from 'assets/flowpoint-background-large.jpg';
import sliceBackgroundPlaceholder from 'assets/flowpoint-background-placeholder.jpg';
import sliceBackground from 'assets/flowpoint-background.jpg';
import sliceIrlPlaceholder from 'assets/flowpoint-irl-placeholder.jpg';
import sliceIrl from 'assets/flowpoint-irl.jpg';
import sliceSidebarAnnotationsLarge from 'assets/flowpoint-sidebar-annotations-large.png';
import sliceSidebarAnnotationsPlaceholder from 'assets/flowpoint-sidebar-annotations-placeholder.png';
import sliceSidebarAnnotations from 'assets/flowpoint-sidebar-annotations.png';
import sliceSidebarLayersLarge from 'assets/flowpoint-sidebar-layers-large.png';
import sliceSidebarLayersPlaceholder from 'assets/flowpoint-sidebar-layers-placeholder.png';
import sliceSidebarLayers from 'assets/flowpoint-sidebar-layers.png';
import sliceSlidesLarge from 'assets/flowpoint-slides-large.jpg';
import sliceSlidesPlaceholder from 'assets/flowpoint-slides-placeholder.jpg';
import sliceSlides from 'assets/flowpoint-slides.jpg';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './FlowPoint.module.css';

const title = 'FlowPoint: Built from Scratch';
const description =
  'FlowPoint is a project management tool that I developed entirely from the ground up, from concept to deployment. The platform combines cutting-edge technologies to help teams streamline workflows, track progress, and collaborate effectively.';
const roles = ['Full-Stack Development', 'UX/UI Design', 'System Architecture'];

export const Slice = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.flowpointplatform.com"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet="https://flowpointplatform.com/screenshots/app.png"
              placeholder={sliceAppPlaceholder}
              alt="The FlowPoint platform showcasing a real-time data dashboard."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>From Idea to Reality</ProjectSectionHeading>
              <ProjectSectionText>
                FlowPoint started as an idea to streamline project management for teams. I designed and coded the entire platform, focusing on intuitive user experiences and scalable architecture.
              </ProjectSectionText>
              <ProjectSectionText>
                Using modern frameworks like React, Node.js, and PostgreSQL, I built a platform that integrates task tracking, team collaboration, and robust performance monitoring.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet="https://placehold.co/600x400"
                placeholder={sliceSidebarLayersPlaceholder}
                alt="Collaborative dashboards with real-time layers."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet="https://placehold.co/600x400"
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Real-time annotations on shared dashboards."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Custom-Built Features</ProjectSectionHeading>
              <ProjectSectionText>
                Every aspect of FlowPoint was built to address specific team needs. From dynamic task boards to integrated communication tools, the platform is optimized for team efficiency and productivity.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet="https://www.flowpointplatform.com/screenshots/analytics.png"
              placeholder={sliceSlidesPlaceholder}
              alt="The FlowPoint dashboard showcasing user-specific insights."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet="https://placehold.co/600x400"
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet="https://placehold.co/600x400"
                  placeholder={sliceAnnotationPlaceholder}
                  alt="Detailed annotations highlighting data trends."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Optimized for Scalability</ProjectSectionHeading>
              <ProjectSectionText>
                The platform was engineered with scalability in mind, ensuring it can handle growing teams and complex projects without compromising on performance.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Impact and Outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                FlowPoint has transformed how teams manage projects and collaborate. Building it from scratch allowed me to tailor every feature to user needs, resulting in a highly effective and innovative project management platform that empowers organizations worldwide.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet="https://placehold.co/600x400"
              placeholder={sliceIrlPlaceholder}
              alt="Teams utilizing FlowPoint for collaborative data-driven decisions."
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
