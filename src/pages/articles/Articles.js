"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import RouterLink from "next/link"
import { Button } from "components/Button"
import { Footer } from "components/Footer"
import { Heading } from "components/Heading"
import { Image } from "components/Image"
import { Meta } from "components/Meta"
import { Section } from "components/Section"
import { Text } from "components/Text"
import { useWindowSize } from "hooks"
import { formatDate } from "utils/date"
import { useIntersectionObserver } from "hooks/use-intersection-observer"
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import styles from "./Articles.module.css"

// Modern text animation component
const AnimatedText = ({ text, visible, delay = 0 }) => {
  // Split text into words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block", marginRight: "0.4em" }}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const ArticlesPost = ({ slug, title, abstract, date, featured, banner, timecode, index }) => {
  const [hovered, setHovered] = useState(false)
  const [dateTime, setDateTime] = useState(null)
  const [isVisible, cardRef] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px 0px",
  })

  useEffect(() => {
    setDateTime(formatDate(date))
  }, [date])

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      },
    },
  }

  return (
    <motion.article
      ref={cardRef}
      className={styles.post}
      data-featured={!!featured}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      <RouterLink href={`/articles/${slug}`} scroll={false}>
        <a className={styles.postLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={styles.postImageWrapper}>
            {!!banner && (
              <div className={styles.postImage}>
                <Image
                  noPauseButton
                  play={hovered}
                  src={{ src: banner || "/placeholder.svg" }}
                  placeholder={{ src: `${banner.split(".")[0]}-placeholder.jpg` }}
                  alt=""
                  role="presentation"
                />
                {featured && (
                  <div className={styles.featuredBadge}>
                    <TrendingUp size={14} />
                    <span>Featured</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.postContent}>
            <div className={styles.postMeta}>
              <div className={styles.postDate}>
                <Calendar size={14} />
                <span>{dateTime}</span>
              </div>
              <div className={styles.postReadTime}>
                <Clock size={14} />
                <span>{timecode}</span>
              </div>
            </div>
            <Heading as="h2" level={featured ? 3 : 4} className={styles.postTitle}>
              {title}
            </Heading>
            <Text size={featured ? "m" : "s"} as="p" className={styles.postAbstract}>
              {abstract}
            </Text>
            <div className={styles.postFooter}>
              <Button secondary iconHoverShift icon="chevronRight" className={styles.readButton}>
                Read article
                <ArrowRight size={16} className={styles.readIcon} />
              </Button>
            </div>
          </div>
        </a>
      </RouterLink>
    </motion.article>
  )
}

const SkeletonPost = ({ index }) => {
  return (
    <motion.article
      aria-hidden="true"
      className={`${styles.post} ${styles.skeleton}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
    >
      <div className={styles.postLink}>
        <div className={styles.postImageWrapper}>
          <div className={`${styles.postImage} ${styles.skeletonImage}`}></div>
        </div>
        <div className={styles.postContent}>
          <div className={styles.postMeta}>
            <div className={`${styles.postDate} ${styles.skeletonText}`}></div>
            <div className={`${styles.postReadTime} ${styles.skeletonText}`}></div>
          </div>
          <div className={`${styles.skeletonTitle} ${styles.skeletonBone}`}></div>
          <div className={`${styles.skeletonAbstract} ${styles.skeletonBone}`}></div>
          <div className={styles.postFooter}>
            <div className={`${styles.skeletonButton} ${styles.skeletonBone}`}></div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export const Articles = ({ posts, featured }) => {
  const { width } = useWindowSize()
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.97])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  const [isHeaderVisible, headerIntersectRef] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-50px 0px",
  })

  // Add this near the top of the Articles component, with the other state declarations
  const [activeFilter, setActiveFilter] = useState("latest")

  // Combine all posts with featured at the top
  const allPosts = featured ? [featured, ...posts.filter((post) => post.slug !== featured.slug)] : posts

  // Add this after the allPosts declaration
  const filteredPosts =
    activeFilter === "latest" ? allPosts : [...allPosts].sort((a, b) => (b.views || 0) - (a.views || 0))

  return (
    <article className={styles.articles}>
      <Meta
        title="Articles"
        description="A collection of technical design and development articles. May contain incoherent ramblings."
      />

      <motion.div className={styles.heroSection} ref={headerIntersectRef} style={{ opacity, scale, y }}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroText}
          >
            <Heading level={1} as="h1" className={styles.heroTitle}>
              <AnimatedText text="Articles & Insights" visible={isHeaderVisible} delay={0.3} />
            </Heading>
            <Text size="l" as="p" className={styles.heroSubtitle}>
              <AnimatedText text="Thoughts on design, development, and the digital landscape" visible={isHeaderVisible} delay={0.5} />
            </Text>
          </motion.div>

          <motion.div
            className={styles.heroStats}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className={styles.statItem}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={styles.statNumber}>{allPosts.length}</div>
              <div className={styles.statLabel}>ARTICLES</div>
            </motion.div>
            <motion.div
              className={styles.statItem}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={styles.statNumber}>
                {/* Calculate total read time */}
                {allPosts.reduce((total, post) => total + (Number.parseInt(post.timecode?.split(" ")[0]) || 5), 0) || 5}
              </div>
              <div className={styles.statLabel}>READ TIME</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <Section className={styles.content}>
        <motion.div
          className={styles.articlesHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Heading level={4} as="h2" className={styles.sectionTitle}>
            All Articles
          </Heading>
          <div className={styles.articlesFilter}>
            <Button
              secondary
              small
              className={`${styles.filterButton} ${activeFilter === "latest" ? styles.activeFilter : ""}`}
              onClick={() => setActiveFilter("latest")}
            >
              Latest
            </Button>
            <Button
              secondary
              small
              className={`${styles.filterButton} ${activeFilter === "popular" ? styles.activeFilter : ""}`}
              onClick={() => setActiveFilter("popular")}
            >
              Popular
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.grid}
          >
            {filteredPosts.map((post, index) => (
              <ArticlesPost key={post.slug} slug={post.slug} index={index} {...post} />
            ))}
            {filteredPosts.length < 5 &&
              Array(2)
                .fill()
                .map((_, index) => <SkeletonPost key={`skeleton-${index}`} index={index} />)}
          </motion.div>
        </AnimatePresence>
      </Section>
      <Footer />
    </article>
  )
}
