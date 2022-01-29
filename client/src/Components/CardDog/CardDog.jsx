import React from "react";
import "./CarDog.scss"
export default function CardDog (props) {
    const {image,name,temperaments,weight} = props
    return (
        <div className="card">
            <div className="image">
                <img src={`${image}`} alt="Dogs" />
            </div>
            <div className="info">
                <p>Name:<span>{` ${name}`} </span></p>
                <p>Temperaments:<span> {` ${temperaments}`}</span></p>
                <p>Weight:<span>{` ${weight} Kg`}</span></p>
            </div>
        </div>
    )
}