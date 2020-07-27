import {COMMON_DATA,PROPERTY_DATA} from './actionTypes'
import axios from 'axios'

export const common = payload => ({
 type: COMMON_DATA ,
 payload 
})

export const propertyData=payload=>({
    type: PROPERTY_DATA,
    payload
})




export const getPropertyData = payload => dispatch =>{
    console.log(payload)
    dispatch(propertyData)
    const newUrl = new URL(window.location.href)
    console.log(newUrl.search)
    var x = "https://ed1cd2945993.ngrok.io/product/filterMyProduct"
    return axios.get(x+newUrl.search)
    .then(res=>res.data)
    .then(res=>dispatch((propertyData(res))))
}

