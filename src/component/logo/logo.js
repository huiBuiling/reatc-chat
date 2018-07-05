import React,{Component} from 'react';
import logo from '../../image/job.png'
import '../../index.css'

class Logo extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render (){
        return <div className="logo">
                    <img src={logo} alt=""/>
                </div>
    }
}
export default Logo