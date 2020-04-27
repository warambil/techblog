import React from "React"
import { FaGithub } from "react-icons/fa"
import { RiGatsbyLine } from "react-icons/ri"
import { Link } from "gatsby"


const Footer = ({ author }) => {
  return (
    <footer>
      <div>
        <div>
          <Link to="/">Go to HomePage</Link>
        </div> 
        {author} © {new Date().getFullYear()}
        <span className="icons">
          <a href="https://github.com/warambil/techblog">
            <FaGithub />
          </a>
          <a href="https://www.gatsbyjs.org/">
            <RiGatsbyLine />
          </a>
        </span>
      </div>
      <div className="info">          
        <a href="https://www.netlify.com" /> 
      </div>
    </footer>  
  )
}

export default Footer