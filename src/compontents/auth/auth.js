import React,{Component} from 'react'
import { connect } from 'react-redux'
import { login } from "../redux/auth.redux";
import { Redirect } from 'react-router-dom'

//两个reducers ,每个reducers 都有一个state
//合并reducers  -》combineReducers
@connect(
    state=>state.auth,
    { login }
)
class Auth extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render (){
        return (
            <div>
                {this.props.isAuth ?
                    <Redirect to='/dashboard'></Redirect> :
                    <h2 align="center">你没有权限！</h2>
                }
                <button onClick={this.props.login}>登录</button>
            </div>

        )
    }
}
export default Auth