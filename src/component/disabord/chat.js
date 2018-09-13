import React, {Component} from 'react';
import {Icon, InputItem, List, NavBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMsgList, recvMsg, sendMsg} from '../../redux/chat.redux'
import img from '../../assert/image/avatar/boy5.jpg'
import img2 from '../../assert/image/avatar/girl3.jpg'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:5203');
/**
 * 聊天信息
 */
@withRouter
@connect(
    state=>state,
    { getMsgList,sendMsg,recvMsg }
)
export default class Chat extends Component{
    constructor(props){
        super(props);
        
        this.state={
            text:''
        }
        
    }

    componentDidMount(){
       //发起连接
       /*socket.on('receiveMsg',(data)=>{
            //接收的全局消息
            this.setState({
                msg:[...this.state.msg,data.text]
            })
        })*/
       //判断是否已有信息
       if(!this.props.chat.chatMsg.length) {
           this.props.getMsgList();
           this.props.recvMsg();
       }
    }

    //发送消息
    handlerSubmit = ()=>{
        // socket.emit('sendMsg',{text:this.state.text});
        
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});

        this.setState({ text:'' });
    }

    //返回
    redirect = ()=>{
        // let path = this.props.user.type;
        // this.props.history.push("/" + path);
        this.props.history.goBack();
    }

    render (){
        const userid = this.props.match.params.user;
        const {users, chatMsg} = this.props.chat;

        if(!users[userid]){
            return null;
        }
        return (
            <div className="app-chat">
                <NavBar mode="dark"
                  icon={<Icon type="left" />}
                  onLeftClick={this.redirect}
                  rightContent={<Icon key="1" type="ellipsis" />}
                >{users[userid].name}</NavBar>

                <div className="app-chat-con">
                    {chatMsg.map((item, index) =>{
                        if(item.from === userid){
                            return (
                                <div className="app-chat-con-list" key={index}>
                                    {/*<span>对方</span>*/}
                                    <img src={require(`../../assert/image/avatar/${users[item.from].avatar}.jpg`)} alt=""/>
                                    <div key={index} className="app-chat-msg">
                                        <span className="msg">{item.content}</span>
                                    </div>
                                </div>
                                )
                        }else{
                            return (
                                <div className="app-chat-con-list app-chat-con-list2" key={index}>
                                    <div key={index} className="app-chat-msg app-chat-msg2">
                                        <span className="msg">{item.content}</span>
                                    </div>
                                    {/*<img src={img2} alt="" />*/}
                                    <img src={require(`../../assert/image/avatar/${users[item.from].avatar}.jpg`)} alt=""/>
                                    {/*<span>me</span>*/}
                                </div>
                                )
                        }
                    })}
                </div>

                <List className="app-chat-input">
                    <InputItem 
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={item=>{
                            this.setState({text:item})
                        }}
                        extra={<span onClick={this.handlerSubmit}>发送</span>}
                    ></InputItem>
                </List>
            </div>

        )
    }
}
