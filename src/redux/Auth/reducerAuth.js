import { 
        USER_VALIDATION,  
        CHANGE_TYPE,
        LOGIN_FAIL,
        LOGIN_SUCCESS,
        POST_USER_DATA,
        REG_START,
        REG_SUCC,
        REG_FAIL
     } from './actionTypes'

const initialState = { 
    primaryData : [{ data:"data" }],
    reg_type: 'owner',
    login_type: 'owner',
    token:''
}

const reducerAuth = (state = initialState, {type, payload}) => {
    switch(type){
        case USER_VALIDATION : {
            console.log('login')
            console.log(payload)
            return {
                ...state,
                primaryData : payload
            }
        }
        case POST_USER_DATA:{
            return{
                ...state
            }
        }
        case LOGIN_SUCCESS:
            console.log(payload)
            console.log(payload.token)
            return{
                ...state,
                token: payload.token
            }
        case LOGIN_FAIL:
            console.log(payload)
            return{
                ...state
        }
        case CHANGE_TYPE:{
            console.log('type form navBar')
            // if(payload!== state.reg_type && payload !== state.login_type){
            //     state.login_type='owner';
            //     state.reg_type='owner';

            // }else if(payload===state.reg_type && payload === state.login_type){
            //     state.login_type='user';
            //     state.reg_type='user';
            // }
            // console.log(payload)
            // console.log(state)
            return{
                    ...state, 
                    login_type:payload,
                    reg_type:payload
            }
        }
        case REG_START:
            return{
                ...state
            }
        case REG_SUCC:
            console.log('regSuccess')
            console.log(payload)
            return{
                ...state
            }
        case REG_FAIL:
            console.log('reg fail')
            console.log(payload)
            return{
                ...state
            }
        default :
          	return state;
    }
}
export default reducerAuth