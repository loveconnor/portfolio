import sliceAnnotationPlaceholder from "assets/flowpoint-annotation-placeholder.png"
import sliceAppPlaceholder from "assets/flowpoint-app-placeholder.jpg"
import sliceBackgroundBarPlaceholder from "assets/flowpoint-background-bar-placeholder.jpg"
import sliceIrlPlaceholder from "assets/flowpoint-irl-placeholder.jpg"
import sliceSlidesPlaceholder from "assets/flowpoint-slides-placeholder.jpg"
import { Footer } from "components/Footer"
import { Image } from "components/Image"
import { Meta } from "components/Meta"
import {
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
} from "layouts/Project"
import { Fragment } from "react"
import { media } from "utils/style"
import styles from "./FlowPoint.module.css"
import { ArrowRight, Code, Database, Layers, Users } from 'lucide-react'

const title = "FlowPoint: Built from Scratch"
const description =
  "FlowPoint is a project management tool that I developed entirely from the ground up, from concept to deployment. The platform combines cutting-edge technologies to help teams streamline workflows, track progress, and collaborate effectively."
const roles = ["Full-Stack Development", "UX/UI Design", "System Architecture"]

export const Slice = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectHeader title={title} description={description} url="https://www.flowpointplatform.com" roles={roles} />

        {/* Hero Section with Gradient Overlay */}
        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent>
            <div className={styles.heroWrapper}>
              <ProjectImage
                srcSet="https://flowpointplatform.com/screenshots/app.png"
                placeholder={sliceAppPlaceholder}
                alt="The FlowPoint platform showcasing a real-time data dashboard."
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
                className={styles.heroImage}
              />
              <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTagline}>Redefining Project Management</h2>
                  <a href="https://www.flowpointplatform.com" className={styles.heroButton}>
                    View Live Platform <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Key Features Section */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.featuresIntro}>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              <ProjectSectionText className={styles.featuresDescription}>
                FlowPoint combines powerful functionality with intuitive design to create a seamless project management
                experience.
              </ProjectSectionText>
            </div>

            <div className={styles.featureCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Layers className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Dynamic Workflows</h3>
                <p className={styles.featureText}>
                  Customizable task boards that adapt to your team&apos;s unique processes and workflows.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Users className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Team Collaboration</h3>
                <p className={styles.featureText}>
                  Real-time communication tools integrated directly into your project workspace.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Database className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Data Insights</h3>
                <p className={styles.featureText}>
                  Comprehensive analytics to track progress and identify bottlenecks in your projects.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Code className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>API Integration</h3>
                <p className={styles.featureText}>
                  Seamless connections with your existing tools and services through our robust API.
                </p>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Development Journey Section */}
        <ProjectSection light className={styles.journeySection}>
          <ProjectSectionContent>
            <div className={styles.journeyHeader}>
              <ProjectSectionHeading>From Idea to Reality</ProjectSectionHeading>
              <div className={styles.journeyTimeline}>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineMarker}>01</span>
                  <span className={styles.timelineLabel}>Concept</span>
                </div>
                <div className={styles.timelineDivider}></div>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineMarker}>02</span>
                  <span className={styles.timelineLabel}>Design</span>
                </div>
                <div className={styles.timelineDivider}></div>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineMarker}>03</span>
                  <span className={styles.timelineLabel}>Development</span>
                </div>
                <div className={styles.timelineDivider}></div>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineMarker}>04</span>
                  <span className={styles.timelineLabel}>Launch</span>
                </div>
              </div>
            </div>

            <div className={styles.journeyContent}>
              <div className={styles.journeyText}>
                <ProjectSectionText>
                  FlowPoint started as an idea to streamline project management for teams. I designed and coded the
                  entire platform, focusing on intuitive user experiences and scalable architecture.
                </ProjectSectionText>
                <ProjectSectionText>
                  Using modern frameworks like React, Node.js, and PostgreSQL, I built a platform that integrates task
                  tracking, team collaboration, and robust performance monitoring.
                </ProjectSectionText>
                <div className={styles.techStack}>
                  <span className={styles.techBadge}>React</span>
                  <span className={styles.techBadge}>Node.js</span>
                  <span className={styles.techBadge}>PostgreSQL</span>
                  <span className={styles.techBadge}>GraphQL</span>
                  <span className={styles.techBadge}>WebSockets</span>
                </div>
              </div>
              <div className={styles.journeyVisual}>
                <Image
                  srcSet="https://www.flowpointplatform.com/screenshots/analytics.png"
                  placeholder={sliceSlidesPlaceholder}
                  alt="The FlowPoint dashboard showcasing user-specific insights."
                  sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
                  className={styles.journeyImage}
                />
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Feature Showcase Section */}
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.showcaseGrid}>
            <div className={styles.showcaseVisual}>
              <div className={styles.showcaseBackground}>
                <Image
                  srcSet="https://placehold.co/600x400"
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                  className={styles.showcaseBackImage}
                />
              </div>
              <div className={styles.showcaseForeground}>
                <Image
                  srcSet="https://placehold.co/600x400"
                  placeholder={sliceAnnotationPlaceholder}
                  alt="Detailed annotations highlighting data trends."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                  className={styles.showcaseFrontImage}
                />
              </div>
            </div>
            <div className={styles.showcaseContent}>
              <ProjectSectionHeading>Optimized for Scalability</ProjectSectionHeading>
              <ProjectSectionText>
                The platform was engineered with scalability in mind, ensuring it can handle growing teams and complex
                projects without compromising on performance.
              </ProjectSectionText>
              <ul className={styles.showcaseList}>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Microservice architecture for independent scaling</span>
                </li>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Containerized deployment with Kubernetes</span>
                </li>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Optimized database queries and caching</span>
                </li>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Real-time updates with minimal resource usage</span>
                </li>
              </ul>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Testimonial Section */}
        <ProjectSection className={styles.testimonialSection}>
          <ProjectSectionContent>
            <div className={styles.testimonial}>
              <div className={styles.testimonialQuote}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.quoteIcon}
                >
                  <path
                    d="M14.4 24H8V32H16V40H24V24H16V19.2C16 16.4 18.4 14 21.2 14H24V6H21.2C14 6 8 12 8 19.2V24H14.4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M40 24H33.6V19.2C33.6 16.4 36 14 38.8 14H41.6V6H38.8C31.6 6 25.6 12 25.6 19.2V24H32V32H40V40H48V24H40Z"
                    fill="currentColor"
                  />
                </svg>
                <p className={styles.testimonialText}>
                  FlowPoint has transformed how our team collaborates on complex projects. The intuitive interface and
                  powerful features have increased our productivity by over 40%.
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>
                  <div className={styles.avatarImage}></div>
                </div>
                <div className={styles.testimonialMeta}>
                  <h4 className={styles.testimonialName}>Sarah Johnson</h4>
                  <p className={styles.testimonialRole}>Product Manager, TechCorp</p>
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Impact Section */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.impactHeader}>
              <ProjectSectionHeading>Impact and Outcomes</ProjectSectionHeading>
              <ProjectSectionText className={styles.impactIntro}>
                FlowPoint has transformed how teams manage projects and collaborate. Building it from scratch allowed me
                to tailor every feature to user needs, resulting in a highly effective and innovative project management
                platform.
              </ProjectSectionText>
            </div>

            <div className={styles.impactStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>40%</span>
                <span className={styles.statLabel}>Increase in team productivity</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>5,000+</span>
                <span className={styles.statLabel}>Active users</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Customer satisfaction</span>
              </div>
            </div>

            <div className={styles.impactImage}>
              <Image
                srcSet="https://placehold.co/600x400"
                placeholder={sliceIrlPlaceholder}
                alt="Teams utilizing FlowPoint for collaborative data-driven decisions."
                className={styles.finalImage}
              />
            </div>

            <div className={styles.ctaSection}>
              <h3 className={styles.ctaHeading}>Ready to transform your project management?</h3>
              <a href="https://www.flowpointplatform.com" className={styles.ctaButton}>
                Try FlowPoint Today <ArrowRight size={16} />
              </a>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}
