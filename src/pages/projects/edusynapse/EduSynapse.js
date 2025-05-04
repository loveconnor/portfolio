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
import styles from "./EduSynapse.module.css"
/* Update the icons to use the primary color */
import { ArrowRight, Code, Brain, BookOpen, BarChart, Bot } from "lucide-react"

const title = "EduSynapse: AI-Powered Adaptive Learning"
const description =
  "EduSynapse is an AI-driven educational platform designed to revolutionize self-paced learning. It offers adaptive learning paths, interactive coding environments, and personalized study plans, all tailored to individual learning styles and progress."
const roles = ["Co-founder", "Frontend Lead", "Product Strategist"]

export const Slice = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectHeader title={title} description={description} url="https://www.edu-synapse.com" roles={roles} />

        {/* Hero Section with Gradient Overlay */}
        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent>
            <div className={styles.heroWrapper}>
              <ProjectImage
                srcSet="/paths.png"
                placeholder={sliceAppPlaceholder}
                alt="The EduSynapse platform showcasing an adaptive learning dashboard."
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
                className={styles.heroImage}
              />
              <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTagline}>Revolutionizing Self-Paced Learning</h2>
                  <div className={styles.heroButtons}>
                    <a href="https://www.edu-synapse.com" className={styles.heroButton}>
                      Visit Live Site <ArrowRight size={16} />
                    </a>
                    <a href="#case-study" className={styles.heroButtonSecondary}>
                      Read Full Case Study
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Project Overview Section */}
        <ProjectSection id="case-study">
          <ProjectSectionContent>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewContent}>
                <ProjectSectionHeading>Project Overview</ProjectSectionHeading>
                <ProjectSectionText>
                  EduSynapse is an AI-driven educational platform designed to revolutionize self-paced learning. It
                  offers adaptive learning paths, interactive coding environments, and personalized study plans, all
                  tailored to individual learning styles and progress.
                </ProjectSectionText>
                <ProjectSectionText>
                  As the Co-founder and Frontend Lead, I was instrumental in shaping the product&aposs vision, designing its
                  user interface, and implementing a responsive and scalable frontend architecture.
                </ProjectSectionText>
              </div>
              <div className={styles.overviewImage}>
                <Image
                  srcSet="/list.png"
                  placeholder={sliceSlidesPlaceholder}
                  alt="User interacting with EduSynapse&aposs adaptive learning interface"
                  sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
                  className={styles.journeyImage}
                />
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* My Role Section */}
        <ProjectSection className={styles.roleSection}>
          <ProjectSectionContent>
            <ProjectSectionHeading>My Role</ProjectSectionHeading>

            <div className={styles.roleCards}>
              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>Co-founder</h3>
                <p className={styles.roleText}>
                  Collaborated on the initial product vision, conducted design sprints, and prioritized features based
                  on user needs.
                </p>
              </div>

              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>Frontend Lead</h3>
                <p className={styles.roleText}>
                  Developed reusable components, implemented routing and state management, and ensured accessibility and
                  responsiveness across devices.
                </p>
              </div>

              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>Product Strategist</h3>
                <p className={styles.roleText}>
                  Engaged in user research, feedback loops, and iterative development to align the product with learner
                  requirements.
                </p>
              </div>
            </div>

            <div className={styles.techStack}>
              <h3 className={styles.techStackTitle}>Tools & Technologies</h3>
              <div className={styles.techCategories}>
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Frontend</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Next.js 14</span>
                    <span className={styles.techBadge}>TypeScript</span>
                    <span className={styles.techBadge}>Tailwind CSS</span>
                    <span className={styles.techBadge}>shadcn/ui</span>
                    <span className={styles.techBadge}>D3.js</span>
                    <span className={styles.techBadge}>React Force Graph</span>
                    <span className={styles.techBadge}>KaTeX</span>
                  </div>
                </div>

                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Backend Integration</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Prisma ORM</span>
                    <span className={styles.techBadge}>PostgreSQL</span>
                    <span className={styles.techBadge}>JWT authentication</span>
                  </div>
                </div>

                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>AI & Machine Learning</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Custom-trained models</span>
                    <span className={styles.techBadge}>S1 scaling</span>
                    <span className={styles.techBadge}>Qwen 2.5</span>
                    <span className={styles.techBadge}>Ollama</span>
                    <span className={styles.techBadge}>DeepSeek-R1</span>
                  </div>
                </div>

                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Other</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Vercel</span>
                    <span className={styles.techBadge}>GitHub Actions</span>
                    <span className={styles.techBadge}>Lottie animations</span>
                    <span className={styles.techBadge}>Markdown rendering</span>
                    <span className={styles.techBadge}>Figma</span>
                    <span className={styles.techBadge}>Notion</span>
                    <span className={styles.techBadge}>Linear</span>
                  </div>
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
                EduSynapse combines AI-driven personalization with interactive learning tools to create a truly adaptive
                educational experience.
              </ProjectSectionText>
            </div>

            <div className={styles.featureCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Brain className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Adaptive Learning Paths</h3>
                <p className={styles.featureText}>
                  AI-generated learning journeys tailored to individual styles, dynamically adjusting modules and
                  difficulty based on progress and performance.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Code className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Interactive Code Execution</h3>
                <p className={styles.featureText}>
                  Run Python and JavaScript directly in the browser with a secure sandbox environment, allowing learners
                  to experiment with code on the fly.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <BookOpen className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Knowledge Graph</h3>
                <p className={styles.featureText}>
                  Visualize concept relationships through an interactive graph that helps learners grasp complex topics
                  by revealing how ideas connect.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <BarChart className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Smart Reviews</h3>
                <p className={styles.featureText}>
                  Optimized scheduling powered by a Spaced Repetition System, utilizing a custom ease factor algorithm
                  to help learners retain information longer.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Bot className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>AI Tutor – STEVE</h3>
                <p className={styles.featureText}>
                  Access 24/7 assistance from STEVE (System for Teaching, Evaluating, and Visualizing Education), a
                  personal AI tutor ready to offer on-demand explanations.
                </p>
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
                  srcSet="/chat.png"
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt="Chat interface for learning topics"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                  className={styles.showcaseBackImage}
                />
              </div>
            </div>
            <div className={styles.showcaseContent}>
              <ProjectSectionHeading>AI-Powered Learning</ProjectSectionHeading>
              <ProjectSectionText>
                The platform leverages advanced AI models to create a truly personalized learning experience. Our
                custom-trained models analyze learning patterns and adapt content in real-time.
              </ProjectSectionText>
              <ul className={styles.showcaseList}>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Custom-trained models using S1 scaling techniques</span>
                </li>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Base model from Qwen 2.5 with specialized fine-tuning</span>
                </li>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>Local deployment using Ollama for privacy and speed</span>
                </li>
                <li className={styles.showcaseListItem}>
                  <span className={styles.showcaseListMarker}></span>
                  <span>DeepSeek-R1 for advanced reasoning capabilities</span>
                </li>
              </ul>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Impact Section */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.impactHeader}>
              <ProjectSectionHeading>Outcomes & Impact</ProjectSectionHeading>
              <ProjectSectionText className={styles.impactIntro}>
                EduSynapse has made significant strides in transforming how students learn and retain information. Our
                AI-driven approach has yielded impressive results in early testing.
              </ProjectSectionText>
            </div>

            <div className={styles.impactStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>90%</span>
                <span className={styles.statLabel}>Module completion rate</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>2x</span>
                <span className={styles.statLabel}>Faster learning reported</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>Featured</span>
                <span className={styles.statLabel}>By educator networks</span>
              </div>
            </div>

            <div className={styles.impactImage}>
              <Image
                srcSet="/module.png"
                placeholder={sliceIrlPlaceholder}
                alt="Students using EduSynapse on various devices"
                className={styles.finalImage}
              />
            </div>

            <div className={styles.reflectionSection}>
              <h3 className={styles.reflectionHeading}>Reflection</h3>
              <blockquote className={styles.reflectionQuote}>
                &quotBuilding EduSynapse taught me that great educational tools come from deeply understanding the learner&aposs
                journey.&quot
              </blockquote>
              <p className={styles.reflectionText}>
                Creating EduSynapse has been a journey of continuous learning and iteration. By focusing on the needs of
                learners and leveraging the latest in AI technology, we&aposve built a platform that truly adapts to
                individual learning styles. The scalable frontend architecture we developed will support future AI
                personalization features and third-party integrations, ensuring EduSynapse can grow and evolve with
                educational needs.
              </p>
            </div>

            <div className={styles.ctaSection}>
              <h3 className={styles.ctaHeading}>Interested in learning more about EduSynapse?</h3>
              <div className={styles.ctaButtons}>
                <a href="https://www.edu-synapse.com" className={styles.ctaButton}>
                  Visit Live Site <ArrowRight size={16} />
                </a>
                <a href="https://github.com/Monster0506/edusynapse" className={styles.ctaButtonSecondary}>
                  View Open Source Code
                </a>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  )
}

export default Slice
