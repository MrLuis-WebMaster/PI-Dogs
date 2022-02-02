
import React, {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CleanDetails, getBreedsDetails } from "../../Redux/Actions";
import Nav from "../Nav/Nav"
import Spinner from "../Spinner/Spinner";
import "./DetailsDogs.scss"

export default function DetailsDogs () {
    const {id} = useParams()
    const dispatch = useDispatch();
    const stateDogs = useSelector( state => state.DetailsDog)
    useEffect(()=>{
        dispatch(CleanDetails())
        dispatch(getBreedsDetails(id))
    },[dispatch,id]) 

    return (
        <div className="detaills-dogs">
            <Nav/>
            { Object.entries(stateDogs).length > 0 
                ? (
                    <div className="flexDetails">
                        <div className="ImgDetails">
                            <img src={`${stateDogs.image}`} alt="Dog Happy" />
                        </div>
                        <div className="InfoDetails">
                            <p>Name: <span>{`${stateDogs.name}`}</span></p>
                            <p>Temperaments: <span>{`${stateDogs.temperaments}`}</span></p>
                            <p>Heigth: <span>{`${stateDogs.height}`}</span></p>
                            <p>Weight: <span>{`${stateDogs.weight}`} Kg</span></p>
                            <p>Life Years: <span>{`${stateDogs.life_span}`}</span></p>
                        </div>
                    </div>
                ) : (<Spinner/>)
            }
        </div>

    )
}