import React from "react";
import "./index.scss"
import { Link } from "react-router-dom";
function Landing () {

    return (
        <div className="BoxLanding">
            <div className="landing-welcome">
                <h1>Welcome!!</h1>
                <p>Development of an application with the dog api</p>
            </div>
            <Link to="/home">Start App</Link>
        </div>
    )
}

export default Landing;