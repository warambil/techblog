import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TagMenu from "../components/tagmenu"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
        <div className="grid">
          <article>
            {edges.map(({ node }) => {
              const { title, abstract, date, path } = node.frontmatter
              return (
                <div key={path}>
                  <h1>
                  <Link to={path}>{title}</Link>
                  </h1>
                  <p style={{
                      fontStyle: `italic`
                    }}
                  > 
                    {date}
                  </p>
                  <p>{abstract}</p>
                </div>
              )
            })
          }  
        </article>
        <div className="tag-menu">
          <TagMenu tagName={ tag }/>
        </div>    
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
    	sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
            abstract
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
