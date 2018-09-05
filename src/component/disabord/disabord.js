import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

import NavListBar from './navBar'
import Boss from './userlist/boss'
import Genius from './userlist/genius'
import Msg from './msg'
import User from './my/user'

import niur from '../../assert/image/svg/nr.svg'
import niurI from '../../assert/image/svg/nr-o.svg'
import boss from '../../assert/image/svg/boss.svg'
import bossI from '../../assert/image/svg/boss-o.svg'
import message from '../../assert/image/svg/message.svg'
import messageI from '../../assert/image/svg/message-o.svg'
import my from '../../assert/image/svg/my.svg'
import myI from '../../assert/image/svg/my-o.svg'

@connect(
    state=>state
)
export default class Disboard extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render (){
        let navList =[
            {
                path:'/boss',
                title:'牛人列表',
                label:'牛人',
                icon:niur,
                selectedIcon:niurI,
                component:Genius,
                hide:this.props.user.type === 'genius'
            },
            {
                path:'/genius',
                title:'BOSS列表',
                label:'BOSS',
                icon:boss,
                selectedIcon:bossI,
                component:Boss,
                hide:this.props.user.type === 'boss'
            },
            {
                path:'/msg',
                title:'消息列表',
                label:'消息',
                icon:message,
                selectedIcon:messageI,
                component:Msg
            },
            {
                path:'/me',
                title:'个人中心',
                label:'我的',
                icon:my,
                selectedIcon:myI,
                component:User
            }
        ];
        const { pathname } = this.props.location;
        return (
            <div className="app">
                <NavBar
                    className="app-header"
                    mode="dark"
                    icon={<Icon type="left" />}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />
                    ]}
                >{navList.find(item => item.path === pathname).title}</NavBar>

                <div className="app-con">
                    <Switch>
                        {navList.map(item =>(
                            <Route key={item.path} path={item.path} component={item.component} />
                        ))}
                    </Switch>
                </div>

                <NavListBar navList={navList}/>
            </div>

        )
    }
}
