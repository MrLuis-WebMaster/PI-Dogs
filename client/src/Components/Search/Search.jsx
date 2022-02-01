import React, {useEffect}from "react";
import { useState } from "react";
import { useDispatch,useSelector} from "react-redux"
import { getBreeds, getTemperaments,OrderByAlphabet,OrderByWeihgt, SearchByName } from "../../Redux/Actions";
import "./Search.scss"
export default function Search ({handleOption}) {
    const dispatch = useDispatch();
    const state = useSelector( state => state.Temperaments);
    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])
    function handleWeight(e) {
        dispatch(OrderByWeihgt(e.target.value))
    }
    function handleAlphabet(e) {
        dispatch(OrderByAlphabet(e.target.value))
    }
    const [input,setInput] = useState("")
    function handleInput(e) {
        setInput(e.target.value)
        if(!e.target.value) {
            dispatch(getBreeds())
        }
    }
    function handleClick(e) {
        e.preventDefault();
        if(!input) {
            return alert("Insert a search please")
        }
        dispatch(SearchByName(input))
    }
    
    return (
        <div className="BoxSearch">
            <div className="flexS">
                <form onSubmit={e => {handleClick(e)}} className="search-name">
                    <div>
                    <span>Search by name</span>
                    <input 
                        placeholder="Type for search..."
                        type="text"
                        value={input}
                        onChange={(e)=>{handleInput(e)}}
                    />
                    </div>
                    <input type="submit" value="Find"/>
                </form>
                <div className="filter-temperament">
                    <span>Filter by temperament</span>
                    <select onChange={(e)=> handleOption(e)}>
                        <option value="">--Select--</option>
                        {
                            state.map( e => {
                                return (
                                    <option key={e.id} value={`${e.name}`}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="order">
                    <span>Order</span>
                    <div className="select-order">
                        <select onChange={(e)=>{handleAlphabet(e)}} name="" id="">
                            <option value="">--Select--</option>
                            <option value="A-Z">Order A-Z</option>
                            <option value="Z-A">Order Z-A</option>
                        </select>
                        <select onChange={(e)=>{handleWeight(e)}} name="" id="">
                            <option value="">--Select--</option>
                            <option value="+/-">Order weight +/-</option>
                            <option value="-/+">Order weight -/+</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}