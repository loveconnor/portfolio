import sliceAppPlaceholder from "assets/chatLanding.png"
import sliceBackgroundBarPlaceholder from "assets/lovechat-demo.png"
import sliceIrlPlaceholder from "assets/lovechat-preview.png"

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
import styles from "./LoveChat.module.css"

/* icons for features */
import {
  ArrowRight,
  Brain,
  Search,
  BookOpen,
  FileText,
  Workflow,
  HeadphonesIcon,
} from "lucide-react"

const title = "LoveChat: Advanced AI Chat Application"
const description =
  "LoveChat is a sophisticated, feature-rich AI chat application built as an official entry for the T3 Chat Cloneathon. It showcases multi-provider model support, workflows, artifacts, and text-to-speech — all wrapped in a polished chat UX for power users and developers."
const roles = ["Solo Developer & Designer"]

export const Slice = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />

      <ProjectContainer className={styles.slice}>
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/coding-with-love/t3clone"
          roles={roles}
        />

        {/* Hero Section */}
        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent>
            <div className={styles.heroWrapper}>
              <ProjectImage
                srcSet="assets/chatLanding.png"
                placeholder={sliceAppPlaceholder}
                alt="LoveChat application showing AI chat interface"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
                className={styles.heroImage}
              />
              <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTagline}>
                    An AI Chat Experience for Developers & Power Users
                  </h2>
                  <div className={styles.heroButtons}>
                    <a
                      href="https://github.com/coding-with-love/t3clone"
                      className={styles.heroButton}
                    >
                      View Source Code <ArrowRight size={16} />
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

        {/* Project Overview */}
        <ProjectSection id="case-study">
          <ProjectSectionContent>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewContent}>
                <ProjectSectionHeading>Project Overview</ProjectSectionHeading>
                <ProjectSectionText>
                  LoveChat was my submission to the{" "}
                  <strong>T3 Chat Cloneathon</strong>, where I built a modern AI
                  chat app that goes far beyond standard messaging interfaces.
                  It integrates advanced model providers, workflow automation,
                  web search, personas, file handling, and even artifact
                  versioning — all accessible in a single, seamless chat UI.
                </ProjectSectionText>
                <ProjectSectionText>
                  As the solo developer, I implemented everything end‑to‑end:
                  the Next.js 15 frontend, Supabase backend, model
                  integrations, artifact system, and workflow builder. The
                  result is a polished, competition‑ready product designed for
                  real productivity and experimentation.
                </ProjectSectionText>
              </div>
              <div className={styles.overviewImage}>
                <Image
                  srcSet="assets/lovechat-preview.png"
                  placeholder={sliceIrlPlaceholder}
                  alt="Screenshot of LoveChat chat session in action"
                  sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
                />
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* My Role */}
        <ProjectSection className={styles.roleSection}>
          <ProjectSectionContent>
            <ProjectSectionHeading>My Role</ProjectSectionHeading>
            <div className={styles.roleCards}>
              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>Solo Developer</h3>
                <p className={styles.roleText}>
                  Built LoveChat from scratch, including frontend, backend, and
                  orchestration logic.
                </p>
              </div>
              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>Designer</h3>
                <p className={styles.roleText}>
                  Crafted an accessible, power-user‑friendly interface with a
                  polished, competition-level UX.
                </p>
              </div>
              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>AI Integrator</h3>
                <p className={styles.roleText}>
                  Integrated multiple AI providers, reasoning models, and
                  search/voice APIs to deliver advanced functionality.
                </p>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Tech Stack */}
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectSectionHeading>Tools & Technologies</ProjectSectionHeading>
            <ProjectSectionText>
              <strong>Frontend:</strong> Next.js 15, React 19, TypeScript,
              Tailwind CSS 4, Radix UI, Framer Motion
              <br />
              <strong>Backend:</strong> Supabase (Postgres DB, Auth, Storage,
              Edge Functions)
              <br />
              <strong>State/Data:</strong> Zustand, TanStack Query, SWR, Dexie,
              React Hook Form
              <br />
              <strong>AI Integration:</strong> OpenAI, Google Gemini,
              OpenRouter (Claude, Llama, Qwen), Ollama, DeepSeek
              <br />
              <strong>Other:</strong> Serper API (Web Search), ElevenLabs (TTS),
              KaTeX, PDF.js
            </ProjectSectionText>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Key Features */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.featuresIntro}>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              <ProjectSectionText className={styles.featuresDescription}>
                LoveChat is packed with features designed to push beyond
                ordinary chat apps — made for developers, power users, and AI
                explorers.
              </ProjectSectionText>
            </div>

            <div className={styles.featureCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Brain className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Multi‑Model AI</h3>
                <p className={styles.featureText}>
                  Integrates OpenAI, Gemini, Claude, Llama, Ollama, DeepSeek,
                  and more — with live reasoning display and effort control.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Search className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Web Search</h3>
                <p className={styles.featureText}>
                  Real-time Google results with Serper API, source attribution,
                  streamable results, and knowledge graph support.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <BookOpen className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Personas & Templates</h3>
                <p className={styles.featureText}>
                  Build and save custom assistants with unique system prompts,
                  personalities, and sharable templates.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <FileText className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Artifacts & Files</h3>
                <p className={styles.featureText}>
                  Automatically extract and save code/document outputs,
                  organize them by project, and browse via artifact gallery.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <HeadphonesIcon className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Voice Support</h3>
                <p className={styles.featureText}>
                  ElevenLabs integration for high-quality text-to-speech with
                  real-time streaming and audio history tracking.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Workflow className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Workflow Builder</h3>
                <p className={styles.featureText}>
                  A drag-and-drop automation system for chaining together
                  multi-step AI tasks with conditional logic and custom
                  variables.
                </p>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Impact & Reflection */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.impactHeader}>
              <ProjectSectionHeading>Outcomes & Impact</ProjectSectionHeading>
              <ProjectSectionText className={styles.impactIntro}>
                LoveChat was completed as a polished, competition‑ready
                submission for the T3 Chat Cloneathon. It highlighted the
                potential for AI chat apps to combine advanced integrations with
                thoughtful UX and developer‑focused functionality.
              </ProjectSectionText>
            </div>

            <div className={styles.impactStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>🏆</span>
                <span className={styles.statLabel}>Cloneathon Entry</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>AI Models Integrated</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>Solo</span>
                <span className={styles.statLabel}>Built entirely by me</span>
              </div>
            </div>

            <div className={styles.impactImage}>
              <Image
                srcSet="assets/lovechat-demo.png"
                placeholder={sliceBackgroundBarPlaceholder}
                alt="LoveChat demo displaying reasoning and web search integration"
                className={styles.finalImage}
              />
            </div>

            <div className={styles.reflectionSection}>
              <h3 className={styles.reflectionHeading}>Reflection</h3>
              <blockquote className={styles.reflectionQuote}>
                &quot;LoveChat pushed me to combine advanced AI integrations with a
                polished UX, showing the power of building end‑to‑end as a solo
                developer.&quot;
              </blockquote>
              <p className={styles.reflectionText}>
                Building LoveChat gave me a playground to connect modern AI APIs
                with strong frontend design. Working solo meant handling
                everything: state management, backend auth, and orchestrating
                multiple providers. It cemented my skills in AI development and
                frontend scalability, and taught me how important seamless UX is
                for heavy‑duty AI tools.
              </p>
            </div>

            <div className={styles.ctaSection}>
              <h3 className={styles.ctaHeading}>
                Interested in exploring LoveChat?
              </h3>
              <div className={styles.ctaButtons}>
                <a
                  href="https://github.com/coding-with-love/t3clone"
                  className={styles.ctaButton}
                >
                  View Source on GitHub <ArrowRight size={16} />
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