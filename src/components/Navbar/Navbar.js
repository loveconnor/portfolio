"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Instagram, Linkedin, Github, Menu, X } from 'lucide-react'
import { Monogram } from "components/Monogram"
import { useAppContext, useScrollToHash, useWindowSize } from "hooks"
import { ThemeToggle } from "./ThemeToggle"
import { navLinks, socialLinks } from "./navData"
import { msToNum, numToMs } from "utils/style"
import { tokens } from "components/ThemeProvider/theme"
import { Transition } from "components/Transition"
import styles from "./Navbar.module.css"

export const Navbar = () => {
  const [current, setCurrent] = useState()
  const [target, setTarget] = useState()
  const [scrolled, setScrolled] = useState(false)
  // const { themeId } = useTheme()
  const { menuOpen, dispatch } = useAppContext()
  const { route, asPath } = useRouter()
  const windowSize = useWindowSize()
  const headerRef = useRef()
  const isMobile = windowSize.width <= 768 || windowSize.height <= 696
  const scrollToHash = useScrollToHash()

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    setCurrent(asPath)
  }, [asPath])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!target || route !== "/") return
    setCurrent(`${route}${target}`)
    scrollToHash(target, () => setTarget(null))
  }, [route, scrollToHash, target])

  // Add viewport meta tag check to ensure proper mobile rendering
  useEffect(() => {
    // Check if viewport meta tag exists and is properly set
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (!viewportMeta) {
      const meta = document.createElement("meta")
      meta.name = "viewport"
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      document.getElementsByTagName("head")[0].appendChild(meta)
    } else if (!viewportMeta.content.includes("width=device-width")) {
      viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    }
  }, [])

  const getCurrent = (url = "") => {
    const nonTrailing = current?.endsWith("/") ? current?.slice(0, -1) : current
    return url === nonTrailing ? "page" : ""
  }

  const handleNavItemClick = (event) => {
    const hash = event.currentTarget.href.split("#")[1]
    setTarget(null)

    if (hash && route === "/") {
      setTarget(`#${hash}`)
      event.preventDefault()
    }
  }

  const handleMobileNavClick = (event) => {
    handleNavItemClick(event)
    if (menuOpen) dispatch({ type: "toggleMenu" })
  }

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`} ref={headerRef}>
        <div className={styles.navbarContainer}>
          <Link href={route === "/" ? "/#intro" : "/"} scroll={false}>
            <a
              data-navbar-item
              className={styles.logo}
              aria-label="Connor Love, Designer"
              onClick={handleMobileNavClick}
            >
              <Monogram highlight />
            </a>
          </Link>

          <nav className={styles.nav}>
            <div className={styles.navList}>
              {navLinks.map(({ label, pathname }) => (
                <Link href={pathname} scroll={false} key={label}>
                  <a
                    data-navbar-item
                    className={styles.navLink}
                    aria-current={getCurrent(pathname)}
                    onClick={handleNavItemClick}
                  >
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </nav>

          <div className={styles.navFooter}>
            {!isMobile && (
              <div className={styles.socialAndTheme}>
                <NavbarIcons desktop />
                <div className={styles.themeToggleWrapper}>
                  <ThemeToggle data-navbar-item />
                </div>
              </div>
            )}

            <button
              className={styles.mobileMenuButton}
              onClick={() => dispatch({ type: "toggleMenu" })}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} className={styles.menuIcon} /> : <Menu size={24} className={styles.menuIcon} />}
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Full-screen mobile menu */}
      <Transition unmount in={menuOpen} timeout={msToNum(tokens.base.durationL)}>
        {(visible) => (
          <div className={`${styles.mobileNavOverlay} ${visible ? styles.mobileNavVisible : ""}`}>
            {/* Decorative elements */}
            <div className={`${styles.decorCircle} ${styles.decorCircle1}`}></div>
            <div className={`${styles.decorCircle} ${styles.decorCircle2}`}></div>

            <button
              className={styles.closeButton}
              onClick={() => dispatch({ type: "toggleMenu" })}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className={styles.mobileNav} data-visible={visible}>
              <div className={styles.mobileNavContent}>
                {navLinks.map(({ label, pathname }, index) => (
                  <Link href={pathname} scroll={false} key={label}>
                    <a
                      className={styles.mobileNavLink}
                      data-visible={visible}
                      aria-current={getCurrent(pathname)}
                      onClick={handleMobileNavClick}
                      style={{
                        transitionDelay: visible ? numToMs(Number(msToNum(tokens.base.durationS)) + index * 70) : "0ms",
                      }}
                    >
                      {label}
                    </a>
                  </Link>
                ))}

                <div className={styles.mobileNavFooter}>
                  <NavbarIcons />
                  <div className={styles.mobileThemeToggleWrapper}>
                    <ThemeToggle isMobile />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </Transition>
    </>
  )
}

const NavbarIcons = ({ desktop }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "instagram":
        return <Instagram size={desktop ? 22 : 24} />
      case "linkedin":
        return <Linkedin size={desktop ? 22 : 24} />
      case "github":
        return <Github size={desktop ? 22 : 24} />
      default:
        return null
    }
  }

  return (
    <div className={styles.navIcons}>
      {socialLinks.map(({ label, url, icon }) => (
        <a
          key={label}
          data-navbar-item={desktop || undefined}
          className={styles.navIconLink}
          aria-label={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon(icon)}
        </a>
      ))}
    </div>
  )
}
