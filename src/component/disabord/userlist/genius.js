import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux'
import { getUserList } from "../../../redux/chat.user.redux";

@connect(
    state=>state.chatUser,
    { getUserList }
)
/**
 * genius 列表
 */
export default class Genius extends Component{
    constructor(props){
        super(props);
        this.state={
            geniusData:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('genius');
    }

    //跳转到对应聊天人（boss）
    handlerRedict(item){
        this.props.history.push(`/chat/${item}`)
    }

    render (){
        const geniusData = this.props.userList ? this.props.userList : this.state.geniusData
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {geniusData.map(item =>{
                        return (item.avatar ? <Card className="app-card" key={item.user} onClick={()=>this.handlerRedict(item._id)}>
                            <Card.Header
                                title={item.user}
                                thumb={require(`../../../assert/image/avatar/${item.avatar}.jpg`)}
                                extra={<span>{item.title}</span>}
                            />
                            <Card.Body>
                                <div>
                                    超能力：
                                    {item.desc.split('\n').map(itemD=>(
                                        <p key={itemD}>{itemD}</p>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card> : null
                        )
                    })}
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>

        )
    }
}
