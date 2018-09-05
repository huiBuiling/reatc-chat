import React,{Component} from 'react';
import { Button,WingBlank, WhiteSpace, List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';

import Form from '../HOComponent/HOComponentForm'
//登录
@connect(
    state=>state.user,
    { login }
)
@Form
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            // user:'',
            // pwd:''
        }
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    //登录
    login = ()=>{
        this.props.login(this.props.data);
    }

    //跳转注册页
    register = ()=>{
        this.props.history.push('/register')  //注册
    }

    componentDidMount(){
        /*if(this.props.msg){
            Toast.info(this.props.msg, 200, null, false);
        }*/
    }

    render (){
        const { handlerChange } = this.props;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo />
                <h2 align="center">登录</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>{handlerChange('user',v)}}
                            // onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v=>{handlerChange('pwd',v)}}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" size='small' onClick={this.login}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" size='small'
                            onClick={this.register}
                    >注册</Button>
                </WingBlank>
            </div>

        )
    }
}
export default Login