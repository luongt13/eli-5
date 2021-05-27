import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {getQuestions} from "../../services/question"
import CreateQuestion from "../CreateQuestion/CreateQuestion"
export default function Posts(props) {
    const [questions, setQuestions] = useState([])
    const [toggle, setToggle] = useState(false)
    useEffect(() => {
        fetch()
    },[toggle])

    async function fetch() {
        let res = await getQuestions()
        console.log(res)
        setQuestions(res)
    }
    return (
        <div>
            {questions.map((question) => {
                return (
                    <div key={question._id}>
                        <Link to={`/question/${question._id}`}>
                            <h4>{question.body}</h4>
                        </Link>
                    </div>
                )
            })}
        {props.userData ? <CreateQuestion userId={props.userData} setToggle={setToggle}/> : null}
        </div>
    )
}
