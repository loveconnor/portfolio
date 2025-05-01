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
  Figma,
  Film,
  Layers,
  X,
} from "lucide-react"

const designTools = [
  {
    name: "Figma",
    description: "My primary tool for UI design. Made the switch from Sketch in 2020 and haven't looked back.",
    icon: Figma,
    url: "https://www.figma.com",
  },
  {
    name: "Adobe After Effects",
    description: "For motion graphics creation. Haven't found a non-Adobe product that's as good yet.",
    icon: Film,
  },
  {
    name: "Blender",
    description: "For 3D models. Since 2.8 it's become way simpler to use and often better than expensive paid tools.",
    icon: Box,
    url: "https://www.blender.org/",
  },
]

const devTools = [
  {
    name: "Visual Studio Code",
    description: "My text editor with One Dark Pro theme and Operator Mono typeface.",
    icon: Code,
    url: "https://code.visualstudio.com/",
  },
  {
    name: "Arc Browser",
    description: "My main browser for both development and general use.",
    icon: Globe,
  },
  {
    name: "React",
    description:
      "My front end Javascript library of choice. The component-centric mental model is the first thing that truly made sense to me as a designer.",
    icon: Atom,
    url: "https://reactjs.org/",
  },
  {
    name: "Three.js",
    description:
      "For 3D effects and image shaders. It has a bit of a learning curve but you can do some really powerful stuff with it.",
    icon: Box,
    url: "https://threejs.org/",
  },
  {
    name: "PostCSS",
    description:
      "For CSS, I've used many pre-processors and css-in-js solutions, but these days I'm using vanilla CSS with PostCSS to get upcoming CSS features today.",
    icon: Palette,
    url: "https://postcss.org/",
  },
  {
    name: "Framer Motion",
    description: "For Javascript animations. It's a great way to add spring animations to React and three.js.",
    icon: Sparkles,
    url: "https://www.framer.com/motion/",
  },
  {
    name: "Storybook",
    description: "For building and testing UI components in isolation.",
    icon: BookOpen,
    url: "https://storybook.js.org/",
  },
]

export const Uses = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = () => {
    let tools = []

    if (activeCategory === "all") tools = [...designTools, ...devTools]
    else if (activeCategory === "design") tools = designTools
    else if (activeCategory === "development") tools = devTools

    if (searchQuery) {
      return tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return tools
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }

  return (
    <>
      <Fragment>
        <Meta title="Uses" description="A list of hardware and software I use to do my thing" />
        <div className={styles.uses}>
          <header className={styles.header}>
            <h1 className={styles.title}>Tools & Technologies</h1>
            <p className={styles.description}>
              A curated collection of the tools, applications, and technologies I use daily to design and develop
              exceptional digital experiences.
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
                  <span>All Tools</span>
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
              </div>
            </div>
          </header>

          <main>
            {filteredTools().length > 0 ? (
              <>
                {activeCategory === "design" && <h2 className={styles.sectionTitle}>Design Tools</h2>}
                {activeCategory === "development" && <h2 className={styles.sectionTitle}>Development Tools</h2>}
                <div className={styles.grid}>
                  {filteredTools().map((tool, index) => (
                    <article className={styles.card} key={index}>
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
