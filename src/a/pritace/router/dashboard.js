import React,{Component} from 'react'
import { Link, Route,Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { loginOut } from "./redux/auth.redux";
import { Button,WingBlank } from 'antd-mobile'

import App from './app/App.js'

@connect(
    state=>state.auth,
    {loginOut}
)
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render (){
        const match = this.props.match;
        const Advice = ()=>{return <h2>咨询</h2>}
        const About = ()=>{return <h2>关于我们</h2>}
        const app = (<div>
            <ul>
                <li><Link to={`${match.url}/`}>首页</Link></li>
                <li><Link to={`${match.url}/advice`}>咨询</Link></li>
                <li><Link to={`${match.url}/about`}>关于我们</Link></li>
            </ul>

            <Route path={`${match.url}/`} exact component={App} ></Route>
            <Route path={`${match.url}/advice`} component={Advice} ></Route>
            <Route path={`${match.url}/about`} component={About} ></Route>
        </div>);

        return (
            <WingBlank>
                {this.props.isAuth ? app : <Redirect to='/login'></Redirect>}

                <Button type="primary" size="small" style={{marginTop:'100px'}} onClick={this.props.loginOut}>注销</Button>
            </WingBlank>
        )
    }
}

export default Dashboard