import axios from 'axios';

export const GET_BREEDS = "GET_BREEDS";
export const GET_BREEDS_DETAILS = "GET_BREEDS_DETAILS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const DOGS_BY_PAGES="DOGS_BY_PAGES"
export const FILTER_BY_TEMPERAMENTS="FILTER_BY_TEMPERAMENTS"
export const POST_DOG = "POST_DOG";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const ORDER_BY_ALPHABET= "ORDER_BY_ALPHABET"
export const CLEAN_DETAILS = "CLEAN_DETAILS"

export function getBreeds(){
    return async function(dispatch){
        const Dogs = await axios.get(`http://localhost:3001/dogs`);
        return dispatch ({
            type:GET_BREEDS,
            payload: Dogs.data
        });
    };
};

export function getBreedsDetails(id){
    return async function(dispatch){
        const Dogs = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch ({
            type:GET_BREEDS_DETAILS,
            payload: Dogs.data
        });
    };
};

export function getTemperaments() {
    return async function(dispatch){
        const Temperaments = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type:GET_TEMPERAMENTS,
            payload: Temperaments.data
        })
    }
}

export function filterDogs(data){
    return {
        type:FILTER_BY_TEMPERAMENTS,
        payload:data
    }
}

export function OrderByWeihgt(data){
    return {
        type:ORDER_BY_WEIGHT,
        payload:data
    }
}

export function OrderByAlphabet(data){
    return {
        type:ORDER_BY_ALPHABET,
        payload:data
    }
}

export function SearchByName(name) {
    return async function(dispatch){
        try {
            const Dogs = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch ({
                type:SEARCH_BY_NAME,
                payload: Dogs.data
            })
        } catch (error) {
            return alert(`sorry we couldn't locate your puppy  ${name} :(`)
        }
    };
}

export function postDog (newDog) {   
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/dogs",newDog);  
        return dispatch ({
            type: POST_DOG,
            payload: json.data
        })
    }
};

export function CleanDetails(){
    return {
        type: CLEAN_DETAILS
    }
}



