import axios from 'axios'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

// auth.reducer`
const initState = {
    isAuth: false,
    name:'admin',
    age:20
}
export const auth = (state=initState, action)=>{
    // console.log(state)
    switch (action.type){
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
        case USER_DATA:
            return {...state,
                user:action.payload.name,
                age:action.payload.age
            }
        default:
            return state
    }
}

// auth.action
export const getUserData = ()=>{  //获取数据
    //dispatch 用来通知数据修改
    return dispatch=>{
        axios.get('/data').then(res=>{
            if(res.status == 200){
                dispatch(userData(res.data))
                // console.log(res.data)
            }
        })
    }
}

export const userData = (data) =>{
    return {type:USER_DATA,payload:data}
}

export const login = ()=>{
    return {type:LOGIN}
}

export const loginOut = ()=>{
    return {type:LOGOUT}
}
