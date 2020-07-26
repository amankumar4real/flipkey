import { 
        REG_START,
        REG_FAIL,
        REG_SUCC, 
        POST_USER_DATA,
        LOGIN_SUCCESS, 
        LOGIN_FAIL, 
        CHANGE_TYPE,
        GAUTH_FAIL,
        GAUTH_START,
        GAUTH_SUCC,
        FAUTH_FAIL,
        FAUTH_START,
        FAUTH_SUCC
    } from './actionTypes'
import axios from 'axios';


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

export const gAuthStart =payload =>({
    type:GAUTH_START,
    payload
});
export const gAuthSuccess=payload=>({
    type: GAUTH_SUCC,
    payload
});
export const gAuthFail=payload=>({
    type: GAUTH_FAIL,
    payload
});

export const fAuthStart =payload =>({
    type:FAUTH_START,
    payload
});
export const fAuthSuccess=payload=>({
    type: FAUTH_SUCC,
    payload
});
export const fAuthFail=payload=>({
    type: FAUTH_FAIL,
    payload
});

// axios for Register
export const postReg=payload=>dispatch=>{
    console.log('regi data')
    console.log(payload)
    dispatch(regStart)
    return axios.post('https://f0c8e4890266.ngrok.io/user/register', payload)
    .then(res=>res.data)
    .then(res=>dispatch(regSucc(res)))
    .catch(error=>dispatch(regFail(error)))
}

// axios for login
export const postLogin=payload=> dispatch =>{
    console.log(payload)
    dispatch(PostUserData)

    return axios.post("https://f0c8e4890266.ngrok.io/user/login", payload)
    .then(res=>res.data)
    .then(res=>dispatch(logSucc(res)))
    .catch(error=>dispatch(logFail(error)))
}

// axios for auth

export const afterAuth =payload=> dispatch =>{
    console.log(payload)
    dispatch(gAuthStart)

    return axios.post("https://f0c8e4890266.ngrok.io/user/google_auth", payload)
    .then(res=>res.data)
    .then(res=>dispatch((gAuthSuccess(res))))
    .catch(error=>dispatch(gAuthFail(error)))
}
