const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// auth.redecer
export const auth = (
    state={ isAuth: false, user:'admin'},
    action)=>{
    console.log(state)
    switch (action.type){
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
        default:
            return state
    }
}

// auth.action
export const login = ()=>{
    return {type:LOGIN}
}

export const loginOut = ()=>{
    return {type:LOGOUT}
}
