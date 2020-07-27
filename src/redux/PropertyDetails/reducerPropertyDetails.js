import { PROP_DETAILS_FAIL,PROP_DETAILS_START,PROP_DETAILS_SUCCESS,PROP_RECO} from './actionTypes'
import { recomData } from './action'


const initialstate = {
    primaryData : {},
    recomDetails : {}
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
        case PROP_RECO:
            console.log(payload)
            return{
                ...state,
                recomDetails : payload
            }
        default : 
            return {
                ...state
            }
    }
}

export default reducerPropertyDetails