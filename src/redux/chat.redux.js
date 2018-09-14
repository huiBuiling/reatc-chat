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
                //过滤消息： 当前发送目标是当前登录人
                unread:action.payload.msgs.filter(item => !item.read && item.to === action.payload.userid).length,
                users:action.payload.users
            }
        case MSG_RECV:  
            return {
                ...state,
                chatMsg:[...state.chatMsg,action.payload.msg],
                //判断是否是当前登录人，不是则加1
                unread:action.payload.msg.from === action.payload.userid ? state.unread : state.unread + 1
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
export function msgList(msgs,users,userid){
    return {type:MSG_LIST, payload:{msgs,users,userid}}
}

export function msgRecv(msg,userid){
    return {type:MSG_RECV, payload:{msg,userid}}
}

//获取用户列表请求
export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/getMsgList').then(res=>{
            if(res.status === 200 && res.data.code === 0 ){
                const userid = getState().user._id;
                // console.log(getState());
                dispatch(msgList(res.data.msgs, res.data.users,userid));
            }
        })
    }
}

//进到应用后监听收到数据
export function recvMsg(){
    return (dispatch, getState) =>{
        socket.on('receiveMsg',function(data){
            console.log('receiveMsg: ' + data)
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        });
    }
}

//监听发送消息数据
export function sendMsg({from, to, msg}){
    return dispatch =>{
        socket.emit('sendMsg',{from, to, msg});
    }
}