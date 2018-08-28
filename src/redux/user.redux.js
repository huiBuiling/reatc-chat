import axios from 'axios'
import getRedirectPath from '../util/util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

//用户信息
const initState = {
    redirectTo:'',
    isAuth:false,  //是否登录
    msg:'',        //登录验证信息
    user:'',
    pwd:'',
    type:''
}
//reducer
export function user(state=initState, action){
    switch (action.type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg:'',
                redirectTo:getRedirectPath(action.payload),
                isAuth:true,
                ...action.payload  //帐号数据
            }
        case ERROR_MSG:
            return {
                ...state,
                isAuth:false,
                msg:action.msg
            }
        default:
            return state
    }
}

//action
export function registerSuccess(data){
    return {type:REGISTER_SUCCESS, payload:data}
}

export function errorMsg(msg){
    return { msg, type:ERROR_MSG}
}

export function register({user, pwd, repeatPwd, type}){
    if(!user || !pwd || !repeatPwd){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatPwd){
        return errorMsg('密码和确认密码不一致')
    }
    return dispatch=>{
        //注册请求
        axios.post('/user/register',{user, pwd, type}).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(registerSuccess({user, pwd, type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
