import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "./logo"
import ThemeSwitcher from "./ThemeSwitcher"

const Header = ({ siteTitle, siteDescription }) => (
  <header>
    <div className="header"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1em 0 0 1em`,
      }}
    >
      <div className="logo">
        <Link to="/">
          <Logo />  
        </Link>
      </div>
    </div>
    <div className="top-menu">
      <ul>
        <li><a href="/rss.xml">Feed</a></li>
        <li><Link to="/about" activeClassName="active">About</Link></li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string
}

Header.defaultProps = {
  siteTitle:   ``,
  siteDescription: ``
}

export default Header
