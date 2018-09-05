import axios from 'axios'
import getRedirectPath from '../util/util'

const USER_LIST = 'USER_LIST';

//用户聊天信息
const initState = {
    userList:[]
}
//reducer
export function chatUser(state=initState, action){
    switch (action.type){
        case USER_LIST:  //更新
            return {
                ...state,
                userList:action.payload
            }
        default:
            return state
    }
}

//action
export function userList(data){
    return {type:USER_LIST, payload:data}
}

//获取用户列表请求
export function getUserList(type) {
    return dispatch=>{
        axios.get('/user/list?type=' + type).then(res=>{
            if(res.status === 200 && res.data.code == 0 ){
                dispatch(userList(res.data.data));
            }
        })
    }
}