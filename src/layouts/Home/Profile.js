"use client"

import { useState, useRef, useEffect, Fragment } from "react"
import { motion } from "framer-motion"
import { Send, ChevronRight } from "lucide-react"
import { Button } from "components/Button"
import { DecoderText } from "components/DecoderText"
import { Heading } from "components/Heading"
import { Image } from "components/Image"
import { Section } from "components/Section"
import { Text } from "components/Text"
import { Transition } from "components/Transition"
import { Link } from "components/Link"
import { useIntersectionObserver } from "hooks/use-intersection-observer"
import { media } from "utils/style"
import profileImgLarge from "assets/connor.jpeg"
import profileImgPlaceholder from "assets/profile-placeholder.jpg"
import profileImg from "assets/connor.jpeg"
import styles from "./Profile.module.css"

const ProfileText = ({ visible, titleId }) => {
  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "Three.js", level: 75 },
    { name: "Python", level: 70 },
    { name: "Java", level: 65 },
    { name: "PHP", level: 60 },
    { name: "SQL", level: 75 },
  ]

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
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
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
        <span className={styles.greetingText}>Hello, I&apos;m</span>
      </motion.div>

      <Heading className={styles.title} data-visible={visible} level={1} id={titleId}>
        <DecoderText text="Connor Love" start={visible} delay={500} />
      </Heading>

      <motion.div
        className={styles.role}
        variants={itemVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{ delay: 0.4 }}
      >
        <span className={styles.roleText}>Computer Science Student & Web Developer</span>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        className={styles.descriptionContainer}
      >
        <motion.div variants={itemVariants}>
          <Text className={styles.description} as="p">
            Hi! I&apos;m a first-year Computer Science student at Kent State University with a 4.0 GPA, passionate about
            technology and creativity. I&apos;m from Medina, Ohio, and have been honing my skills in web development and
            graphic design for years. I&apos;m also a freelance web developer, eager to take on exciting projects.
          </Text>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text className={styles.description} as="p">
            The best part about what I do is the mix of problem-solving and creative expression. I love bringing ideas
            to life, whether it&apos;s through building websites, coding apps, or creating impactful designs.
          </Text>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Text className={styles.description} as="p">
            Feel free to explore the tools and software I use on the <Link href="/uses">Uses page</Link>, and let&apos;s
            connect if you&apos;re interested in collaborations, freelance opportunities, or just want to chat about
            tech and design!
          </Text>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.skillsContainer}
        variants={itemVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{ delay: 0.5 }}
      >
        <h3 className={styles.skillsTitle}>Technical Skills</h3>
        <div className={styles.skillBars}>
          {skills.map((skill, index) => (
            <div key={skill.name} className={styles.skillBar}>
              <div className={styles.skillInfo}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercentage}>{skill.level}%</span>
              </div>
              <div className={styles.skillProgress}>
                <motion.div
                  className={styles.skillProgressBar}
                  initial={{ width: 0 }}
                  animate={visible ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.6 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button className={styles.button} href="/contact">
                    <Send className="mr-2 h-4 w-4" />
                    <span>Contact Me</span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button className={styles.button} href="/uses">
                    <span>Tools I Use</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className={styles.column}
              ref={imageRef}
              style={{
                y: scrollY * 0.05,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: scrollY * 0.05 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className={styles.imageWrapper}>
                <motion.div
                  className={styles.imageBackground}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                ></motion.div>
                <motion.div
                  className={styles.image}
                  whileHover={{ y: -8, boxShadow: "0 30px 80px rgba(var(--rgbText) / 0.2)" }}
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
