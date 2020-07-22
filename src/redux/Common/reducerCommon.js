import { COMMON_DATA } from './actionTypes'

const initialState = { primaryData : [{ data:"data1" }] }

const reducerCommon = (state = initialState, {type, payload}) => {
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

export default reducerCommon