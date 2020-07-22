import { COMMON_DATA } from './actionTypes'

const initialState = { primaryData : [] }

const commonData = (state = initialState, {type, payload}) => {
    switch(type){
        case COMMON_DATA : 
            return {
                ...state,
                primaryData : payload
            }
        default :
          	return state;
    }
}

export default commonData