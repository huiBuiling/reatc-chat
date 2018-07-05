import React,{Component} from 'react';
import { Button,WingBlank, WhiteSpace, List, InputItem, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from "../../redux/user.redux";

import Logo from '../../component/logo/logo'

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

    handlerChange = (key, val)=>{
        this.setState({
            [key]:val
        });
    }

    register = ()=>{
        this.props.register(this.state);
    }

    render (){
        const RadioItem = Radio.RadioItem;
        console.log(this.props.msg)
        return (
            <div>
                <Logo />
                <h2 align="center">注册</h2>
                <WingBlank>
                    {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                    <List>
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
                    <Button type="primary" size='small'
                            onClick={this.register}
                    >注册</Button>
                </WingBlank>
            </div>

        )
    }
}
export default Register