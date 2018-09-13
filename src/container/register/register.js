import React,{Component} from 'react';
import { Button,WingBlank, WhiteSpace, List, InputItem, Radio } from 'antd-mobile'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from "../../redux/user.redux";
import Logo from '../../component/logo/logo'

import Form from '../HOComponent/HOComponentForm'

//属性代理
/*import WrapperHello from '../HOComponent/HOrComponentPropertyBroke'
@WrapperHello
class Hello extends Component{
    render (){
        return <h5>hello huihui!<em>{this.props.name}</em></h5>
    }
}*/

/**
 * 注册
 * @connect 装饰器
 */
@connect(
    state=>state.user,
    { register }
)
@Form
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
           /* user:'',
            pwd:'',
            repeatPwd:'',
            type:'genius'*/
        }
        this.register = this.register.bind(this)
    }

    componentDidMount(){
        this.props.handlerChange('type','genius');  //设置默认属性
    }

    //注册
    register = ()=>{
        //调用装饰器定义的register
        this.props.register(this.props.data);
    }

    render (){
        const RadioItem = Radio.RadioItem;
        const { data,handlerChange } = this.props;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo />
                <h2 align="center">注册</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="err-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>{handlerChange('user',v)}}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v=>{handlerChange('pwd',v)}}
                            type="password"
                        >密码</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v=>{handlerChange('repeatPwd',v)}}
                            type="password"
                        >确认密码</InputItem>
                        <RadioItem checked={data.type==='genius'} onChange={()=>handlerChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={data.type==='boss'} onChange={()=>handlerChange('type','boss')}>
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