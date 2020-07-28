import { PROP_DETAILS_FAIL,PROP_DETAILS_START,PROP_DETAILS_SUCCESS, PROP_RECO} from './actionTypes'
import { PROPERTY_DATA } from '../Common/actionTypes'
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


export const recomData = payload => ({
    type : PROP_RECO,
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


