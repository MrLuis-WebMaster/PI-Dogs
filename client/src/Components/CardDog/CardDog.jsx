import React from "react";
import "./CarDog.scss"
export default function CardDog (props) {
    const {image,name,temperaments,weight,id} = props
    return (
        <div key={`${id}`} className="card">
            <div className="image">
                <img src={`${image}`} alt="Dogs" />
            </div>
            <div className="info">
                <p>Name:{`${name}`}</p>
                <p>Temperaments:{`${temperaments}`}</p>
                <p>Weight:{`${weight}`}</p>
            </div>
        </div>
    )
}