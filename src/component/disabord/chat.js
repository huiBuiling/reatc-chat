import React, {Component} from 'react';
import {Icon, InputItem, List, NavBar,Grid} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getMsgList, recvMsg, sendMsg} from '../../redux/chat.redux'
import {getChatId} from "../../util/util";

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
            text:'',
            showEmoj:false,
            height:'45px'
        }
    }

    componentDidMount(){
       //发起连接
       /*socket.on('receiveMsg',(data)=>{
            //接收的全局消息
            this.setState({ msg:[...this.state.msg,data.text] })
        })*/
       //判断是否已有信息
       if(!this.props.chat.chatMsg.length) {
           this.props.getMsgList();
           this.props.recvMsg();
       }

       this.fixCarousel();
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

    fixCarousel = ()=>{
        //使用宫格轮播显示bug解决
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        },0);
    }

    //emoj显示开关
    showEmojs = ()=>{
        let {showEmoj, height} = this.state;
        if(showEmoj){
            height = '45px';
        }else{
            height = '127px';
        }
        this.setState({showEmoj:!showEmoj,height});
        this.fixCarousel();
    }

    render (){
        const userid = this.props.match.params.user;
        let {users, chatMsg} = this.props.chat;

        const chatid = getChatId(userid, this.props.user._id);
        chatMsg = chatMsg.filter(item =>item.chatid === chatid);

        if(!users[userid]){
            return null;
        }

        const emoj = '😁 😂 😅 😆 😉 😊 😋 😎 😍 😍 😘 😗 😚 ☺ 😣 😥 😣 😪 😫 😌 😜 😝 😒 😓 😔 😲 😢 😇 😷 😠 😇 👻 💩 👦 👧 👨 👩 👴 👵 👋 💋 ☂️'
                .split(' ')
                // .filter(item => item === item)
                .map(item => ({text:item}));

        return (
            <div className="app-chat">
                <NavBar mode="dark"
                  icon={<Icon type="left" />}
                  onLeftClick={this.redirect}
                  rightContent={<Icon key="1" type="ellipsis" />}
                >{users[userid].name}</NavBar>

                {/*style={{height:this.refs.inputs.clientHeight}}*/}

                <div className="app-chat-con" style={{marginBottom:this.state.height}}>
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
                        extra={
                            <div style={{lineHeight:'45px'}}>
                                <span className="app-chat-emoj" onClick={this.showEmojs}>😄</span>
                                <span onClick={this.handlerSubmit}>发送</span>
                            </div>}
                    ></InputItem>

                    {this.state.showEmoj ?
                        <Grid
                            data={emoj}
                            activeStyle={false}
                            columnNum={10}
                            isCarousel={true}
                            carouselMaxRow={2}
                            hasLine={false}
                            onClick={(el, index)=>{this.setState({
                                text:this.state.text + el.text
                            })}}
                        /> : null}
                </List>
            </div>

        )
    }
}
