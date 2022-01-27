
import React, {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getBreedsDetails } from "../../Redux/Actions";
import "./DetailsDogs.scss"

export default function DetailsDogs () {
    const {id} = useParams()
    console.log(id)
    const dispatch = useDispatch();
    const stateDogs = useSelector( state => state.DetailsDog)
    console.log(stateDogs)
    useEffect(()=>{
        dispatch(getBreedsDetails(id))
    },[dispatch,id]) 

    return (
        <div className="detaills-dogs">
            <div className="buttonBack">
                <Link to="/home"><button>Back to home</button></Link>
            </div>
            <div className="flexDetails">

                <div className="ImgDetails">
                    <img src={`${stateDogs.image}`} alt="Hola" />
                </div>
                <div className="InfoDetails">
                    <p>Name: <span>{`${stateDogs.name}`}</span></p>
                    <p>Temperament: <span>{`${stateDogs.temperaments}`}</span></p>
                    <p>Heigth: <span>{`${stateDogs.height}`}</span></p>
                    <p>Weight: <span>{`${stateDogs.weight}`}</span></p>
                    <p>Life Years: <span>{`${stateDogs.life_span}`}</span></p>
                </div>
            </div>
        </div>

    )
}