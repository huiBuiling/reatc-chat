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
import Disboard from './component/disabord/disabord'

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
                <Switch>  {/*其中之一符合即渲染，不在执行其下面的*/}
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/geniusinfo' component={GeniusInfo} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' component={Register} />

                    {/* 不添加Switch ，则所有匹配路由下都会显示 */}
                    {/*Switch中，前面路由都未匹配中，则显示*/}
                    <Route component={Disboard} ></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));