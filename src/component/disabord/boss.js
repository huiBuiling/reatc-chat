import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import axios from 'axios';

export default class Boss extends Component{
    constructor(props){
        super(props);
        this.state={
            bossData:[]
        }
    }

    componentDidMount(){
        axios.get('/user/list?type=boss').then(res=>{
            if(res.data.code == 0 ){
                console.log(res.data.data)
                this.setState({
                    bossData:res.data.data
                })
            }
        })
    }

    render (){
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.bossData.map(item =>{
                        return (item.avatar ? <Card className="app-card" key={item.user}>
                                <Card.Header
                                    title={item.user}
                                    thumb={require(`../../assert/image/avatar/${item.avatar}.jpg`)}
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
