"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react"
import styles from "./ArticleShare.module.css"

export const ArticleShare = ({ title, slug }) => {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== "undefined" ? `${window.location.origin}/articles/${slug}` : `/articles/${slug}`

  const shareText = encodeURIComponent(`${title} | Check out this article`)
  const shareUrl = encodeURIComponent(url)

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      className={styles.shareContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={styles.shareTitle}>Share this article</div>
      <div className={styles.shareButtons}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </a>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <button onClick={copyToClipboard} className={styles.shareButton} aria-label="Copy link">
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
      </div>
    </motion.div>
  )
}
