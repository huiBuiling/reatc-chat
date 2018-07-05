import React, { Component } from 'react';
import { Button } from 'antd-mobile';
// import 'antd-mobile/dist/antd-mobile.css'

class Pritace extends Component {
  render() {
    const major = "前端";
    return (
      <div className="App">
          <p>这是一种技术{major}</p>
          <Technology technology="Angular" />
          <Technology2 technology="React" />
      </div>
    );
  }
}

function Technology(props) {
    return <p>这是前端技术之一{props.technology}</p>
}

class Technology2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            technology:['react,react-router,react-dom']
        }

        // this.addTechnology = this.addTechnology.bind(this);
    }

    addTechnology(){
    // addTechnology = () =>{
        this.setState({
            technology:[...this.state.technology,'新技术' + Math.random()]
        })
    } 
    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.addTechnology()}>添加</Button>
                {/* <button onClick={this.addTechnology}>添加</button> */}
                <p>这是前端技术之一{this.props.technology}</p>
                {
                    this.state.technology.map((val,index)=>{
                        return <p key={val}>{val}</p>
                    })
                }
            </div>
        )
    }
}

export default Pritace;
