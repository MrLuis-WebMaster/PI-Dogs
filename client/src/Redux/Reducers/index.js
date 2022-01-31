import { 
    GET_BREEDS,
    GET_BREEDS_DETAILS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENTS, 
    POST_DOG, 
    ORDER_BY_WEIGHT,
    SEARCH_BY_NAME,
    ORDER_BY_ALPHABET
} from "../Actions";

const initialState = {
    Dogs: [],
    DetailsDog: [],
    Temperaments: [],
    FilterDogs:[],
    NotFound: false
}

export default function rootReducer( state = initialState, action) {
    if (action.type === GET_BREEDS) {
        return {
            ...state,
            Dogs: action.payload
        }
    }
    if (action.type === GET_BREEDS_DETAILS) {
        return {
            ...state,
            DetailsDog: action.payload
        }
    }
    if (action.type === GET_TEMPERAMENTS) {
        return {
            ...state,
            Temperaments: action.payload
        }
    }

    if(action.type === FILTER_BY_TEMPERAMENTS) {
        let auxDogs = []

        if (action.payload) {
            auxDogs = state.Dogs.filter(e => {
                if (e.temperaments !== undefined) {
                    return e.temperaments.includes(action.payload);
                }
                return e 
            } )
        } else {
            auxDogs=[...state.Dogs]
        }

        return {
            ...state,
            FilterDogs: auxDogs
        }
    }

    if(action.type === ORDER_BY_WEIGHT) {
        let auxDogs = [...state.Dogs]
        if(action.payload === "-/+") {
            auxDogs.sort((a, b) => {                        
                return parseInt(a.weight) - parseInt(b.weight);
            });
        } 
        if(action.payload === "+/-") {
            auxDogs.sort((a, b) => {                        
                return parseInt(b.weight) - parseInt(a.weight);
            });
        }                     
        return {
            ...state,
            Dogs:auxDogs
        }
    }

    if(action.type === ORDER_BY_ALPHABET) {
        let auxDogs = [...state.Dogs]
        if(action.payload === "A-Z") {
            auxDogs.sort((a, b) => {                        
                if( a.name < b.name ) return -1
                if( a.name > b.name ) return 1
                return 0;
            });
        }
        if(action.payload === "Z-A") {
            auxDogs.sort((a, b) => {                        
                if( a.name > b.name ) return -1
                if( a.name < b.name ) return 1
                return 0;
            });
        }
        return {
            ...state,
            Dogs:auxDogs
        }
    }
    if(action.type === SEARCH_BY_NAME) {
        return {
            ...state,
            Dogs: [...action.payload]
        }
    }
    if(action.type === POST_DOG) {
        return {
            ...state
        }
    }
    return state;
}