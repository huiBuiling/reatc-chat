import React,{Component} from 'react';

/**
 * 高阶组件学习
 * form
 */
const Form = Comp => class extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.handlerChange = this.handlerChange.bind(this);
    }

    componentDidMount(){
        // console.log('高阶组件->属性代理')
    }

    //值改变
    handlerChange = (key, val)=>{
        // console.log(key,val)
        this.setState({
            [key]:val
        });
    }

    render (){
        return <div>
            <Comp
                handlerChange={this.handlerChange}
                data={this.state}
                {...this.props}
            />
        </div>
    }
}

export default Form

