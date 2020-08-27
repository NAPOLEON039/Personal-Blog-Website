import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/postCard"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"

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

const index = ({data}) => {
  return (
    <Layout>
      <SEO title="Nihar's Dev Corner" />
      <span className="main-text">
        <h1>Welcome to my blog</h1>
        <p>I write articles on Vue, React and any topic that I work with.</p>
        <p>Some of my articles are tutorials on projects that I've worked on, while some are guides on using a library like Jest or Cypress.</p>
        <p>I hope you learn something new from my articles.</p>
      </span>
      <ul style={{listStyle: "none"}}> 
        {
          data.allMarkdownRemark.edges.map(post => <li key={post.node.id}><Post postTitle = {post.node.frontmatter.title} postLocation = {post.node.frontmatter.path} /></li>)
        } 
      </ul>
    </Layout>
)}

export const postTitles = graphql`
  query PostTitleQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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

export default index
