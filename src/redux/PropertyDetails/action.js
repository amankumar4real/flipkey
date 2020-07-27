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

export const afterPropData =(payload) =>dispatch=>{
    console.log(payload)
    var x = "https://cf059a80cd74.ngrok.io/product/myData"
    return (
        axios.post(x,payload)
    .then(res=>res.data)
    .then(res=>dispatch(propDataSuccess(res)))
    .catch(error=>dispatch(propDataFail(error)))
)
}

// async function getData() {
//     try {
//         var ip = location.host;
//         await axios({
//             url: http() + ip + '/getData',
//             method: 'POST',
//             timeout: 8000,
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         }).then(function (res) {
//             console.dir(res); // we are good here, the res has the JSON data
//             return res; 
//         }).catch(function (err) {
//             console.error(err);
//         })
//     }
//     catch (err) {
//         console.error(err);
//     }
// }
