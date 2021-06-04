import {useState, useEffect} from 'react'
import {addLike, addDislike} from "../../services/post"
import "./style.css"

export default function PostDetails(props) {
    let {post} = props
    const [userId, setUserId] = useState(props.userData)

    useEffect(() => {
        setUserId(props.userData)
    },[props.userData])

    async function handleLike(e) {
        await addLike(e.target.value, {user_id: userId})
        props.setToggle((prevState) => !prevState)
    }
    return (
        <div className="post-detail"> 
            <p>{post.body}</p>
            <div className="buttons">
                <div className="likes">
                    {post.likes ? <p>{post.likes.length}</p>: <p>0</p>}
                    <button value={post._id} onClick={handleLike}>Like</button>
                </div>
                <div className="dislikes">
                    {post.dislikes ? <p>{post.dislikes.length}</p>: <p>0</p>}
                    <button>Dislike</button>
                </div>
            </div>
        </div>
    )
}
