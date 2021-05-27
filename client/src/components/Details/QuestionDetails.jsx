import {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {getQuestion} from "../../services/question.js"
import PostDetails from "./PostDetails.jsx"
import CreatePost from "../CreatePost/CreatePost"
import "./style.css"

export default function QuestionDetails(props) {
    const [question, setQuestion] = useState({})
    const [posts, setPosts] = useState([])
    const [toggle, setToggle] = useState(false)
    let {id} = useParams()

    useEffect(() => {
        fetch()
    },[toggle])

    async function fetch() {
        let res = await getQuestion(id)
        setQuestion(res)
        setPosts(res.posts)
    }

    function displayDetails() {
        return (
            <div className="question-detail">
            <h2>{question.body}</h2>
            <p>{question.user_id.name}</p>
            </div>
        )
    }
    return (
        <div className="detail-container">
            {(question && question.user_id) ? displayDetails(): null}
            <div className="post-container">
                {posts && posts.map(post => {
                    return (
                        <div key={post._id}>
                            <PostDetails post={post}/>
                        </div>
                    )
                })}
            </div>
            {props.userData ? <CreatePost userId={props.userData} setToggle={setToggle}/> : null}
            
        </div>
    )
}
