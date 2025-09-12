import sliceAppPlaceholder from "assets/lovecode-main.png"
import sliceBackgroundBarPlaceholder from "assets/lovecode-preview.png"
import sliceIrlPlaceholder from "assets/lovecode-previewpanel.png"
import sliceSlidesPlaceholder from "assets/lovecode-logs.png"

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
import styles from "./LoveCode.module.css"

/* icons for features */
import {
  ArrowRight,
  Terminal,
  Rocket,
  Laptop,
  Layers,
  Wrench,
} from "lucide-react"

const title = "LoveCode: AI‑Powered Vibe Coding"
const description =
  "LoveCode is a personal side project — an AI-powered vibe coding platform that turns ideas into live, runnable apps. With sandboxed execution, live previews, and error recovery, it enables developers and creatives to go from text prompt to full stack app instantly."
const roles = ["Solo Developer", "Designer", "AI Agent Engineer"]

export const Slice = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectHeader
          title={title}
          description={description}
          url="https://lovecode-seven.vercel.app/"
          roles={roles}
        />

        {/* Hero Section */}
        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent>
            <div className={styles.heroWrapper}>
              <ProjectImage
                srcSet="assets/lovecode-main.png"
                placeholder={sliceAppPlaceholder}
                alt="LoveCode app showing chat-to-code workflow"
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
                className={styles.heroImage}
              />
              <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTagline}>
                    From Prompt → Code → Live App
                  </h2>
                  <div className={styles.heroButtons}>
                    <a
                      href="https://lovecode-seven.vercel.app/"
                      className={styles.heroButton}
                    >
                      Visit Live Demo <ArrowRight size={16} />
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
                  LoveCode is a solo side project that explores how AI can push
                  developer productivity forward. The platform lets you describe
                  an idea in plain language, and the system builds a live-running
                  application — complete with code diffs, logs, and previews.
                </ProjectSectionText>
                <ProjectSectionText>
                  I designed and implemented everything end‑to‑end: the AI agent
                  workflow, Vercel Sandbox integration, and the responsive
                  Next.js App Router frontend that ties chat, files, logs, and
                  previews into a single seamless developer experience.
                </ProjectSectionText>
              </div>
              <div className={styles.overviewImage}>
                <Image
                  srcSet="assets/lovecode-previewpanel.png"
                  placeholder={sliceIrlPlaceholder}
                  alt="LoveCode preview panel with live session"
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
                  Built LoveCode from the ground up as a personal side project,
                  handling both the frontend and backend orchestration.
                </p>
              </div>
              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>Designer</h3>
                <p className={styles.roleText}>
                  Crafted the product’s UX and UI, focusing on clarity,
                  developer feedback, and a playful creative vibe.
                </p>
              </div>
              <div className={styles.roleCard}>
                <h3 className={styles.roleTitle}>AI Agent Engineer</h3>
                <p className={styles.roleText}>
                  Implemented the agent’s planning, file generation, execution,
                  and error recovery loops to make AI‑to‑code reliable.
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className={styles.techStack}>
              <h3 className={styles.techStackTitle}>Tools & Technologies</h3>
              <div className={styles.techCategories}>
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Frontend</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Next.js 15</span>
                    <span className={styles.techBadge}>React 19</span>
                    <span className={styles.techBadge}>TypeScript</span>
                    <span className={styles.techBadge}>Tailwind v4</span>
                    <span className={styles.techBadge}>Radix UI</span>
                  </div>
                </div>
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>AI & Orchestration</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Vercel AI SDK</span>
                    <span className={styles.techBadge}>GPT‑5</span>
                    <span className={styles.techBadge}>Vercel AI Gateway</span>
                  </div>
                </div>
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Runtime</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>Vercel Sandboxes</span>
                    <span className={styles.techBadge}>Linux</span>
                    <span className={styles.techBadge}>pnpm</span>
                  </div>
                </div>
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Other</h4>
                  <div className={styles.techBadges}>
                    <span className={styles.techBadge}>zustand</span>
                    <span className={styles.techBadge}>zod</span>
                    <span className={styles.techBadge}>GitHub</span>
                    <span className={styles.techBadge}>Figma</span>
                  </div>
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Key Features */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.featuresIntro}>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              <ProjectSectionText className={styles.featuresDescription}>
                Built as an experiment in “vibe coding,” LoveCode simplifies
                rapid prototyping and lets creativity flow from chat to code.
              </ProjectSectionText>
            </div>

            <div className={styles.featureCards}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Terminal className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Chat‑to‑App</h3>
                <p className={styles.featureText}>
                  Talk to the AI, and watch it generate files, install deps,
                  spin up servers, and stream previews in real time.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Laptop className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Live Previews</h3>
                <p className={styles.featureText}>
                  Get instant preview URLs as soon as the sandbox exposes a
                  port — no manual setup required.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Layers className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Isolated Sandboxes</h3>
                <p className={styles.featureText}>
                  Run apps in secure, ephemeral environments where every
                  session is clean and reproducible.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Wrench className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Self‑Healing Flow</h3>
                <p className={styles.featureText}>
                  Automatic error summaries and iterative fixes allow the AI
                  agent to recover gracefully if builds fail.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Rocket className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Rapid Prototyping</h3>
                <p className={styles.featureText}>
                  Perfect for quickly trying out frameworks, whipping up
                  prototypes, hackathon projects, or playful coding ideas.
                </p>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Showcase */}
        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.showcaseGrid}>
            <div className={styles.showcaseVisual}>
              <div className={styles.showcaseBackground}>
                <Image
                  srcSet="/lovecode-logs.png"
                  placeholder={sliceSlidesPlaceholder}
                  alt="LoveCode logs panel streaming live output"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                  className={styles.showcaseBackImage}
                />
              </div>
            </div>
            <div className={styles.showcaseContent}>
              <ProjectSectionHeading>AI‑Driven Development</ProjectSectionHeading>
              <ProjectSectionText>
                Everything from file generation to command execution happens
                live in the browser view. The agent streams its reasoning,
                diffs, logs, and preview links continuously.
              </ProjectSectionText>
              <ul className={styles.showcaseList}>
                <li className={styles.showcaseListItem}>
                  <span /> Incremental file diff generation
                </li>
                <li className={styles.showcaseListItem}>
                  <span /> Real‑time logs with sandbox commands
                </li>
                <li className={styles.showcaseListItem}>
                  <span /> Automatic preview links
                </li>
                <li className={styles.showcaseListItem}>
                  <span /> Error recovery & self‑healing loop
                </li>
              </ul>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Outcomes & Reflection */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.impactHeader}>
              <ProjectSectionHeading>Outcomes & Impact</ProjectSectionHeading>
              <ProjectSectionText className={styles.impactIntro}>
                LoveCode taught me how far you can push AI-driven code
                generation in a real developer workflow. It’s been used to spin
                up dozens of live apps directly from chat prompts.
              </ProjectSectionText>
            </div>

            <div className={styles.impactStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>10×</span>
                <span className={styles.statLabel}>Faster prototyping</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Apps generated</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>Solo</span>
                <span className={styles.statLabel}>Built entirely by me</span>
              </div>
            </div>

            <div className={styles.impactImage}>
              <Image
                srcSet="/lovecode-preview.png"
                placeholder={sliceBackgroundBarPlaceholder}
                alt="LoveCode demo session running live app preview"
                className={styles.finalImage}
              />
            </div>

            <div className={styles.reflectionSection}>
              <h3 className={styles.reflectionHeading}>Reflection</h3>
              <blockquote className={styles.reflectionQuote}>
                "Building LoveCode showed me that coding can feel like jamming
                — fast, fun, and creative."
              </blockquote>
              <p className={styles.reflectionText}>
                As a side project, LoveCode was a chance to prototype fast and
                learn even faster. I handled everything end‑to‑end, and it
                reinforced how powerful feedback loops are — previews, logs,
                and diffs working together turn coding into an interactive
                dialogue. This project also sharpened my skills in AI
                orchestration, Next.js 15, and product design.
              </p>
            </div>

            <div className={styles.ctaSection}>
              <h3 className={styles.ctaHeading}>
                Want to try AI‑powered vibe coding yourself?
              </h3>
              <div className={styles.ctaButtons}>
                <a href="https://lovecode-seven.vercel.app/" className={styles.ctaButton}>
                  Try the Live Demo <ArrowRight size={16} />
                </a>
                <a
                  href="https://github.com/loveconnor/lovecode"
                  className={styles.ctaButtonSecondary}
                >
                  View Source on GitHub
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