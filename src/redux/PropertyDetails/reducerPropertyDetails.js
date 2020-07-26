import { PROP_DETAILS_FAIL,PROP_DETAILS_START,PROP_DETAILS_SUCCESS} from './actionTypes'


const initialstate = {
    primaryData : {}
}

const reducerPropertyDetails = (state = initialstate, {type,payload}) => {
    switch(type){
        case PROP_DETAILS_START:
            console.log(payload)
            return{
                ...state
            }

        case PROP_DETAILS_SUCCESS:
            console.log(payload)
            return{
                ...state,
                primaryData : payload
            }
        case PROP_DETAILS_FAIL:
            return{
                ...state
            }
        default : 
            return {
                ...state
            }
    }
}

export default reducerPropertyDetails