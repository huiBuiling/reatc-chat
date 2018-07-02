import React, { Component } from 'react';

class Lifecycle extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
        console.log('组件初始化')
    }
    componentWillMount= ()=>{
        console.log('组件马上就要加载了');
    }
    componentDidMount= ()=>{
        console.log('组件加载完毕');
    }
    componentWillReceiveProps=(newProps)=> {
        console.log('组件要接收组件的值了')
    }
    shouldComponentUpdate=(newProps, newState)=> {
        console.log('判断是不是要更新组件了')
        return true;
    }
    componentWillUpdate=(nextProps, nextState)=> {
        console.log('马上能就要更新组件了');
    }
    componentDidUpdate= (prevProps, prevState)=> {
        console.log('组件更新完毕')
    }
    componentWillUnmount= ()=>{
        console.log('组件卸载了')
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Lifecycle;
