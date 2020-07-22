import {PROPERTY_DETAILS} from './actionTypes';
const initState={
    PropertyData:0
}

export default (state= initState, {type, payload})=>{
    switch (type){
        case PROPERTY_DETAILS :{
            state.PropertyData++
            return{
                ...state
            }
        }
        default: 
            return{
            ...state
            }
    }
}