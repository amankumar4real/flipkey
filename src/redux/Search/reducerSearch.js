import { SEARCH_TYPE } from './actionTypes'

const initialState = { primaryData : [] }
const reducerSearch = (state = initialState, {type, payload}) => {
    switch(type){
        case SEARCH_TYPE : 
            return {
                ...state,
                primaryData : payload
            }
        default :
          	return state;
    }
}

export default reducerSearch    