import React,{Component} from 'react';
import { Button,WingBlank, WhiteSpace, List, InputItem } from 'antd-mobile'

import Logo from '../../component/logo/logo'

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.register = this.register.bind(this);
    }

    register = ()=>{
        this.props.history.push('/register')  //注册
    }

    handlerChange = (key, val)=>{
        this.setState({
            [key]:val
        });
    }

    render (){
        return (
            <div>
                <Logo />
                <h2 align="center">登录</h2>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>{this.handlerChange('user',v)}}
                            onErrorClick={()=>{console.log('aaaaaaaaa')}}
                            onExtraClick={()=>{console.log('aaaaaaaaa')}}
                            onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        {/*<InputItem onChange={v=>{this.handlerChange('pwd',v)}}>密码</InputItem>*/}
                    </List>
                    <WhiteSpace />
                    <Button type="primary" size='small'>登录</Button>
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