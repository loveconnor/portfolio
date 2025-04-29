"use client"

import { useState, useEffect, useRef } from "react"

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        const isIntersecting = entry.isIntersecting
        if (isIntersecting) {
          setIsVisible(true)
          // If we only want to detect once, unobserve after becoming visible
          if (freezeOnceVisible) {
            observer.unobserve(element)
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return [isVisible, ref]
}
