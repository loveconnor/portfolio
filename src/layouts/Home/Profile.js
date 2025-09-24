"use client"

import { useState, useRef, Fragment } from "react"
import { motion } from "framer-motion"
import { Send, ChevronRight, Code, Server, Database, Globe, Layers, Terminal, Cpu } from "lucide-react"
import { Button } from "components/Button"
import { Image } from "components/Image"
import { Section } from "components/Section"
import { Text } from "components/Text"
import { Transition } from "components/Transition"
import { useIntersectionObserver } from "hooks/use-intersection-observer"
import { media } from "utils/style"
import profileImgLarge from "assets/connor.jpg"
import profileImgPlaceholder from "assets/profile-placeholder.jpg"
import profileImg from "assets/connor.png"
import styles from "./Profile.module.css"

const ProfileText = ({ visible }) => {
  const MAX_TAGS_PER_CARD = 3
  const [expanded, setExpanded] = useState({})

  const skills = [
    {
      name: "Frontend Development",
      icon: <Code size={18} />,
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Three.js",
        "GSAP",
        "Framer Motion",
        "Tailwind CSS",
        "Material-UI",
        "HTML/CSS",
      ],
    },
    {
      name: "Backend Development",
      icon: <Server size={18} />,
      tags: ["Node.js", "Supabase", "REST APIs", "Python", "Java", "C++"],
    },
    {
      name: "Database Management",
      icon: <Database size={18} />,
      tags: ["PostgreSQL", "SQL"],
    },
    {
      name: "Web & UI Design",
      icon: <Globe size={18} />,
      tags: ["Responsive Design", "Accessibility", "Figma", "Prototyping"],
    },
    {
      name: "Creative Tools",
      icon: <Layers size={18} />,
      tags: ["Photoshop", "Illustrator", "Design Systems", "Wireframing"],
    },
    {
      name: "DevOps & Deployment",
      icon: <Terminal size={18} />,
      tags: ["Git", "GitHub", "Docker", "Vercel", "CI/CD"],
    },
    {
      name: "AI & Integrations",
      icon: <Cpu size={18} />, // you can swap this for an icon you prefer
      tags: ["OpenAI API", "Google Gemini", "Claude", "ElevenLabs", "Serper API"],
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
    },
  }

  return (
    <Fragment>
      <motion.div
        className={styles.greeting}
        variants={itemVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
      >
        <span>Hello, I&apos;m</span>
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span
          className={styles.firstName}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Connor
        </motion.span>
        <motion.span
          className={styles.lastName}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Love
        </motion.span>
      </motion.h1>

      <motion.div
        className={styles.role}
        variants={itemVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
      >
        <span>Computer Science Student & Web Developer</span>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        className={styles.descriptionContainer}
      >
        <motion.div variants={itemVariants}>
          <Text className={styles.description} as="p">
            Hi! I&apos;m Connor Love, a Computer Science and Engineering student at The Ohio State University with prior
            coursework and research experience at Kent State University. With a 4.0 GPA and a strong foundation in both design
            and development, I enjoy exploring new ideas and turning them into real projects from the ground up.
          </Text>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text className={styles.description} as="p">
            What excites me most about technology is the blend of problem-solving and creativity. Whether I&apos;m building an
            AI-powered platform, designing intuitive interfaces, or coding applications, I love the process of bringing
            something from an initial idea into a working, impactful solution. For me, design and development are more than
            skills, they&apos;re ways to innovate, express creativity, and create meaningful experiences.
          </Text>
        </motion.div>

      </motion.div>

      <div className={styles.skillsContainer}>
        <motion.h3
          className={styles.skillsTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          Technical Skills
        </motion.h3>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.skillCard}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              <div className={styles.skillCardHeader}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <div className={styles.skillNameContainer}>
                  <div className={styles.skillName}>{skill.name}</div>
                </div>
              </div>
              {skill.tags && skill.tags.length > 0 && (
                <div className={styles.skillTags}>
                  {(expanded[skill.name] ? skill.tags : skill.tags.slice(0, MAX_TAGS_PER_CARD)).map((tag) => (
                    <span key={tag} className={styles.skillTag}>{tag}</span>
                  ))}
                  {skill.tags.length > MAX_TAGS_PER_CARD && !expanded[skill.name] && (
                    <button
                      type="button"
                      className={styles.skillTagMore}
                      title={skill.tags.join(", ")}
                      aria-expanded={!!expanded[skill.name]}
                      onClick={() => setExpanded((prev) => ({ ...prev, [skill.name]: true }))}
                    >
                      +{skill.tags.length - MAX_TAGS_PER_CARD}
                    </button>
                  )}
                  {expanded[skill.name] && (
                    <button
                      type="button"
                      className={styles.skillTagToggle}
                      aria-label={`Show fewer ${skill.name} tags`}
                      onClick={() => setExpanded((prev) => ({ ...prev, [skill.name]: false }))}
                    >
                      Show less
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button className={styles.button} href="/contact">
            <Send className="mr-2 h-4 w-4" />
            <span>Contact Me</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button className={styles.button} href="/uses">
            <span>Tools I Use</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </Fragment>
  )
}

export const Profile = ({ id }) => {
  const [isIntersecting, sectionRef] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "-100px 0px",
  })
  const [focused, setFocused] = useState(false)
  const titleId = `${id}-title`
  const imageRef = useRef(null)

  // Combine intersection and focus states
  const isVisible = isIntersecting || focused

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={isVisible} timeout={0}>
        {(visible) => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
            </div>
            <motion.div
              className={styles.column}
              ref={imageRef}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className={styles.imageWrapper}>
                <motion.div
                  className={styles.image}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(var(--rgbText) / 0.15)" }}
                >
                  <Image
                    reveal
                    delay={100}
                    placeholder={profileImgPlaceholder}
                    srcSet={[profileImg, profileImgLarge]}
                    sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                    alt="Me at Homecoming"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </Transition>
    </Section>
  )
}
