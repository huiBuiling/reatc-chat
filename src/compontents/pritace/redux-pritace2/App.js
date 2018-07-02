import React, { Component } from 'react';
import { Button,WingBlank } from 'antd-mobile'
// import Pritace from './compontents/pritace'
// import Lifecycle from './compontents/lifecycle'

// import { addPro,delPro } from "./compontents/index.redux";

class App extends Component {

    render() {
        const store = this.props.store;
        const num = store.getState();
        const addPro = this.props.addPro;
        const delPro = this.props.delPro;
        const addProAsync = this.props.addProAsync;

        return (
            <WingBlank >
               <h3>现在有项目{num}个</h3>
               <Button style={{margin:'10px 0'}} onClick={()=>store.dispatch(addPro())}>添加项目</Button>
               <Button style={{margin:'10px 0'}} onClick={()=>store.dispatch(delPro())}>删除项目</Button>
               <Button onClick={()=>store.dispatch(addProAsync())}>延迟添加项目</Button>
            </WingBlank >
        )
    }
}

export default App;
