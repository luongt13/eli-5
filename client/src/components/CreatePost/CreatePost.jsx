import {useState} from 'react'
import {useParams} from "react-router-dom"
import {createPost} from "../../services/post"

export default function CreatePost(props) {
    const [formText, setFormText] = useState({})
    let {id} = useParams()

    function handleChange(e) {
        setFormText((prevState) => ({
            ...prevState,
            body: e.target.value,
            likes: 0,
            dislikes: 0,
            question_id: id,
            user_id: props.userId
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await createPost(formText)
        props.setToggle(prevState => !prevState)
        setFormText({body: ""})
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <input type="text" name="body" value={formText.body} placeholder="Enter..."/>
            <button type="submit">Create</button>
        </form>
    )
}
