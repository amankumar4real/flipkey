import { PROP_DETAILS_FAIL,
    PROP_DETAILS_START,
    PROP_DETAILS_SUCCESS,
    PROP_RECO,
    PROP_BOOKING_START,
    PROP_BOOKING_SUCC,
    PROP_BOOKING_FAIL, 
    CHANGE_START_DATE,
    CHANGE_END_DATE,
    CHANGE_PRICE} from './actionTypes'
import axios from 'axios'



export const propDataStart=payload=>({
    type: PROP_DETAILS_START,
    payload
})
export const propDataSuccess = payload => ({
    type: PROP_DETAILS_SUCCESS,
    payload
})

export const propDataFail = payload => ({
    type: PROP_DETAILS_FAIL,
    payload
})

export const propBookingStart=payload=>({
    type: PROP_BOOKING_START,
    payload
})
export const propBookingSuccess = payload => ({
    type: PROP_BOOKING_SUCC,
    payload
})

export const propBookingFail = payload => ({
    type: PROP_BOOKING_FAIL,
    payload
})


export const recomData = payload => ({
    type : PROP_RECO,
    payload
})


export const changeStartDate = payload => ({
    type : CHANGE_START_DATE,
    payload
})
export const changeEndDate = payload => ({
    type : CHANGE_END_DATE,
    payload
})
export const changePrice = payload => ({
    type : CHANGE_PRICE,
    payload
})

//axios call fro entity page
export const afterPropData =(payload) =>dispatch=>{
    console.log(payload)
    var x = "https://b3a045ce175a.ngrok.io/product/myData"
    return (
        axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch(propDataSuccess(res)))
    .catch(error=>dispatch(propDataFail(error)))
)
}

//axios call for recommendations in entity page
export const getRecommendations = payload => dispatch =>{
    var x = "https://b3a045ce175a.ngrok.io/product/recommendation"
    return axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch((recomData(res))))
}

export const propBookingData = payload => dispatch =>{
    var x = "https://b3a045ce175a.ngrok.io/booking/addbooking"
    dispatch(propBookingStart)
    return axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch(propBookingSuccess(res))
    .catch(error=>dispatch(propBookingFail(error))))
}


