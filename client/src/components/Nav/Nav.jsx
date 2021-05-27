import React from 'react'
import {Link} from "react-router-dom"
export default function Nav() {
    return (
        <div>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/explore">Explore</Link>
        </div>
    )
}
