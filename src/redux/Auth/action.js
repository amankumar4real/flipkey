import { 
        USER_VALIDATION,
        REG_START,
        REG_FAIL,
        REG_SUCC, 
        POST_USER_DATA,
        LOGIN_SUCCESS, 
        LOGIN_FAIL, 
        CHANGE_TYPE
    } from './actionTypes'
import axios from 'axios';

export const userValidation = payload => ({
    type: USER_VALIDATION,
    payload
}); 
export const changeType=payload=>({
    type:CHANGE_TYPE,
    payload
})

export const regStart=payload=>({
    type: REG_START,
    payload
})
export const regSucc = payload => ({
    type: REG_SUCC,
    payload
})

export const regFail = payload => ({
    type: REG_FAIL,
    payload
})


export const PostUserData=payload=>({
    type:POST_USER_DATA,
    payload
});
export const logSucc=payload=>({
    type: LOGIN_SUCCESS,
    payload
});
export const logFail=payload=>({
    type: LOGIN_FAIL,
    payload
});

// axios for Register
export const posReg=payload=>dispatch=>{
    console.log('regi data')
    console.log(payload)
    dispatch(regStart)
    return axios.post('https://509a48b41886.ngrok.io/user/register', payload)
    .then(res=>res.data)
    .then(res=>dispatch(regSucc(res)))
    .catch(error=>dispatch(regFail(error)))
}

// axios for login
export const postLogin=payload=> dispatch =>{
    console.log(payload)
    dispatch(PostUserData)

    return axios.post("https://509a48b41886.ngrok.io/user/login", payload)
    .then(res=>res.data)
    .then(res=>dispatch(logSucc(res)))
    .catch(error=>dispatch(logFail(error)))
}