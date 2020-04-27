import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Moon from '../static/moon.svg'
import Sun from '../static/sun.svg'


function ThemeSwitcher() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <button
          onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
          className="button-theme"
        >
          <img src={theme === "dark" ? Sun : Moon} className="theme-icon" alt="theme" />
        </button>  
      )}      
    </ThemeToggler>
  )
}

export default ThemeSwitcher
