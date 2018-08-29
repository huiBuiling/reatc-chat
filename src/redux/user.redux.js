import axios from 'axios'
import getRedirectPath from '../util/util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

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
        case LOGIN_SUCCESS:  //登录
            return {
                ...state,
                msg:'',
                redirectTo:getRedirectPath(action.payload),
                isAuth:true,
                ...action.payload  //帐号数据
            }
        case REGISTER_SUCCESS:  //注册
            return {
                ...state,
                msg:'',
                redirectTo:getRedirectPath(action.payload),
                isAuth:true,
                ...action.payload  //帐号数据
            }
        case LOAD_DATA:  //登录后获取用户信息
            return {
                ...state,
                ...action.payload  //帐号数据
            }
        case ERROR_MSG:  //错误信息
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
//登录回调
export function loginSuccess(data){
    return {type:LOGIN_SUCCESS, payload:data}
}

//注册回调
export function registerSuccess(data){
    return {type:REGISTER_SUCCESS, payload:data}
}

//错误信息
export function errorMsg(msg){
    return { msg, type:ERROR_MSG}
}

//登录成功用户信息回调
export function loadData(userinfo){
    return {type:LOAD_DATA, payload:userinfo}
}

//登录请求
export function login({user, pwd}) {
    if(!user){
        return errorMsg('请输入用户名')
    }
    if(!pwd){
        return errorMsg('请输入密码')
    }
    if(!user || !pwd){
        return errorMsg('请输入用户名和密码')
    }

    return dispatch=>{
        axios.post('/user/login',{user, pwd}).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(loginSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

//注册请求
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
