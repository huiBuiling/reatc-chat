import React,{Component} from 'react';
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from  '../../redux/user.redux';

//登录成立 boss详情页
@connect(
    state=>state.user,
    { update }
)
export default class BossInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            avatar:'',
            title:'',
            company:'',
            money:'',
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
        const redirect = this.props.redirectTo && this.props.redirectTo !== path;
        return (
            <div>
                {redirect ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />
                    ]}
                >BossInfo</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar} />
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company',v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money',v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    title="职位要求"
                    row={3}
                    autoHeight
                    onChange={(v)=>this.onChange('desc',v)} />
                <Button onClick={this.save}>
                    保存
                </Button>
            </div>

        )
    }
}
