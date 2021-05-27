import React from 'react'
import "./style.css"

export default function PostDetails(props) {
    let {post} = props
    return (
        <div className="post-detail"> 
            <p>{post.body}</p>
            <div className="buttons">
                <div className="likes">
                    <p>{post.likes}</p>
                    <button>Like</button>
                </div>
                <div className="dislikes">
                    <p>{post.dislikes}</p>
                    <button>Dislike</button>
                </div>
            
            </div>
            
        </div>
    )
}
