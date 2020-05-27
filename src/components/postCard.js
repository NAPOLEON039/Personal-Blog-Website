import React from "react"
import { Link } from 'gatsby'
import { Container, Card } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const PostCard = ({postTitle, postLocation}) => (
    <Container fluid="md">
        <Card style={{backgroundColor: '#cbdada'}}>
            <Card.Body>
                <Card.Title> {postTitle} </Card.Title>
                <Link to={postLocation}><Card.Link href="#">View post</Card.Link></Link>
            </Card.Body>
        </Card>
    </Container>
)

export default PostCard