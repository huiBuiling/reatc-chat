import React,{Component} from 'react'
import { Link, Route,Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { loginOut } from "./redux/auth.redux";

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
        // console.log(this.props)
        const Advice = ()=>{
            return <h2>咨询</h2>
        }

        const About = ()=>{
            return <h2>关于我们</h2>
        }

        const app = (<div>
            <ul>
                <li><Link to='/dashboard/'>首页</Link></li>
                <li><Link to='/dashboard/advice'>咨询</Link></li>
                <li><Link to='/dashboard/about'>关于我们</Link></li>
            </ul>

            <Route path='/dashboard/' exact component={App} ></Route>
            <Route path='/dashboard/advice'  component={Advice} ></Route>
            <Route path='/dashboard/about'  component={About} ></Route>
        </div>);

        // const redirectToLogin = <Redirect to='/login'></Redirect>
        return (
            <div>
                <button onClick={this.props.loginOut}>注销</button>
                {this.props.isAuth ? app : <Redirect to='/login'></Redirect>}
            </div>
        )
    }
}

export default Dashboard