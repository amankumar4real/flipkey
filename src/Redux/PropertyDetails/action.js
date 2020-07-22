import { PROPERTY_DETAILS} from './actionTypes'

const propertyDetails=payload=>{
    return {
        type:PROPERTY_DETAILS,
        payload
    }
}