import React,{useState,useEffect}from "react";
import { useDispatch,useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { getTemperaments,postDog} from "../../Redux/Actions";
import "./Form.scss"

export default function Form () {

    const dispatch = useDispatch();
    const temperaments = useSelector( state => state.Temperaments);

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])

    function validate(input) {
        let errors = {};                             
        if (!input.name) {                          
            errors.name = "Name is required";        
        } else if (!input.minHeight) {
            errors.minHeight = "Min height is required";
        } else if (input.minHeight <= 0) {
            errors.minHeight = "Min height should be greater than zero";
        } else if (!input.maxHeight) {
            errors.maxHeight = "Max height is required";
        } else if (input.maxHeight <= 0) {
            errors.maxHeight = "Max height should be greater than zero";
        } else if (parseInt(input.minHeight) >= parseInt(input.maxHeight)) {      
            errors.maxHeight = "Max height must be greater than Min height";
        } else if (!input.minWeight) {
            errors.minWeight = "Min weight is required";
        } else if (input.minWeight <= 0) {
            errors.minWeight = "Min weight should be greater than zero";
          } else if (!input.maxWeight) {
            errors.maxWeight = "Max weight is required";
          } else if (input.maxWeight <= 0) {
            errors.maxWeight = "Max weight should be greater than zero";
          } else if (parseInt(input.minWeight) >= parseInt(input.maxWeight)) {     
            errors.maxWeight = "Max weight must be greater than Min weight";
          }  else if (!input.minlife_span) {
            errors.minlife_span = "Min life is required";
        } else if (input.minlife_span <= 0) {
            errors.minlife_span = "Min life should be greater than zero";
          } else if (!input.maxlife_span) {
            errors.maxlife_span = "Max life is required";
          } else if (input.maxlife_span <= 0) {
            errors.maxlife_span = "Max life should be greater than zero";
          } else if (parseInt(input.minlife_span) >= parseInt(input.maxlife_span)) {     
            errors.maxlife_span = "Max life must be greater than Min life";
          }
        return errors;
    };
    const [temp, setTemp] = useState([])
    const [state, setState] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minlife_span: '',
        maxlife_span: '',
        temperament: []
    })
    const [errors, setErrors] = useState({}); 
    
    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

        setErrors(validate({                 
            ...state,                        
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e) {
        setTemp(previous => [...previous,e.target.value]);
        setState({...state, temperament: temp})
    }

    function filterTemp(e) {
        let aux = temp.filter(temperament => temperament !== e.target.name)
        setTemp(aux)
    }
    function handleSubmit(e) {
        if (errors.name !== undefined 
            || 
            errors.minHeight !== undefined 
            ||
            errors.maxHeight !== undefined 
            ||
            errors.minWeight !== undefined 
            ||
            errors.maxWeight !== undefined 
            ||
            errors.minlife_span !== undefined 
            ||
            errors.maxlife_span !== undefined 
        )  
        {
            e.preventDefault()
            return alert("Please complete the fields with valid data");
        } else {
            
            const CreateDog = {
                name: state.name,
                height: `${state.minHeight} - ${state.maxHeight}`,
                weight: `${state.minWeight} - ${state.maxWeight}`,
                life_span: `${state.minlife_span} - ${state.maxlife_span} years`,
                temperament: state.temperament
            };
    
            dispatch(postDog(CreateDog))          
            
            setState({
                name: '',
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
                minlife_span: '',
                maxlife_span: '',
                temperament: []
            })

            return alert("Your dog was successfully created!")

        }


    }
    console.log(state.temperament)
    return (
        <div className="Flex-Form">
            <div className="buttonBack">
                <Link to="/home"><button>Back to home</button></Link>
            </div>
            <div>
                <h2>CREATE DOG</h2>
            </div>
            <div className="form-box">
                <form onSubmit={(e)=>handleSubmit(e)} className="FlexForm" action="">
                    <div>
                        <label htmlFor="">Name</label>
                        <input 
                            type="text" 
                            name="name"  
                            value={state.name} 
                            onChange={ e => handleChange(e)}
                        />
                        {errors.name && (    
                            <p className="pop-up" >{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="">Height</label>
                        <input 
                            type="text"  
                            name="minHeight"  
                            value={state.minHeight} 
                            placeholder="Min Height"
                            onChange={ e => handleChange(e)}  
                        />
                        {errors.minHeight && (    
                            <p className="pop-up" >{errors.minHeight}</p>
                        )}
                        <input 
                            type="text"  
                            name="maxHeight"  
                            value={state.maxHeight}
                            placeholder="Max Height" 
                            onChange={ e => handleChange(e)}  
                        />
                        {errors.maxHeight && (    
                            <p className="pop-up" >{errors.maxHeight}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="">Weight</label>
                        <input 
                            type="text"  
                            name="minWeight"  
                            value={state.minWeight} 
                            placeholder="Min Weight" 
                            onChange={ e => handleChange(e)}
                        />
                        {errors.minWeight && (    
                            <p className="pop-up" >{errors.minWeight}</p>
                        )}
                        <input 
                            type="text"  
                            name="maxWeight"  
                            value={state.maxWeight} 
                            placeholder="Max Weight" 
                            onChange={ e => handleChange(e)}
                        />
                        {errors.maxWeight && (    
                            <p className="pop-up" >{errors.maxWeight}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="">Life Span</label>
                        <input 
                            type="text"  
                            name="minlife_span"  
                            value={state.minlife_span} 
                            placeholder="Min Life Span"
                            onChange={ e => handleChange(e)}
                        />
                        {errors.minlife_span && (    
                            <p className="pop-up" >{errors.minlife_span}</p>
                        )}
                        <input 
                            type="text"  
                            name="maxlife_span"  
                            value={state.maxlife_span} 
                            placeholder="Max Life Span"
                            onChange={ e => handleChange(e)}
                        />
                        {errors.maxlife_span && (    
                            <p className="pop-up" >{errors.maxlife_span}</p>
                        )}
                    </div>
                    <div>
                        <select onChange={(e)=>handleSelect(e)} name="" id="">
                            {
                                temperaments.map( e => {
                                    return (
                                        <option key={e.id} value={`${e.name}`}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Enviar"/>
                    </div>
                </form>
                <div>
                    <h3>Temperaments</h3>
                    <div>
                        {
                            temp.map( e => {
                                return (
                                    <div className="li-button">
                                        <li>{e}</li>
                                        <button name={`${e}`} onClick={(e)=>{filterTemp(e)}}>X</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>

    )
}