"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Loader2,
    Globe,
    Settings,
    ShoppingCart,
    Sparkles,
    FileText,
    Clock,
    Calendar,
    DollarSign,
    User,
    Mail,
    Building,
    Phone,
    Paperclip,
    AlertCircle,
} from "lucide-react"
import { Meta } from "components/Meta"
import { Section } from "components/Section"
import { Heading } from "components/Heading"
import { Text } from "components/Text"
import { Button } from "components/Button"
import { Footer } from "components/Footer"
import { useRouter } from "next/router"
import styles from "./ProjectInquiry.module.css"
import { FileUpload } from "./file-upload/upload"

// Project type options
const projectTypes = [
    { id: "website", label: "Website", icon: <Globe size={32} /> },
    { id: "webapp", label: "Web Application", icon: <Settings size={32} /> },
    { id: "ecommerce", label: "E-Commerce", icon: <ShoppingCart size={32} /> },
    { id: "branding", label: "Branding", icon: <Sparkles size={32} /> },
    { id: "other", label: "Other", icon: <FileText size={32} /> },
]

// Budget range options
const budgetRanges = [
    { id: "small", label: "$1,000 - $5,000", description: "Small projects", icon: <DollarSign size={24} /> },
    { id: "medium", label: "$5,000 - $10,000", description: "Medium-sized projects", icon: <DollarSign size={24} /> },
    { id: "large", label: "$10,000 - $25,000", description: "Large projects", icon: <DollarSign size={24} /> },
    { id: "enterprise", label: "$25,000+", description: "Enterprise solutions", icon: <DollarSign size={24} /> },
]

// Timeline options
const timelineOptions = [
    { id: "urgent", label: "Less than 1 month", description: "Urgent timeline", icon: <Clock size={24} /> },
    { id: "standard", label: "1-3 months", description: "Standard timeline", icon: <Calendar size={24} /> },
    { id: "relaxed", label: "3-6 months", description: "Relaxed timeline", icon: <Calendar size={24} /> },
    { id: "longterm", label: "6+ months", description: "Long-term project", icon: <Calendar size={24} /> },
]

export const Inquiry = () => {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        projectType: "",
        projectName: "",
        projectDescription: "",
        budget: "",
        timeline: "",
        name: "",
        email: "",
        company: "",
        phone: "",
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        trigger,
        getValues,
        setValue,
        watch,
    } = useForm({
        defaultValues: formData,
        mode: "onChange",
    })

    // Update form data when values change
    const watchedValues = watch()
    useEffect(() => {
        // Use a specific list of fields to watch instead of the entire form
        const formValues = {
            projectType: watchedValues.projectType,
            projectName: watchedValues.projectName,
            projectDescription: watchedValues.projectDescription,
            budget: watchedValues.budget,
            timeline: watchedValues.timeline,
            name: watchedValues.name,
            email: watchedValues.email,
            company: watchedValues.company,
            phone: watchedValues.phone,
        }

        setFormData((prev) => {
            // Only update if values have actually changed
            if (JSON.stringify(prev) !== JSON.stringify(formValues)) {
                return formValues
            }
            return prev
        })
    }, [
        watchedValues.projectType,
        watchedValues.projectName,
        watchedValues.projectDescription,
        watchedValues.budget,
        watchedValues.timeline,
        watchedValues.name,
        watchedValues.email,
        watchedValues.company,
        watchedValues.phone,
    ])

    const totalSteps = 4

    const nextStep = async () => {
        const fieldsToValidate = getFieldsForStep(step)
        const isStepValid = await trigger(fieldsToValidate)

        if (isStepValid) {
            setStep((prev) => Math.min(prev + 1, totalSteps))
            window.scrollTo(0, 0)
        }
    }

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1))
        window.scrollTo(0, 0)
    }

    const getFieldsForStep = (stepNumber) => {
        switch (stepNumber) {
            case 1:
                return ["projectType", "projectName"]
            case 2:
                return ["projectDescription"]
            case 3:
                return ["budget", "timeline"]
            case 4:
                return ["name", "email", "company", "phone"]
            default:
                return []
        }
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            // Prepare file information for the email
            const fileInfo = files.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
            }))

            await fetch("project-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!result.success) {
                throw new Error(result.message || "Failed to send project inquiry")
            }

            setIsSubmitted(true)
        } catch (error) {
            console.error("Error submitting project inquiry:", error)
            setSubmitError(error.message || "Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleProjectTypeSelect = (type) => {
        setValue("projectType", type)
    }

    const handleBudgetSelect = (budget) => {
        setValue("budget", budget)
    }

    const handleTimelineSelect = (timeline) => {
        setValue("timeline", timeline)
    }

    const handleBackToHome = () => {
        router.push("/contact")
    }

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles)
    }

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className={styles.stepContent}>
                        <Heading level={3} as="h3" className={styles.stepTitle}>
                            What type of project are you looking for?
                        </Heading>

                        <div className={styles.projectTypeGrid}>
                            {projectTypes.map((type) => (
                                <motion.div
                                    key={type.id}
                                    className={`${styles.projectTypeCard} ${formData.projectType === type.id ? styles.selected : ""}`}
                                    onClick={() => handleProjectTypeSelect(type.id)}
                                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 210, 255, 0.2)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <div className={styles.projectTypeIcon}>{type.icon}</div>
                                    <div className={styles.projectTypeLabel}>{type.label}</div>
                                    {formData.projectType === type.id && (
                                        <motion.div
                                            className={styles.selectedCheck}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                        >
                                            <Check size={16} />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        {errors.projectType && <p className={styles.formError}>{errors.projectType.message}</p>}

                        <div className={styles.formField}>
                            <label htmlFor="projectName" className={styles.formLabel}>
                                <span className={styles.labelText}>Project Name</span>
                            </label>
                            <input
                                id="projectName"
                                type="text"
                                className={styles.formInput}
                                placeholder="What should we call your project?"
                                {...register("projectName", {
                                    required: "Please provide a name for your project",
                                })}
                            />
                            {errors.projectName && <p className={styles.formError}>{errors.projectName.message}</p>}
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className={styles.stepContent}>
                        <Heading level={3} as="h3" className={styles.stepTitle}>
                            Tell us about your project
                        </Heading>

                        <div className={styles.formField}>
                            <label htmlFor="projectDescription" className={styles.formLabel}>
                                <span className={styles.labelText}>Project Description</span>
                            </label>
                            <textarea
                                id="projectDescription"
                                className={styles.formTextarea}
                                placeholder="Describe your project, goals, and any specific requirements..."
                                rows={8}
                                {...register("projectDescription", {
                                    required: "Please provide a description of your project",
                                    minLength: { value: 20, message: "Please provide more details (at least 20 characters)" },
                                })}
                            ></textarea>
                            {errors.projectDescription && <p className={styles.formError}>{errors.projectDescription.message}</p>}
                        </div>

                        <div className={styles.formField}>
                            <label htmlFor="projectFiles" className={styles.formLabel}>
                                <Paperclip size={16} className={styles.labelIcon} />
                                <span className={styles.labelText}>Attach Files (Optional)</span>
                            </label>
                            <FileUpload onFilesChange={handleFilesChange} />
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className={styles.stepContent}>
                        <Heading level={3} as="h3" className={styles.stepTitle}>
                            Budget & Timeline
                        </Heading>

                        <div className={styles.optionSection}>
                            <h4 className={styles.optionSectionTitle}>What's your budget range?</h4>
                            <div className={styles.optionsGrid}>
                                {budgetRanges.map((budget) => (
                                    <motion.div
                                        key={budget.id}
                                        className={`${styles.optionCard} ${formData.budget === budget.id ? styles.selected : ""}`}
                                        onClick={() => handleBudgetSelect(budget.id)}
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 210, 255, 0.2)" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className={styles.optionCardIcon}>{budget.icon}</div>
                                        <div className={styles.optionCardContent}>
                                            <div className={styles.optionLabel}>{budget.label}</div>
                                            <div className={styles.optionDescription}>{budget.description}</div>
                                        </div>
                                        {formData.budget === budget.id && (
                                            <motion.div
                                                className={styles.selectedCheck}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                            >
                                                <Check size={16} />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            {errors.budget && <p className={styles.formError}>{errors.budget.message}</p>}
                        </div>

                        <div className={styles.optionSection}>
                            <h4 className={styles.optionSectionTitle}>What's your timeline?</h4>
                            <div className={styles.optionsGrid}>
                                {timelineOptions.map((timeline) => (
                                    <motion.div
                                        key={timeline.id}
                                        className={`${styles.optionCard} ${formData.timeline === timeline.id ? styles.selected : ""}`}
                                        onClick={() => handleTimelineSelect(timeline.id)}
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 210, 255, 0.2)" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className={styles.optionCardIcon}>{timeline.icon}</div>
                                        <div className={styles.optionCardContent}>
                                            <div className={styles.optionLabel}>{timeline.label}</div>
                                            <div className={styles.optionDescription}>{timeline.description}</div>
                                        </div>
                                        {formData.timeline === timeline.id && (
                                            <motion.div
                                                className={styles.selectedCheck}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                            >
                                                <Check size={16} />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            {errors.timeline && <p className={styles.formError}>{errors.timeline.message}</p>}
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className={styles.stepContent}>
                        <Heading level={3} as="h3" className={styles.stepTitle}>
                            Your Contact Information
                        </Heading>

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
                                    <span className={styles.labelText}>Your Name</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={styles.formInput}
                                    placeholder="Your full name"
                                    {...register("name", {
                                        required: "Your name is required",
                                    })}
                                />
                                {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="email" className={styles.formLabel}>
                                    <Mail size={16} className={styles.labelIcon} />
                                    <span className={styles.labelText}>Email Address</span>
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

                            <div className={styles.formField}>
                                <label htmlFor="company" className={styles.formLabel}>
                                    <Building size={16} className={styles.labelIcon} />
                                    <span className={styles.labelText}>Company/Organization (Optional)</span>
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    className={styles.formInput}
                                    placeholder="Your company or organization"
                                    {...register("company")}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="phone" className={styles.formLabel}>
                                    <Phone size={16} className={styles.labelIcon} />
                                    <span className={styles.labelText}>Phone Number (Optional)</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className={styles.formInput}
                                    placeholder="Your phone number"
                                    {...register("phone")}
                                />
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <Section className={styles.projectInquirySection}>
            <Meta
                title="Start a Project | Connor Love"
                description="Share your project details and let's create something amazing together."
            />

            <div className={styles.projectInquiryContainer}>
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
                                <Check size={64} />
                            </div>
                            <Heading level={2} as="h2" className={styles.successTitle}>
                                Project Inquiry Submitted!
                            </Heading>
                            <Text size="m" as="p" className={styles.successText}>
                                Thank you for sharing your project details. I'll review your inquiry and get back to you within 1-2
                                business days to discuss next steps.
                            </Text>
                            <Button className={styles.backButton} onClick={handleBackToHome}>
                                <ChevronLeft size={18} />
                                Back to Contact
                            </Button>
                        </motion.div>
                    ) : (
                        <>
                            <div className={styles.formHeader}>
                                <Button className={styles.backLink} onClick={handleBackToHome}>
                                    <ChevronLeft size={16} />
                                    Back to Contact
                                </Button>
                                <Heading level={1} as="h1" className={styles.title}>
                                    Start a Project
                                </Heading>
                                <Text size="m" as="p" className={styles.subtitle}>
                                    Tell me about your project and I'll help bring your vision to life.
                                </Text>
                            </div>

                            <div className={styles.progressContainer}>
                                <div className={styles.progressSteps}>
                                    {Array.from({ length: totalSteps }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.progressStep} ${step > index ? styles.completed : ""} ${step === index + 1 ? styles.active : ""}`}
                                        >
                                            <div className={styles.progressStepCircle}>{step > index ? <Check size={16} /> : index + 1}</div>
                                            <div className={styles.progressStepLabel}>
                                                {index === 0 && "Project Type"}
                                                {index === 1 && "Description"}
                                                {index === 2 && "Budget & Timeline"}
                                                {index === 3 && "Contact Info"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className={styles.formCard}>
                                <form className={styles.projectForm} onSubmit={handleSubmit(onSubmit)}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`step-${step}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {renderStepContent()}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className={styles.formNavigation}>
                                        {step > 1 && (
                                            <Button type="button" className={styles.prevButton} onClick={prevStep}>
                                                <ChevronLeft size={18} />
                                                Previous Step
                                            </Button>
                                        )}

                                        {step < totalSteps ? (
                                            <Button type="button" className={styles.nextButton} onClick={nextStep}>
                                                Next Step
                                                <ChevronRight size={18} />
                                            </Button>
                                        ) : (
                                            <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className={styles.spinnerIcon} size={18} />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Project Inquiry
                                                        <Check size={18} />
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </Section>
    )
}
