"use client"

import { useAppContext } from "hooks"
// import { useId } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "components/ThemeProvider"
import styles from "./ThemeToggle.module.css"

export const ThemeToggle = ({ isMobile, ...rest }) => {
  const { dispatch } = useAppContext()
  const { themeId } = useTheme()
  // const id = useId()
  const isDark = themeId === "dark"

  const handleClick = () => {
    dispatch({ type: "toggleTheme" })
  }

  return (
    <button
      className={`${styles.toggle} ${isMobile ? styles.mobile : ""}`}
      data-mobile={isMobile}
      aria-label="Toggle theme"
      onClick={handleClick}
      {...rest}
    >
      <div className={styles.toggleInner}>
        {isDark ? <Moon className={styles.icon} /> : <Sun className={styles.icon} />}
      </div>
    </button>
  )
}
