import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Posts = () => (
    <Layout>
        <SEO title="Posts" />
        <h1>Here are my posts</h1>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export default Posts;