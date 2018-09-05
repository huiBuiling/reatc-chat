import React,{Component} from 'react';
import { Button, Result, WhiteSpace, Modal, List, Toast} from 'antd-mobile';
import { connect } from 'react-redux';
import { loginOutSubmit } from '../../../redux/user.redux'
import browserCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom'

const Item = List.Item;
const alert = Modal.alert;

@connect(
    state=>state.user,
    { loginOutSubmit }
)
/**
 * 个人中心
 */
export default class User extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.loginOut = this.loginOut.bind(this);
    }

    //退出登录
    loginOut = ()=>{
        alert('退出登录', '确认退出?', [
            { text: '取消'},
            { text: '确定',
              onPress: () => {
                  new Promise((resolve) => {
                      Toast.info('退出成功', 1);
                  });

                  //擦除 cookie 下 userid
                  browserCookies.erase('userid');
                  //清除redux 数据
                  this.props.loginOutSubmit();
              }
            }
        ])
    }

    render (){
        const { avatar, user, company, type , title, desc, money, redirectTo} = this.props;

        return this.props.user ?
            <div className="app-my">
                <WhiteSpace />
                <Result
                    img={<img src={require(`../../../assert/image/avatar/${avatar}.jpg`)} />}
                    title={user}
                    message={<div>{type == 'boss' ? company : null}</div>}
                />
                <WhiteSpace />
                <div>
                    <List renderHeader={() => '简介'} className="my-list">
                        <Item
                            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                            // arrow="horizontal"
                            extra={title}
                        >职位</Item>
                        {type == 'boss' ? <Item
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            extra={money}
                        >薪资</Item> : null }
                    </List>
                    <List renderHeader={() => {return type == 'boss' ? '职位描述':'个人技能'}} className="my-list">
                        <Item wrap>
                            {desc.split('\n').map(item => {
                                return <p key={item}>{item}</p>
                            })}
                        </Item>
                    </List>
                    <List className="my-list-out">
                        <Item onClick={this.loginOut}>
                            退出登录
                        </Item>
                    </List>
                </div>
            </div> : <Redirect to={redirectTo}></Redirect>
    }
}
