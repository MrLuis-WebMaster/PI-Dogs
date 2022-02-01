import React from "react";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CardDog from "../CardDog/CardDog"
import Spinner from "../Spinner/Spinner";
import "./Cards.scss"

export default function Cards ({dogsFilter}) {

    const [dogs, setDogs] = useState([])
    
    const [currentPage,setCurrentPage] = useState(0)

    const [pagesTotal, setTotalPages] = useState(0)

    useEffect(()=>{
        setDogs([...dogsFilter].splice(0,8))
        setCurrentPage(0)
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
        const prevPage = currentPage - 1;
        if(prevPage < 0 ) return;
        const firstIndex = prevPage * 8;
        setCurrentPage(prevPage)
        setDogs([...dogsFilter].splice(firstIndex,8));
    }
    return (
        <div className="flexFather">
            { dogsFilter.length > 0 ? 
                (
                    <div className="container">
                    {
                        dogs.map( doggie => {
                            const {id,image,name,temperaments,weight} = doggie
                            return (
                                <Link key={`${id}`} to={`/home/${id}`}>
                                    <CardDog
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
                )
                : (<Spinner/>)
            }
            <div className="pagination">
                <button onClick={() => HandleBack()} > Back </button>
                <span>{`${currentPage + 1} of ${pagesTotal + 1}`}</span>
                <button onClick={() =>  HandleForwad()}> Forwad </button>
            </div>
        </div>

    )
}