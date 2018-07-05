import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link ,Switch, Redirect} from 'react-router-dom'

import App from './App';
import { counter } from "./a/index.redux";

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))

const Home = ()=>{
    return <h2>首页</h2>
}

const Advice = ()=>{
    return <h2>咨询</h2>
}

const About = ()=>{
    return <h2>关于我们</h2>
}

/*class Test extends React.Component{
    render (){
        console.log(this.props);
        return <h2>测试组件{this.props.match.params.location}</h2>
    }
}*/


ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/advice' >咨询</Link></li>
                    <li><Link to='/about' >关于我们</Link></li>
                </ul>
                <Switch>
                    <Redirect to='/advice'></Redirect>
                    <Route path='/' exact component={Home} ></Route>
                    <Route path='/advice'  component={Advice} ></Route>
                    <Route path='/about'  component={About} ></Route>
                </Switch>
                {/*<Route path='/' exact component={App} ></Route>
                <Route path='/:location'  component={Test} ></Route>*/}
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));