import React,{Component} from 'react';
import { Button,WingBlank, WhiteSpace, List, InputItem, Radio } from 'antd-mobile'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from "../../redux/user.redux";

import Logo from '../../component/logo/logo'

//注册
//装饰器
@connect(
    state=>state.user,
    { register }
)
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:'',
            repeatPwd:'',
            type:'genius'
        }
        this.register = this.register.bind(this)
    }

    //值改变
    handlerChange = (key, val)=>{
        this.setState({
            [key]:val
        });
    }

    //注册
    register = ()=>{
        //调用装饰器定义的register
        this.props.register(this.state);
    }

    componentDidMount(){
        // console.log(this.props);
    }

    render (){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo />
                <h2 align="center">注册</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>{this.handlerChange('user',v)}}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v=>{this.handlerChange('pwd',v)}}
                            type="password"
                        >密码</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v=>{this.handlerChange('repeatPwd',v)}}
                            type="password"
                        >确认密码</InputItem>
                        <RadioItem checked={this.state.type==='genius'} onChange={()=>this.handlerChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type==='boss'} onChange={()=>this.handlerChange('type','boss')}>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" size='small' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>

        )
    }
}
export default Register