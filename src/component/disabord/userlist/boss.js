import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
 // import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUserList } from "../../../redux/chat.user.redux";

// @withRouter
@connect(
    state=>state.chatUser,
    { getUserList }
)
/**
 * boss 列表
 */
export default class Boss extends Component{
    constructor(props){
        super(props);
        this.state={
            bossData:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('boss');
    }

    //跳转到对应聊天人（genius）
    handlerRedict = (item)=>{
        this.props.history.push(`/chat/${item}`)
    }

    render (){
        const bossData = this.props.userList ? this.props.userList : this.state.bossData
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {bossData.map(item =>{
                        return (item.avatar ? 
                            <Card className="app-card" key={item.user} onClick={()=>this.handlerRedict(item._id)}>
                                <Card.Header
                                    title={item.user}
                                    thumb={require(`../../../assert/image/avatar/${item.avatar}.jpg`)}
                                    extra={<span>{item.title}</span>}
                                />
                                <Card.Body>
                                    <div>
                                        <h5>公司:{item.company}<span>{item.money}</span></h5>
                                        {item.desc.split('\n').map(itemD=>{return <p key={itemD}>{itemD}；</p>})}
                                    </div>
                                </Card.Body>
                            </Card> : null
                        )
                    })}
                </WingBlank>
            </div>

        )
    }
}
