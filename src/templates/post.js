import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import './post.css'

export default function Template ({data}) {
    const {markdownRemark: post} = data;

    return (
        <Layout>
            <SEO title={post.frontmatter.title} description={post.frontmatter.description} cover={post.frontmatter.cover} />
            <div id="post-content" style={{padding: `20px`}}>
                <i className="fas fa-home"></i><h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.html}} />
            </div>
        </Layout>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
                description
                cover
            }
        }
    }
`