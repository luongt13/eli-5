import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {getPosts} from "../../services/post"
export default function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch()
    },[])

    async function fetch() {
        let res = await getPosts()
        console.log(res)
        setPosts(res)
    }
    return (
        <div>
            {posts.map((post) => {
                return (
                    <div>
                        <Link to={`/post/${post._id}`}>
                            <h1>{post.title}</h1>
                            <p>{post.category}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
