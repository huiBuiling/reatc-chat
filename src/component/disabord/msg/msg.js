import React,{Component} from 'react';
import { List,Badge } from 'antd-mobile';
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

    //获取最后一条
    getLastList = (item)=>{
        return item[item.length - 1];
    }

    //聊天详情
    handlerRedict = (item)=>{
        this.props.history.push(`/chat/${item}`);
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

        //转为数组并显示排序 createTime
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLastList(a).createTime;
            const b_last = this.getLastList(b).createTime;
            return b_last - a_last;
        });

        return (
            <div className="app-msg">
                <List className="my-list">
                    {chatList.map((item,index) => {
                        let last = this.getLastList(item);
                        let target = last.from === currentId ? last.to : last.from;
                        let unread = item.filter(itemR => !itemR.read && itemR.to == currentId).length;
                        if(!users[target]){return null;}

                        return (
                            <Item
                                key = {index}
                                arrow="horizontal"
                                thumb={require(`../../../assert/image/avatar/${users[target].avatar}.jpg`)}
                                multipleLine
                                onClick={()=>this.handlerRedict(target)}
                                extra={<Badge text={unread} overflowCount={10} />}
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
