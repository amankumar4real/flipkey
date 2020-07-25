import { PROP_DETAILS_FAIL,PROP_DETAILS_START,PROP_DETAILS_SUCCESS} from './actionTypes'
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

export const afterPropData =payload=>dispatch=>{
    dispatch(propDataStart)
    const newUrl = new URL(window.location.href)
    var x = ""
    return axios.post(x+newUrl.search)
    .then(res=>res.data)
    .then(res=>dispatch(propDataSuccess(res)))
    .catch(error=>dispatch(propDataFail(error)))
}
