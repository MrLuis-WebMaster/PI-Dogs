import React from "react";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";
import { getBreeds,filterDogs } from "../../Redux/Actions";
import { useEffect } from "react";
import { useDispatch,useSelector} from "react-redux"
import "./Home.scss"



export default function Home () {
    const dispatch = useDispatch();


    const Dogs = useSelector(state => state.Dogs)
    useEffect(()=>{
        dispatch(getBreeds())
    },[dispatch])

    const dogsFilter = useSelector(state => state.FilterDogs)
    useEffect(()=>{
        dispatch(filterDogs())
    },[Dogs,dispatch])

    function handleOption (e) {
        dispatch(filterDogs(e.target.value))
        console.log(e.target.value)
    }

    return (
        <div className="Home">
            <Nav/>
            <Search
                handleOption={handleOption}
            />
            <Cards 
                dogsFilter={dogsFilter}
            />
        </div>
    )
}