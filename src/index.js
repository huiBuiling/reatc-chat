import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route , Switch} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'

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
                    <Route path='/bossinfo' exact component={BossInfo} ></Route>
                    <Route path='/geniusinfo' exact component={GeniusInfo} ></Route>
                    <Route path='/login' exact component={Login} ></Route>
                    <Route path='/register' exact component={Register} ></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));