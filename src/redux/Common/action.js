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

    return axios.get("https://0e0c54c7cca6.ngrok.io/product/fetchProducts")
    .then(res=>res.data)
    .then(res=>dispatch((propertyData(res))))
}