import { 
        CHANGE_TYPE,
        LOGIN_FAIL,
        LOGIN_SUCCESS,
        POST_USER_DATA,
        REG_START,
        REG_SUCC,
        REG_FAIL,
        GAUTH_FAIL,
        GAUTH_START,
        GAUTH_SUCC,
        FAUTH_FAIL,
        FAUTH_START,
        FAUTH_SUCC
     } from './actionTypes'

const initialState = { 
    primaryData : [{ data:"data" }],
    reg_type: 'owner',
    login_type: 'owner',
    token:''
}

const reducerAuth = (state = initialState, {type, payload}) => {
    switch(type){

        case POST_USER_DATA:
            return{
                ...state
            }

        case LOGIN_SUCCESS:
            console.log(payload)
            return{
                ...state,
                token: payload.token
            }

        case LOGIN_FAIL:
            console.log(payload)
            return{
                ...state
        }

        case CHANGE_TYPE:
            console.log('navBar type')
            console.log(payload)
            return{
                ...state, 
                login_type:payload,
                reg_type:payload
            }
        
        case REG_START:
            return{
                ...state
            }

        case REG_SUCC:
            console.log(payload)
            return{
                ...state
            }

        case REG_FAIL:
            console.log(payload)
            return{
                ...state
            }
        case GAUTH_START:
            return{
                ...state,
            }

        case GAUTH_SUCC:
            console.log(payload)
            return{
                ...state,
                token:payload.token
            }

        case GAUTH_FAIL:
            console.log(payload)
            return{
                ...state, 
            }
        
        case FAUTH_SUCC:

            return{
                ...state
            }

        case FAUTH_FAIL:
            return{
                ...state
            }

        case FAUTH_START:
            return{
                ...state
            }

        default :
          	return state;
    }
}

export default reducerAuth