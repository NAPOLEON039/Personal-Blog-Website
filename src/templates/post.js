import React from 'react';
// import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

export default function Template ({data}) {
    const {markdownRemark: post} = data;

    return (
        <div style={{padding: `20px`}}>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.html}} />
        </div>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`