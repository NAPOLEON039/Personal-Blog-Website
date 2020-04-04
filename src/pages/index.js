import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

// const IndexPage = ({data}) => {
//   data.allMarkdownRemark.edges.map(post => console.log(post.node.frontmatter.title));
//   return (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/posts-index/">Go to posts</Link>
//   </Layout>
// )}

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Welcome to my blog</h1>
      <p>I write articles on Vue, React and any topic that I work with.</p>
      <p>Some of my articles are tutorials on projects that I've worked on, while some are guides on using a library like Jest or Cypress.</p>
      <p>I hope you learn something new from my articles.</p>
      <ul> {data.allMarkdownRemark.edges.map(post => <li key={post.node.id}><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></li>)} </ul>
    </Layout>
)}

export const postTitles = graphql`
  query PostTitleQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`

export default IndexPage
