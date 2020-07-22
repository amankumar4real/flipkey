import { USER_VALIDATION } from './actionTypes'

const initialState = { primaryData : [{ data:"data" }] }

const reducerAuth = (state = initialState, {type, payload}) => {
    switch(type){
        case USER_VALIDATION : 
            return {
                ...state,
                primaryData : payload
            }
        default :
          	return state;
    }
}
export default reducerAuth