import React,{Component} from 'react';
import { connect } from 'react-redux';
import { login, getUserData } from "../redux/auth.redux";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { Button,WingBlank } from 'antd-mobile'
// import { List, InputItem, WhiteSpace } from 'antd-mobile';

//两个reducers ,每个reducers 都有一个state
//合并reducers  -》combineReducers
@connect(
    state=>state.auth,
    { login, getUserData }
)
class Auth extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserData();
    }

    render (){
        return (
            <WingBlank>
                <div style={{marginTop:'100px'}}>
                    {/*<List renderHeader={() => '登录'}>
                        <InputItem placeholder="用户名">
                            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                        </InputItem>
                        <InputItem type="密码" placeholder="****">密码</InputItem>
                    </List>
                    <WhiteSpace />*/}
                    <p>名字：{this.props.name}</p>
                    <p>年龄：{this.props.age}</p>
                </div>
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : <h2 align="center">你没有权限！</h2>}
                <Button  type="primary" size="small" onClick={this.props.login}>登录</Button>
            </WingBlank>

        )
    }
}
export default Auth