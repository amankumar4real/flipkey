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

    return axios.get("https://29be48647e3d.ngrok.io/product/fetchProducts")
    .then(res=>res.data)
    .then(res=>dispatch((propertyData(res))))
}