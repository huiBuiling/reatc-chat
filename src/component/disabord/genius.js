import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux'
import { getUserList } from "../../redux/chat.redux";

@connect(
    state=>state.chatUser,
    { getUserList }
)
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

    render (){
        const geniusData = this.props.userList ? this.props.userList : this.state.bossData
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {geniusData.map(item =>{
                        return (item.avatar ? <Card className="app-card" key={item.user}>
                            <Card.Header
                                title={item.user}
                                thumb={require(`../../assert/image/avatar/${item.avatar}.jpg`)}
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
