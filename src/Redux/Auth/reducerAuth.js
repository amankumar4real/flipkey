import {USER_VALIDATION} from './actionTypes'

const initState= {
    isAuth:false,
    token:'',
    isLoading:'',
    users:[
        {user:'user', pswd:'user'}
    ]
}

const reducerAuth=(state=initState, {type, payload})=>{
    switch (type){
        case USER_VALIDATION:{
            let users= state.users
            // check user vlidation
            users.forEach(user=>{
                if(user.user === payload.username && user.pswd === payload.password){
                    state.isAuth=true
                } 
            })
            return {
                ...state
            }
        }
        default:{
            return{
                ...state
            }
        }
    }
}

export default reducerAuth