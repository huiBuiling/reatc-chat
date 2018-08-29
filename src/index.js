import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route , Switch} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './container/authRoute/authRoute'
import Boss from './component/boss/boss'

import reducers from './redux/reducers'
import './util/config'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))
// console.log(store)

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>  {/*登录或注册验证*/}
                <Switch>
                    <Route path='/boss' exact component={Boss} ></Route>
                    <Route path='/login' exact component={Login} ></Route>
                    <Route path='/register' exact component={Register} ></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));