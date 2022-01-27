import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/happy.png"
import "./Nav.scss"
export default function Nav () {
    return (
        <div className="flex">
            <div className="home">
                <Link to="/home"> <img src={logo} alt="" /> Home</Link>
            </div>
            <div className="title">
                <h1>Doggie world</h1>
            </div>
            <div className="create-dog">
                <Link to="/home/create"><button>Create Dog</button></Link>
            </div>
        </div>
    )
}