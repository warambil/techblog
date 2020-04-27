import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TagMenu from "../components/TagMenu"

export default function IndexPage({ data }) {
  const { edges: posts } = data.allMarkdownRemark 
    
  return (
    <Layout>
      <SEO title="Home" />
      <div className="grid">
        <article>
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              return (
                <div className="blog-post-preview" key={post.id}>
                  <h1>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                  </h1>
                  <p style={{
                      fontStyle: `italic`
                    }}
                  > 
                    {post.frontmatter.date}
                  </p>
                    <p>{post.frontmatter.abstract}</p>
                </div>
              )
            })}
        </article> 
        <div className="tag-menu">
          <TagMenu />
        </div>
      </div>
    </Layout>
  ) 
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            abstract
          }
        }
      }
    }
  }
`