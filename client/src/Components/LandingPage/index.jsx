import React from "react";
import "./index.scss"
import { Link } from "react-router-dom";
function Landing () {

    return (
        <div className="Landing">
            <div className="Landing-Welcome">
                <img src="https://c.tenor.com/UYhHhCkctmgAAAAi/bello-dog.gif" alt="" />
            </div>
            <div className="Landing-text">
                <h1>Welcome!</h1> 
                <p>An application on dog breeds, you will be able to know in detail about dogs and be able to   create a new breed. Developed thanks to information from thedogapi.com API</p>
                <Link to="/home">Start App</Link>
            </div>
        </div>
    )
}

export default Landing;