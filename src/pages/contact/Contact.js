"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import {
    Send,
    CheckCircle,
    Loader2,
    ArrowRight,
    Briefcase,
    Mail,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    User,
    MessageSquare,
    AlertCircle,
} from "lucide-react"
import { Meta } from "components/Meta"
import { Section } from "components/Section"
import { Heading } from "components/Heading"
import { Text } from "components/Text"
import { DecoderText } from "components/DecoderText"
import { Button } from "components/Button"
import { Footer } from "components/Footer"
import { useIntersectionObserver } from "hooks/use-intersection-observer"
import { useRouter } from "next/router"
import styles from "./Contact.module.css"

export const Contact = () => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const [isHeaderVisible, headerRef] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: "-50px 0px",
    })
    const [isProjectSectionVisible, projectSectionRef] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: "-50px 0px",
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const response = await fetch("project-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Failed to send message")
            }

            // Reset form and show success message
            reset()
            setIsSubmitted(true)
        } catch (error) {
            console.error("Error submitting form:", error)
            setSubmitError(error.message || "Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleReset = () => {
        setIsSubmitted(false)
        setSubmitError(null)
        reset()
    }

    const handleStartProject = () => {
        router.push("/project-inquiry")
    }

    return (
        <Section className={styles.contactSection}>
            <Meta
                title="Contact | Connor Love"
                description="Get in touch with Connor Love for web development and design projects."
            />

            <div className={styles.contactContainer}>
                <motion.div
                    className={styles.contactHeader}
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                >
                    <Heading level={1} as="h1" className={styles.title}>
                        <DecoderText text="Get in Touch" start={isHeaderVisible} delay={300} />
                    </Heading>
                    <Text size="l" as="p" className={styles.subtitle}>
                        Have a question or just want to say hello? I&apos;d love to hear from you.
                    </Text>
                </motion.div>

                <div className={styles.contentLayout}>
                    <div className={styles.formWrapper}>
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    className={styles.successContainer}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className={styles.successIcon}>
                                        <CheckCircle size={64} />
                                    </div>
                                    <Heading level={2} as="h2" className={styles.successTitle}>
                                        Message Sent Successfully
                                    </Heading>
                                    <Text size="m" as="p" className={styles.successText}>
                                        Thank you for reaching out! I&apos;ll get back to you as soon as possible.
                                    </Text>
                                    <Button className={styles.resetButton} onClick={handleReset} icon="arrowLeft">
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    className={styles.contactForm}
                                    onSubmit={handleSubmit(onSubmit)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className={styles.formHeader}>
                                        <h3 className={styles.formTitle}>Send a Message</h3>
                                        <p className={styles.formSubtitle}>I&apos;ll respond within 24-48 hours</p>
                                    </div>

                                    {submitError && (
                                        <div className={styles.errorMessage}>
                                            <AlertCircle size={18} />
                                            <span>{submitError}</span>
                                        </div>
                                    )}

                                    <div className={styles.formGrid}>
                                        <div className={styles.formField}>
                                            <label htmlFor="name" className={styles.formLabel}>
                                                <User size={16} className={styles.labelIcon} />
                                                <span>Name</span>
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                className={styles.formInput}
                                                placeholder="Your name"
                                                {...register("name", {
                                                    required: "Name is required",
                                                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                                                })}
                                            />
                                            {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
                                        </div>

                                        <div className={styles.formField}>
                                            <label htmlFor="email" className={styles.formLabel}>
                                                <Mail size={16} className={styles.labelIcon} />
                                                <span>Email</span>
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className={styles.formInput}
                                                placeholder="your.email@example.com"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Please enter a valid email address",
                                                    },
                                                })}
                                            />
                                            {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
                                        </div>

                                        <div className={`${styles.formField} ${styles.fullWidth}`}>
                                            <label htmlFor="message" className={styles.formLabel}>
                                                <MessageSquare size={16} className={styles.labelIcon} />
                                                <span>Message</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                className={styles.formTextarea}
                                                placeholder="Your message here..."
                                                rows={4}
                                                {...register("message", {
                                                    required: "Message is required",
                                                    minLength: { value: 10, message: "Message must be at least 10 characters" },
                                                })}
                                            ></textarea>
                                            {errors.message && <p className={styles.formError}>{errors.message.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className={styles.spinnerIcon} size={18} />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className={styles.contactInfo}>
                            <div className={styles.contactInfoItem}>
                                <Mail size={20} className={styles.contactInfoIcon} />
                                <h3 className={styles.contactInfoTitle}>Email</h3>
                                <a href="mailto:hello@connorlove.com" className={styles.contactInfoLink}>
                                    hello@connorlove.com
                                </a>
                            </div>
                            <div className={styles.contactInfoItem}>
                                <MapPin size={20} className={styles.contactInfoIcon} />
                                <h3 className={styles.contactInfoTitle}>Location</h3>
                                <p className={styles.contactInfoText}>Medina, Ohio</p>
                            </div>
                            <div className={styles.contactInfoItem}>
                                <div className={styles.socialLinks}>
                                    <a
                                        href="https://github.com/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        aria-label="GitHub"
                                    >
                                        <Github size={20} />
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                    <a
                                        href="https://twitter.com/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        aria-label="Twitter"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Section */}
                    <motion.div
                        className={styles.projectSection}
                        ref={projectSectionRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isProjectSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.projectSectionContent}>
                            <div className={styles.projectSectionIcon}>
                                <Briefcase size={32} />
                            </div>
                            <Heading level={2} as="h2" className={styles.projectSectionTitle}>
                                Have a project in mind?
                            </Heading>
                            <Text size="m" as="p" className={styles.projectSectionText}>
                                Let&apos;s work together to bring your vision to life. Start the conversation by sharing your project
                                details.
                            </Text>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button className={styles.projectButton} onClick={handleStartProject}>
                                    Start a Project
                                    <ArrowRight size={18} className={styles.projectButtonIcon} />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </Section>
    )
}
