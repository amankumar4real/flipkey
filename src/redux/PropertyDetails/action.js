import { PROP_DETAILS_FAIL,
    PROP_DETAILS_START,
    PROP_DETAILS_SUCCESS,
    PROP_RECO,
    PROP_BOOKING_START,
    PROP_BOOKING_SUCC,
    PROP_BOOKING_FAIL, 
    CHANGE_START_DATE,
    CHANGE_END_DATE,
    CHANGE_PRICE,
    AVAIL_DATES_FAIL,
    AVAIL_DATES_START,
    AVAIL_DATES_SUCC,
GUEST_DAYS} from './actionTypes'
import axios from 'axios'
import { api_link } from '../link'



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
export const availableDateSuccess = payload => ({
    type: AVAIL_DATES_SUCC,
    payload
})

export const availableDateFail = payload => ({
    type: AVAIL_DATES_FAIL,
    payload
})

export const availableDateStart=payload=>({
    type: AVAIL_DATES_START,
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

export const guestDays = payload => ({
    type: GUEST_DAYS,
    payload
})

//axios call fro entity page
export const afterPropData =(payload) =>dispatch=>{
    console.log(payload)
    var x = api_link+"/product/myData"
    return (
        axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch(propDataSuccess(res)))
    .catch(error=>dispatch(propDataFail(error)))
)
}

//axios call for recommendations in entity page
export const getRecommendations = payload => dispatch =>{
    var x = api_link+"/product/recommendation"
    return axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch((recomData(res))))
}

export const propBookingData = payload => dispatch =>{
    const token = payload.token
    const postData = {
        property_id : payload.property_id,
        from_date :payload.from_date,
        end_date : payload.end_date,
        price: payload.price
    }
    console.log(postData)
    var x = api_link+"/booking/addbooking"
    dispatch(propBookingStart)
    // axios.defaults.headers.common['Authorization'] = token
    return axios.post(x,postData, {
        headers: {
          'Authorization': `Ba#Availabilitysic ${token}` 
        }
      })
    .then(res=>res.data)
    .then(res=>dispatch(propBookingSuccess(res))
    .catch(error=>dispatch(propBookingFail(error))))
}


export const availableDates = payload => dispatch =>{
    console.log(payload)
    dispatch(availableDateStart)
    var x = api_link+"/booking/available"
    console.log(x)
   return axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch(availableDateSuccess(res)))
    .catch(error=>dispatch(availableDateFail(error)))
}


