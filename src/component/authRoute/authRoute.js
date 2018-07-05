import React,{Component} from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
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
        if(publicList.indexOf(pathname)>-1){
            return null;
        }

        //获取用户信息
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息
                    /*this.setState({
                        isLogin: true
                    })*/
                    console.log(res.data)
                } else {
                    this.props.history.push('/login')
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