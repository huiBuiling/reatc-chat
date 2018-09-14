import React,{Component} from 'react';
import { List,Icon,WingBlank } from 'antd-mobile';
import { connect } from 'react-redux'

const Item = List.Item;
const Brief = Item.Brief;
/**
 * 信息列表
 */
@connect(
    state=>state
)
export default class Msg extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    //获取最后一条 createTime
    getLastList = (item)=>{
        return item[item.length - 1];
    }

    render (){
        const currentId = this.props.user._id;
        let { users,chatMsg } = this.props.chat;

        let msgGroup = {};
        //将聊天人信息分组
        chatMsg.forEach(item =>{
            msgGroup[item.chatid] = msgGroup[item.chatid] || [];
            msgGroup[item.chatid].push(item);
        });

        //转为数组
        const chatList = Object.values(msgGroup);

        // console.log(msgGroup)
        return (
            <div className="app-msg">
                <List className="my-list">
                    {chatList.map((item,index) => {
                        let last = this.getLastList(item);
                        let target = last.from === currentId ? last.to : last.from;
                        if(!users[target]){return null;}
                        return (
                            <Item
                                key = {index}
                                arrow="horizontal"
                                thumb={require(`../../../assert/image/avatar/${users[target].avatar}.jpg`)}
                                multipleLine
                                onClick={()=>{}}
                            >
                                {users[target].name}
                                <Brief>{last.content}</Brief>
                            </Item>
                        )})}
                </List>
            </div>
        )
    }
}
