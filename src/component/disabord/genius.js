import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import axios from 'axios';

export default class Genius extends Component{
    constructor(props){
        super(props);
        this.state={
            geniusData:[]
        }
    }

    componentDidMount(){
        axios.get('/user/list?type=genius').then(res=>{
            if(res.data.code == 0 ){
                console.log(res.data.data)
                this.setState({
                    geniusData:res.data.data
                })
            }
        })
    }

    render (){
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    {this.state.geniusData.map(item =>{
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
