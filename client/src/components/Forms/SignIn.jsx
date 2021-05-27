import {useState} from 'react'
import { signIn } from '../../services/user'

export default function SignIn(props) {
    let formInput = {
        email: "",
        password: ""

    }
    const [formData, setFormData] = useState(formInput)

    function handleChange(e) {
        let {name, value} = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await signIn(formData)
        props.setCurrentUser(res.payload)
    }
    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} placeholder="Email..."/>
            <input type="password" name="password" value={formData.password} placeholder="Password..."/>
            <button type="submit">Login</button>
        </form>
    )
}
