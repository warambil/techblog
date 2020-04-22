import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { FaPatreon, FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import kebabCase from "lodash/kebabCase"


import Layout from "../components/layout"
import SEO from "../components/seo"



export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <Layout>
        <SEO title={frontmatter.title} />
        <article>
          <div className="grid">
            <div>
              <h1>{frontmatter.title}</h1>
            </div>    
            <div class="social">
              <a href="https://www.linkedin.com/in/warambillete/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://github.com/warambil" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://twitter.com/warambil" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="/" target="_blank" rel="noopener noreferrer"><FaPatreon /></a> 
            </div>  
          </div>
          <em>{frontmatter.date}</em>
          <div className="tags">
          {frontmatter.tags
              .map((value, key) => {
                return (
                  <span key={key}>
                    <Link to={`/tags/${kebabCase(value)}/`}>
                      {value}
                    </Link>
                  </span>
                )
              })
          }
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
      }
    }
  }
`
