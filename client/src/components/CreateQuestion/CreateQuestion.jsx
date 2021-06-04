import {useState} from 'react'
import {createQuestion} from "../../services/question"

export default function CreateQuestion(props) {
    const [formData, setFormData] = useState({})

    function handleChange(e) {
        let {name, value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            user_id: props.userId
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        await createQuestion(formData)
        props.setToggle(prevState => !prevState)
    }
    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <input type="text" name="body" value={formData.body} placeholder="Create..."/>
            <label >Choose a category:</label>
            <select name="category">
                <option>Choose an option</option>
                <option name="category" value="technology">Technology</option>
                <option name="category" value="finance">Finance</option>
                <option name="category" value="health">Health</option>
            </select>
            <button type="submit">Create</button>
        </form>
    )
}
