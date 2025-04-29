"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heading } from "components/Heading"
import { Text } from "components/Text"
import { Section } from "components/Section"
import { DecoderText } from "components/DecoderText"
import { Button } from "components/Button"
import { Palette, Layers, Wand2, Shapes, PenTool, Figma, Code, Sparkles } from "lucide-react"
import { useIntersectionObserver } from "hooks/use-intersection-observer"
import styles from "./Visuals.module.css"

// Design categories with icons and descriptions
const designCategories = [
    {
        id: 1,
        title: "UI Design",
        icon: <Layers size={32} />,
        description:
            "Creating intuitive interfaces with clean layouts, thoughtful interactions, and accessible design patterns.",
        skills: ["Wireframing", "Prototyping", "Design Systems", "Responsive Design"],
        color: "#5686f5",
    },
    {
        id: 2,
        title: "Visual Design",
        icon: <Palette size={32} />,
        description:
            "Crafting visually appealing designs with attention to typography, color theory, and visual hierarchy.",
        skills: ["Typography", "Color Theory", "Composition", "Iconography"],
        color: "#e667b1",
    },
    {
        id: 3,
        title: "Motion Design",
        icon: <Wand2 size={32} />,
        description:
            "Bringing designs to life with meaningful animations and smooth transitions that enhance user experience.",
        skills: ["Animation", "Transitions", "Micro-interactions", "Storyboarding"],
        color: "#f59e0b",
    },
    {
        id: 4,
        title: "Brand Design",
        icon: <Shapes size={32} />,
        description: "Developing cohesive brand identities that communicate values and create memorable impressions.",
        skills: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Materials"],
        color: "#10b981",
    },
    {
        id: 5,
        title: "Illustration",
        icon: <PenTool size={32} />,
        description: "Creating custom illustrations and graphics that enhance storytelling and visual communication.",
        skills: ["Digital Illustration", "Icon Design", "Character Design", "Infographics"],
        color: "#8b5cf6",
    },
    {
        id: 6,
        title: "Design Tools",
        icon: <Figma size={32} />,
        description: "Proficient in industry-standard design tools for creating and collaborating on digital designs.",
        skills: ["Figma", "Adobe Creative Suite", "Sketch", "Framer"],
        color: "#ec4899",
    },
]

// Design process steps
const designProcess = [
    {
        id: 1,
        title: "Research",
        description: "Understanding user needs, market trends, and project requirements to inform design decisions.",
        icon: <Code size={24} />,
    },
    {
        id: 2,
        title: "Ideation",
        description: "Exploring multiple concepts and approaches to find innovative solutions to design challenges.",
        icon: <Sparkles size={24} />,
    },
    {
        id: 3,
        title: "Design",
        description: "Creating high-fidelity designs with attention to detail, usability, and visual appeal.",
        icon: <PenTool size={24} />,
    },
    {
        id: 4,
        title: "Iteration",
        description: "Refining designs based on feedback, testing, and continuous improvement principles.",
        icon: <Layers size={24} />,
    },
]

// DesignCard component for showcasing design categories
const DesignCard = ({ category, index }) => {
    const [isVisible, cardRef] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: "-50px 0px",
    })

    return (
        <motion.div
            className={styles.designCard}
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
            style={{
                borderColor: category.color,
                backgroundColor: `${category.color}10`,
            }}
        >
            <div className={styles.cardIcon} style={{ color: category.color }}>
                {category.icon}
            </div>
            <h3 className={styles.cardTitle}>{category.title}</h3>
            <p className={styles.cardDescription}>{category.description}</p>

            <div className={styles.cardSkills}>
                <div className={styles.skillsGrid}>
                    {category.skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            className={styles.skillTag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                            style={{ backgroundColor: `${category.color}20`, color: category.color }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

// ProcessStep component for showcasing design process
const ProcessStep = ({ step, index }) => {
    const [isVisible, stepRef] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: "-50px 0px",
    })

    return (
        <motion.div
            className={styles.processStep}
            ref={stepRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)" }}
        >
            <div className={styles.processNumber}>{index + 1}</div>
            <div className={styles.processContent}>
                <div className={styles.processIcon}>{step.icon}</div>
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDescription}>{step.description}</p>
            </div>
        </motion.div>
    )
}

export const Visuals = ({ id }) => {
    const [isHeaderVisible, headerRef] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: "-50px 0px",
    })

    const [isCategoriesVisible, categoriesRef] = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: "-50px 0px",
    })

    const [isProcessVisible, processRef] = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: "-50px 0px",
    })

    const [isCtaVisible, ctaRef] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: "-50px 0px",
    })

    const titleId = `${id}-title`
    const parallaxRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    return (
        <Section className={styles.visualsSection} as="section" id={id} aria-labelledby={titleId} tabIndex={-1}>
            <div className={styles.sectionBackground}>
                <motion.div className={styles.backgroundGradient} style={{ y }} ref={parallaxRef} />
            </div>

            <div className={styles.sectionContent}>
                <motion.div
                    className={styles.sectionHeader}
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                >
                    <Heading className={styles.title} level={2} id={titleId}>
                        <DecoderText text="Visual Design" start={isHeaderVisible} delay={300} />
                    </Heading>

                    <div className={styles.introduction}>
                        <Text className={styles.introText} size="l" as="p">
                            My approach to visual design combines aesthetic sensibility with strategic thinking. I create designs that
                            not only look beautiful but also solve problems and enhance user experiences.
                        </Text>
                    </div>
                </motion.div>

                <div className={styles.designCategories} ref={categoriesRef}>
                    <motion.h3
                        className={styles.sectionSubheading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isCategoriesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Design Expertise
                    </motion.h3>

                    <div className={styles.categoriesGrid}>
                        {designCategories.map((category, index) => (
                            <DesignCard key={category.id} category={category} index={index} />
                        ))}
                    </div>
                </div>

                <div className={styles.designProcess} ref={processRef}>
                    <motion.h3
                        className={styles.sectionSubheading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isProcessVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Design Process
                    </motion.h3>

                    <div className={styles.processSteps}>
                        {designProcess.map((step, index) => (
                            <ProcessStep key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>

                <motion.div
                    className={styles.ctaContainer}
                    ref={ctaRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isCtaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Text className={styles.ctaText} as="p">
                        Interested in working together on a design project?
                    </Text>
                    <Button className={styles.ctaButton} href="/contact" icon="send">
                        Get in touch
                    </Button>
                </motion.div>
            </div>
        </Section>
    )
}
