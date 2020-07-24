import {COMMON_DATA,PROPERTY_DATA} from './actionTypes'


const initialstate = {
    type_search :"Home",
    url : "",
    primaryData : []
}

const reducerCommon = (state = initialstate, {type,payload}) => {
    // return {
    //     ...state
    // }
    switch(type){
        case COMMON_DATA : 
            return {
                ...state,
                primaryData : payload
            }
        case PROPERTY_DATA :
            console.log(payload)
            return {
                ...state,
                primaryData : payload
            }
        default :
          	return state;
    }

}

export default reducerCommon