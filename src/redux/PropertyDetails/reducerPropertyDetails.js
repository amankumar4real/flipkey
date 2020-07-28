import {
    PROP_DETAILS_FAIL, PROP_DETAILS_START, PROP_DETAILS_SUCCESS, PROP_RECO, PROP_BOOKING_START,
    PROP_BOOKING_SUCC,
    PROP_BOOKING_FAIL,
    CHANGE_VAL,
    CHANGE_END_DATE,
    CHANGE_START_DATE, CHANGE_PRICE
} from './actionTypes'
import { CHANGE_TYPE } from '../Auth/actionTypes'



const initialstate = {
    startDate : "",
    endDate :  "",
    price : "",
    primaryData: {},
    recomDetails: {},
    bookingDetails: {}
}

const reducerPropertyDetails = (state = initialstate, { type, payload }) => {
    switch (type) {
        case PROP_DETAILS_START:
            console.log(payload)
            return {
                ...state
            }

        case PROP_DETAILS_SUCCESS:
            console.log(payload)
            return {
                ...state,
                primaryData: payload
            }
        case PROP_DETAILS_FAIL:
            return {
                ...state
            }
        case PROP_RECO:
            console.log(payload)
            return {
                ...state,
                recomDetails: payload
            }
        case PROP_BOOKING_START:
            console.log(payload)
            return {
                ...state
            }

        case PROP_BOOKING_SUCC:
            console.log(payload)
            return {
                ...state,
                bookingDetails: payload
            }
        case PROP_BOOKING_FAIL:
            return {
                ...state
            }
        case CHANGE_START_DATE:
            console.log(payload)
            return {
                ...state,
                startDate: payload
            }
        case CHANGE_END_DATE:
            console.log(payload)
            return {
                ...state,
                endDate: payload
            }
        case CHANGE_PRICE:
            console.log(payload)
            return {
                ...state,
                price: payload
            }
        default:
            return {
                ...state
            }
    }
}

export default reducerPropertyDetails