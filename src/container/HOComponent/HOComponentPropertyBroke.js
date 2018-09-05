import React,{Component} from 'react';

/**
 * 高阶组件
 * 属性代理
 */
const WrapperHello = Comp => class extends Component{
    componentDidMount(){
        console.log('高阶组件->属性代理')
    }

    render (){
        return <div>
            <h5>hello niuniu!</h5>
            <Comp name="ccc" {...this.props} />
        </div>
    }
}

export default WrapperHello

