import React from "react"
import { Link } from 'gatsby'
import { Container, Card } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const PostCard = ({postTitle, postLocation}) => (
    <Container fluid="md">
        <Card style={{backgroundColor: `#aff6cf`, 
                backgroundImage: `linear-gradient(315deg, #aff6cf 0%, #9f98e8 74%)`}}>
            <Card.Body>
                <Card.Title style={{color: `#4d0316`, fontWeight: `bold`}}> {postTitle} </Card.Title>
                <Link to={postLocation}><Card.Link style={{color: `#622774`}} href="#">View post</Card.Link></Link>
            </Card.Body>
        </Card>
    </Container>
)

export default PostCard