import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import kebabCase from "lodash/kebabCase"

const TagMenu = ({ tagName }) => {
  
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  const title = data.site.siteMetadata.title;
  const group = data.allMarkdownRemark.group;
  return (
    <>
      <Helmet title={title} />
      <div>
        <h1>Topics</h1>
        <ul className="tags">
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className={tag.fieldValue === tagName ? 'selected' : ''}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default TagMenu
