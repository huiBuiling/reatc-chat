import React,{Component} from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.chat
)
/**
 * 对应footerbar
 */
export default class NavListBar extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    //样式
    getStyles = (svg)=>{
        let styleObj = {
            width: '22px',
            height: '22px',
            background: `url(${svg}) center center /  22px 22px no-repeat`
        };
        return styleObj;
    }

    render (){
        const navList = this.props.navList.filter(item => !item.hide);
        const { pathname } = this.props.location;
        return (
           <div className="app-footer">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                    >
                        {navList.map(item=>{
                            return (
                                <TabBar.Item
                                    title={item.label}
                                    key={item.path}
                                    icon={<div style={this.getStyles(item.icon)}/>}
                                    selectedIcon={<div style={this.getStyles(item.selectedIcon)}/>}
                                    selected={pathname === item.path}
                                    badge={item.path === '/msg' ? this.props.unread : 0}
                                    onPress={() => {
                                        this.props.history.push(item.path)
                                    }}
                                />
                            )
                        })}
                    </TabBar>
                </div>
        )
    }
}
