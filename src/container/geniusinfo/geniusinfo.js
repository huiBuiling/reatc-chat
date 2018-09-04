import React,{Component} from 'react';
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from  '../../redux/user.redux';

//登录成立 genius详情页
@connect(
    state=>state.user,
    { update }
)
export default class GeniusInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            avatar:'',
            title:'',
            desc:''
        }
    }

    //值改变
    onChange = (item,v)=>{
        this.setState({
            [item]:v
        })
    }

    //保存
    save = ()=>{
        this.props.update(this.state);
    }

    //头像选中
    selectAvatar = (item)=>{
        this.setState({
            avatar:item.text
        })
    }

    render (){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />
                    ]}
                >完善个人信息页</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                />
                <InputItem onChange={(v)=>this.onChange('title',v)}>面试职位</InputItem>
                <TextareaItem
                    title="技术自述" row={3} autoHeight
                    onChange={(v)=>this.onChange('desc',v)} />
                <Button onClick={this.save}>
                    保存
                </Button>
            </div>

        )
    }
}
