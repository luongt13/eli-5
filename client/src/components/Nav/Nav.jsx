import React from 'react'
import {Link} from "react-router-dom"
import "./Nav.css"

export default function Nav(props) {
    function displayLinks() {
        if(props.userData) {
            return (
            <div className="nav">
                <Link to="/explore">Explore</Link>
                <button>Sign Out</button>
            </div>
            )
        } else {
            return (
            <div className="nav">
                <Link to="/explore">Explore</Link>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/sign-in">Sign In</Link>
            </div>
            ) 
        }
    }
    return (

        // <div className="nav">
        //     <Link to="/sign-up">Sign Up</Link>
        //     <Link to="/sign-in">Sign In</Link>
        //     <Link to="/explore">Explore</Link>
        // </div>
        <>
        {displayLinks()}
        </>
    )
}
