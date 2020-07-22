import {PROPERTY_DETAILS} from './actionTypes'

const initialState = { primaryData : [] }

const reducerPropertyDetails = (state = initialState, {type, payload}) => {
    switch(type){
        case PROPERTY_DETAILS : 
            return {
                ...state,
                primaryData : payload
            }
        default :
          	return state;
    }
}

export default reducerPropertyDetails