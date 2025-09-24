"use client"

import { Footer } from "components/Footer"
import { Meta } from "components/Meta"
import { Fragment, useState } from "react"
import styles from "./Uses.module.css"
import {
  Code,
  Globe,
  Atom,
  Box,
  Palette,
  Sparkles,
  BookOpen,
  Search,
  ExternalLink,
  Figma as FigmaIcon,
  Layers,
  X,
  Database,
  Server,
  Cpu,
  Cloud,
  Terminal
} from "lucide-react"

const designTools = [
  {
    name: "Figma",
    description: "Primary UI/UX tool for wireframes, prototypes, and design systems.",
    icon: FigmaIcon,
    url: "https://www.figma.com",
  },
  {
    name: "Adobe Photoshop",
    description: "Asset editing, photo manipulation, and graphics prep for web.",
    icon: Palette,
    url: "https://www.adobe.com/products/photoshop.html",
  },
  {
    name: "Adobe Illustrator",
    description: "Vector logos, icons, and scalable illustrations for interfaces.",
    icon: Palette,
    url: "https://www.adobe.com/products/illustrator.html",
  },
]

const devTools = [
  {
    name: "Visual Studio Code",
    description: "Editor of choice—fast, extensible, and great TypeScript support.",
    icon: Code,
    url: "https://code.visualstudio.com/",
  },
  {
    name: "Arc Browser",
    description: "Daily driver for browsing and web dev tasks.",
    icon: Globe,
  },
  {
    name: "React",
    description: "Component-driven UI library I use across projects.",
    icon: Atom,
    url: "https://react.dev/",
  },
  {
    name: "Next.js",
    description: "Full-stack React framework for routing, data fetching, and deployment.",
    icon: Code,
    url: "https://nextjs.org/",
  },
  {
    name: "Three.js",
    description: "3D scenes and visual effects in the browser.",
    icon: Box,
    url: "https://threejs.org/",
  },
  {
    name: "GSAP",
    description: "High-performance animation for polished motion and transitions.",
    icon: Sparkles,
    url: "https://gsap.com/",
  },
  {
    name: "Framer Motion",
    description: "Declarative animations and gestures for React UIs.",
    icon: Sparkles,
    url: "https://www.framer.com/motion/",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling for fast, consistent interfaces.",
    icon: Palette,
    url: "https://tailwindcss.com/",
  },
  {
    name: "Material-UI",
    description: "Production-ready React components when I need speed and consistency.",
    icon: BookOpen,
    url: "https://mui.com/",
  },
  {
    name: "Storybook",
    description: "Build and test UI components in isolation.",
    icon: BookOpen,
    url: "https://storybook.js.org/",
  },
  {
    name: "Node.js",
    description: "Backend runtime powering APIs and server logic.",
    icon: Server,
    url: "https://nodejs.org/",
  },
  {
    name: "REST APIs",
    description: "Standard interface for services and integrations.",
    icon: Server,
  },
  {
    name: "Supabase",
    description: "Auth, storage, and Postgres backend for rapid builds.",
    icon: Database,
    url: "https://supabase.com/",
  },
  {
    name: "PostgreSQL",
    description: "Relational database for reliability and strong SQL features.",
    icon: Database,
    url: "https://www.postgresql.org/",
  },
]

const aiTools = [
  {
    name: "OpenAI API",
    description: "LLM features for chat, generation, and tooling.",
    icon: Cpu,
    url: "https://platform.openai.com/",
  },
  {
    name: "Google Gemini",
    description: "Multimodal models for text, image, and code tasks.",
    icon: Cpu,
    url: "https://ai.google/",
  },
  {
    name: "Anthropic Claude",
    description: "Reasoning-focused model for safer, reliable outputs.",
    icon: Cpu,
    url: "https://www.anthropic.com/",
  },
  {
    name: "ElevenLabs",
    description: "High-quality text-to-speech for product voice features.",
    icon: Cpu,
    url: "https://elevenlabs.io/",
  },
  {
    name: "Serper API",
    description: "Search integration for retrieval-augmented features.",
    icon: Search,
    url: "https://serper.dev/",
  },
]

const platformTools = [
  {
    name: "Docker",
    description: "Containerization for consistent dev and deploy workflows.",
    icon: Terminal,
    url: "https://www.docker.com/",
  },
  {
    name: "Vercel",
    description: "Zero-config deploys for Next.js and edge-ready apps.",
    icon: Cloud,
    url: "https://vercel.com/",
  },
]

export const Uses = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const collectByCategory = () => {
    if (activeCategory === "all")
      return [...designTools, ...devTools, ...aiTools, ...platformTools]
    if (activeCategory === "design") return designTools
    if (activeCategory === "development") return devTools
    if (activeCategory === "ai") return aiTools
    if (activeCategory === "platforms") return platformTools
    return []
  }

  const filteredTools = () => {
    const tools = collectByCategory()
    if (!searchQuery) return tools
    const q = searchQuery.toLowerCase()
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
    )
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }

  return (
    <>
      <Fragment>
        <Meta title="Uses" description="The tools, platforms, and technologies I use to design and build software." />
        <div className={styles.uses}>
          <header className={styles.header}>
            <h1 className={styles.title}>Tools & Technologies</h1>
            <p className={styles.description}>
              A curated list of what I use day-to-day across design, development, AI, and deployment.
            </p>

            <div className={styles.searchAndCategories}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInputWrapper}>
                  <Search className={styles.searchIcon} size={16} />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className={styles.searchClear} onClick={() => setSearchQuery("")}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.categories}>
                <button
                  className={styles.category}
                  data-active={activeCategory === "all"}
                  onClick={() => handleCategoryClick("all")}
                >
                  <Layers className={styles.categoryIcon} size={16} />
                  <span>All</span>
                </button>
                <button
                  className={styles.category}
                  data-active={activeCategory === "design"}
                  onClick={() => handleCategoryClick("design")}
                >
                  <Palette className={styles.categoryIcon} size={16} />
                  <span>Design</span>
                </button>
                <button
                  className={styles.category}
                  data-active={activeCategory === "development"}
                  onClick={() => handleCategoryClick("development")}
                >
                  <Code className={styles.categoryIcon} size={16} />
                  <span>Development</span>
                </button>
                <button
                  className={styles.category}
                  data-active={activeCategory === "ai"}
                  onClick={() => handleCategoryClick("ai")}
                >
                  <Cpu className={styles.categoryIcon} size={16} />
                  <span>AI & Integrations</span>
                </button>
                <button
                  className={styles.category}
                  data-active={activeCategory === "platforms"}
                  onClick={() => handleCategoryClick("platforms")}
                >
                  <Cloud className={styles.categoryIcon} size={16} />
                  <span>Platforms</span>
                </button>
              </div>
            </div>
          </header>

          <main>
            {filteredTools().length > 0 ? (
              <>
                {activeCategory !== "all" && (
                  <h2 className={styles.sectionTitle}>
                    {activeCategory === "design" && "Design Tools"}
                    {activeCategory === "development" && "Development Tools"}
                    {activeCategory === "ai" && "AI & Integrations"}
                    {activeCategory === "platforms" && "Platforms"}
                  </h2>
                )}
                <div className={styles.grid}>
                  {filteredTools().map((tool, index) => (
                    <article className={styles.card} key={`${tool.name}-${index}`}>
                      <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                          <div className={styles.cardIconWrap}>
                            <tool.icon size={20} />
                          </div>
                          <h3 className={styles.cardTitle}>{tool.name}</h3>
                        </div>
                        <p className={styles.cardDescription}>{tool.description}</p>
                        {tool.url && (
                          <a href={tool.url} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
                            <span>Learn more</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.noResults}>
                <Search size={40} className={styles.noResultsIcon} />
                <h3>No tools found</h3>
                <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </main>
        </div>
      </Fragment>
      <Footer />
    </>
  )
}
