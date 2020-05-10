import React from "react"

import "./postCard.css"

const PostCard = ({postTitle}) => (
    <div className="card">
        <div className="card-body">
        <h4 className="card-title">{postTitle}</h4>
        </div>
    </div>
)

export default PostCard