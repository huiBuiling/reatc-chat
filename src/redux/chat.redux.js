import axios from 'axios'
import io from 'socket.io-client'
//连接5203 node配置的端口
const socket = io('ws://localhost:5204');

const MSG_LIST = 'MSG_LIST';   //获取聊天列表
const MSG_RECV = 'MSG_RECV';   //读取信息
const MSG_READ = 'MSG_READ';   //标识已读

//聊天信息
const initState = {
    chatMsg:[],  //聊天信息
    unread:0,  //未读信息列表
    users:{}  //用户
}
//reducer
export function chat(state=initState, action){
    switch (action.type){
        case MSG_LIST:
            return {
                ...state,
                chatMsg:action.payload.msgs,
                unread:action.payload.msgs.filter(item => !item.read).length,
                users:action.payload.users
            }
        case MSG_RECV:  
            return {
                ...state,
                chatMsg:[...state.chatMsg,action.payload],
                unread:state.unread + 1
            }
        case MSG_READ:  
            return {
                ...state,
            }
        default:
            return state
    }
}

//action
export function msgList(msgs,users){
    return {type:MSG_LIST, payload:{msgs,users}}
}

export function msgRecv(msg){
    return {type:MSG_RECV, payload:msg}
}

//获取用户列表请求
export function getMsgList() {
    return dispatch=>{
        axios.get('/user/getMsgList').then(res=>{
            if(res.status === 200 && res.data.code === 0 ){
                dispatch(msgList(res.data.msgs, res.data.users));
            }
        })
    }
}

//发送消息数据
export function sendMsg({from, to, msg}){
    return dispatch =>{
        socket.emit('sendMsg',{from, to, msg});
    }
}

//进到应用后监听数据
export function recvMsg(data){
    return dispatch =>{
        socket.on('receiveMsg',function(data){
            console.log('receiveMsg: ' + data)
            dispatch(msgRecv(data));
        });
    }
}