import React, { Component } from 'react';
import { Button,WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { addPro, delPro, addProAsync} from './compontents/index.redux'
class App extends Component {
    render() {
        return (
            <WingBlank >
               <h3>现在有项目{this.props.num}个</h3>
               <Button style={{margin:'10px 0'}} onClick={this.props.addPro}>添加项目</Button>
               <Button style={{margin:'10px 0'}} onClick={this.props.delPro}>删除项目</Button>
               <Button onClick={this.props.addProAsync}>延迟添加项目</Button>
            </WingBlank >
        )
    }
}
const mapStatetoProps = (state)=>{
    return {num:state}
}
const actionCreators = {addPro, delPro, addProAsync}
//装饰器
App = connect(mapStatetoProps, actionCreators)(App)
export default App;
