import React,{Component} from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

//登录或注册处理
@withRouter
    @connect(  //注：要写在@withRouter下面
        null,
        { loadData }
    )
class AuthRoute extends Component{
    constructor(props){
        super(props);
        this.state={
            isLogin:false
        }
    }

    componentDidMount(){
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        //判断是否已经是登录或者注册页则不需要验证是否登录
        if(publicList.indexOf(pathname)>-1){
            return null;
        }

        //获取用户信息判断是否登录
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data);  //已登录，设置信息到redux
                } else {
                    this.props.history.push('/login');  //未登录，，跳转到login
                }

            }
        })
        //是否登录  login不需跳转
        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息（选择头像 个人简介）
    }

    render (){
        return (
            <div>
                {/*<p>您还没有登录</p>*/}
            </div>

        )
    }
}
export default AuthRoute