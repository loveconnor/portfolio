"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github } from 'lucide-react'
import { Button } from "components/Button"
import { Heading } from "components/Heading"
import { deviceModels } from "components/Model/deviceModels"
import { Section } from "components/Section"
import { Text } from "components/Text"
import { Transition } from "components/Transition"
import { useWindowSize } from "hooks"
import dynamic from "next/dynamic"
import { media } from "utils/style"
import { useIntersectionObserver } from "hooks/use-intersection-observer"
import styles from "./ProjectSummary.module.css"

const Model = dynamic(() => import("components/Model").then((mod) => mod.Model))

export const ProjectSummary = ({
  id,
  index,
  title,
  description,
  model,
  technologies = [],
  buttonText,
  buttonLink,
  githubLink,
  alternate,
  ...rest
}) => {
  const [isIntersecting, sectionRef] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-100px 0px",
  })
  const [focused, setFocused] = useState(false)
  const { width } = useWindowSize()
  const titleId = `${id}-title`
  const isMobile = width <= media.tablet
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`
  const [hovered, setHovered] = useState(false)
  const parallaxRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  // Combine intersection and focus states
  const isVisible = isIntersecting || focused

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
    }
  }

  const renderDetails = (visible) => (
    <motion.div
      className={styles.details}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={containerVariants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      <motion.div className={styles.index} variants={itemVariants}>
        <span className={styles.indexNumber}>
          {index < 10 ? `0${index}` : index}
        </span>
        <motion.div
          className={styles.indexLine}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        ></motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Heading level={3} as="h2" className={styles.title} id={titleId}>
          {title}
        </Heading>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Text className={styles.description} as="p">
          {description}
        </Text>
      </motion.div>

      {technologies.length > 0 && (
        <motion.div
          className={styles.technologies}
          variants={containerVariants}
        >
          {technologies.map((tech, i) => (
            <motion.span
              key={tech}
              className={styles.technology}
              variants={itemVariants}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{
                y: -5,
                scale: 1.05,
                backgroundColor: "rgba(var(--rgbAccent), 0.2)"
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      )}

      <motion.div
        className={styles.actions}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
          <Button className={styles.button} href={buttonLink}>
            <span>{buttonText}</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {githubLink && (
          <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
            <Button variant="outline" className={styles.button} href={githubLink}>
              <Github className="mr-2 h-4 w-4" />
              <span>View Code</span>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )

  const renderPreview = (visible) => (
    <motion.div
      className={styles.preview}
      ref={parallaxRef}
      style={{ y }}
      data-hovered={hovered}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={styles.previewBackground}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{
          scale: 1.1,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
        }}
      ></motion.div>

      {model.type === "laptop" && (
        <motion.div
          className={styles.model}
          data-device="laptop"
          whileHover={{ y: -8, scale: 1.01 }}
        >
          <Model
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
            showDelay={700}
            show={visible}
            models={[
              {
                ...deviceModels.laptop,
                texture: {
                  ...model.textures[0],
                  sizes: laptopSizes,
                },
              },
            ]}
          />
        </motion.div>
      )}
      {model.type === "phone" && (
        <motion.div
          className={styles.model}
          data-device="phone"
          whileHover={{ y: -8, scale: 1.01 }}
        >
          <Model
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 11.5 }}
            showDelay={300}
            show={visible}
            models={[
              {
                ...deviceModels.phone,
                position: { x: -0.6, y: 1.1, z: 0 },
                texture: {
                  ...model.textures[0],
                  sizes: phoneSizes,
                },
              },
              {
                ...deviceModels.phone,
                position: { x: 0.6, y: -0.5, z: 0.3 },
                texture: {
                  ...model.textures[1],
                  sizes: phoneSizes,
                },
              },
            ]}
          />
        </motion.div>
      )}
    </motion.div>
  )

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={isVisible} timeout={0}>
          {(visible) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  )
}
