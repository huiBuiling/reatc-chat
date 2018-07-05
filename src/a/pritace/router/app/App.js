import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { addPro, delPro, addProAsync} from '../redux/index.redux'

//装饰器
@connect(
    //需要state什么属性放到props
    state=>state,
    //需要什么方法放到props，自动dispatch
    {addPro, delPro, addProAsync}
)
class App extends Component {
    render() {
        console.log(this.props)
        return (
            <div >
                <h3>现在有项目{this.props.counter.num}个</h3>
                <Button style={{margin:'10px 0'}} onClick={this.props.addPro}>添加项目</Button>
                <Button style={{margin:'10px 0'}} onClick={this.props.delPro}>删除项目</Button>
                <Button onClick={this.props.addProAsync}>延迟添加项目</Button>
            </div >
        )
    }
}

export default App;
