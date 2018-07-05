import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route ,Switch, Redirect} from 'react-router-dom'

import Auth from './a/auth/auth'
import Dashboard from './a/dashboard'

// import { counter } from "./a/index.redux"; //单个reducers
import reducers from './a/redux/reducers'  //多个reducers

import './a/config'
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))
console.log(store)

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={Auth} ></Route>
                <Route path='/dashboard'  component={Dashboard} ></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));