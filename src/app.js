import React,{Component} from 'react';
import { withRouter, Route , Switch} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Disboard from './component/disabord/disabord'
import Chat from './component/disabord/chat'

import './util/config'
/**
 * @author hui
 * @date 2019/1/4
 * @Description: 路由
*/
@withRouter
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
        if(this.props.location.pathname == '/'){
            this.props.history.push('/login')  //登录
        }
    }


    render (){
        console.log(this.props.location.pathname);
        const {pathname} = this.props.location;
        return (
            <div>
                <AuthRoute />  {/*登录或注册验证*/}
                <Switch>  {/*其中之一符合即渲染，不在执行其下面的*/}
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/geniusinfo' component={GeniusInfo} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/chat/:user' component={Chat} />

                    {/* 不添加Switch ，则所有匹配路由下都会显示 */}
                    {/* Switch中，前面路由都未匹配中，则显示 */}
                    {/* 登录则默认进入此组件 */}
                    <Route component={Disboard} />
                </Switch>
            </div>
        )
    }
}