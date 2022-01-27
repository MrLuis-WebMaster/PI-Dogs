import React from "react";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CardDog from "../CardDog/CardDog"

import "./Cards.scss"



export default function Cards ({dogsFilter}) {

    const [dogs, setDogs] = useState([])
    
    const [currentPage,setCurrentPage] = useState(0)

    const [pagesTotal, setTotalPages] = useState(0)
    useEffect(()=>{
        setDogs([...dogsFilter].splice(0,8))
        setTotalPages(Math.floor(dogsFilter.length/8))
    },[dogsFilter])



    function HandleForwad () {
        const totalElementos = dogsFilter.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * 8;
        if(firstIndex > totalElementos) return;

        setCurrentPage(nextPage)
        setDogs([...dogsFilter].splice(firstIndex,8));
    }


    function HandleBack () {
        const prevPage = currentPage - 1
        if(prevPage < 0 ) return;
        const firstIndex = prevPage * 8;
        setCurrentPage(prevPage)
        setDogs([...dogsFilter].splice(firstIndex,8));
    }
    return (
        <div className="flexFather">
            <div className="container">
                {
                    dogs.map( d => {
                        const {id,image,name,temperaments,weight} = d
                        return (
                            <Link to={`/home/${id}`}>
                                <CardDog
                                    key={id}
                                    image={image}
                                    name={name}
                                    temperaments={temperaments}
                                    weight={weight}
                                />
                            </Link>
                        )
                    }) 
                }
            </div>
            <div className="pagination">
                <button onClick={() => HandleBack()} > Back </button>
                <span>{`${currentPage} de ${pagesTotal}`}</span>
                <button onClick={() =>  HandleForwad()}> Forwad </button>
            </div>
        </div>

    )
}