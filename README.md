# reatc-chat 招聘模拟

> 创建项目：
```
npm install -g create-react-app
create-react-app react-chat
npm start
安装需要的包：
npm install redux --save
npm run eject 弹出配置文件，可以自定义配置webpack
会增加config和script文件
```

> es6常用语法

```
1. let,const

2. 字符串：`hello ${name}`

3. 箭头函数：
  a. const hello = (name) =>{}
  b. const hello = x =>{x*2}. //适用于只有一条return语句
  c. const hello = (name = 'imic') => {}

4. 展开符: Let arr = ['a'.'b','c'];  (…arr);

5. object
  a. const obj = {name:'imlc',course:'react'
     Object.keys(obj).             //['name','course']
     Object.values(obj).          //['imlc','react']
     Object.entries(obj). //[{'name','imlc'},{'course','react'}]
  b. const name = ‘imooc’;
     const obj = [
                  1.[name]:’hello’
                  2.name
                  3.hello(){}
               ]
  c. object合并: {…obj, …obj2, data:’2017’}

6.解构
  a. let arg1 = arr[0]; let agr2 = arr[1];
     let [args,args2] = arr
  b. const {name,course} = obj;
```

> express

```
npm install express

express:
const express = require('express');
//新建app
const app = express();
app.get('',function(req,res){
    res.send('<h1>Hello World!</h1>')
});
app.get('/data',function(req,res){
    res.json({name:"hui",age:"21"})
});
app.listen(5203,function(){
    console.log('Node app start at port 5203');
})

cd server
运行：node server.js
http://localhost:5203/

修改后需要node server.js
为解决此操作繁琐顾： npm install -g nodemon
安装时报错，需要管理员权限  win+x  window powerShell (管理员)
运行：nodemon server.js

其他特性：
- app.get、app.post分别开发get和post接口
- app.use使用模块
- 代res.send、res.json、res.senfile响应不同的内容
```

> mongodb

```
mongodb.com 官网下载安装包或者用包brew管理器（妞：window没有） brew install mongodb

启动命令：mongod --dbpath D:\MongoDB\data\db
Node app start at port 5203
mongo connect success

> mongodb操作：
1. 连接
    const mongoose = require('mongoose');
    //链接mongo 且shi使用此地址集合
    const DB_URL = 'mongodb://localhost:27017/chat'
    mongoose.connect(DB_URL);

    mongoose.connection.on('connected',function () {
        console.log('mongo connect success')
    })

2. 创建一条数据：
    User.create({
        user:"hui", age:12
    },function(err,doc){
        If(!err){console.log(doc)}
        else{ console.log(doc)}
    })

3. 查找数据：
    app.get(‘/data’,function(req,res){
        //查找全部数据
        User.find({},function(err, doc){
                res.json(doc);
        })
        //根据条件查找数据
        User.find({name:'hui'},function(err, doc){
                res.json(doc);
        })
        //只查找一条数据
        User.findOne({name:'hui'},function(err, doc){
                res.json(doc);
        })
    })

4. 删除数据：
    User.remove({age:12},function(err,doc){
        console.log(doc)
    })
    Or
    User.remove({name:'hui'},function(err,doc){
        If(!err){
            console.log('del success');
            User.find({},function(err, doc){
                console.log(doc);
            }
        }
    })

5. 更新数据：
    将名字为’hui’的人，年龄改为20
    User.update({name:’hui’},{’$set’:{age:20}},function(err,doc){
        console.log(doc);
    })
```

> 生命周期：

```
componentWillMount= ()=>{
    console.log('组件马上就要加载了');
}
componentDidMount= ()=>{
    console.log('组件加载完毕');
}
componentWillReceiveProps=(newProps)=> {
    console.log('组件要接收组件的值了')
}
shouldComponentUpdate=(newProps, newState)=> {
    console.log('判断是不是要更新组件了')
    return true;
}
componentWillUpdate=(nextProps, nextState)=> {
    console.log('马上能就要更新组件了');
}
componentDidUpdate= (prevProps, prevState)=> {
    console.log('组件更新完毕')
}
componentWillUnmount= ()=>{
    console.log('组件卸载了')
}
```

> antd-mobile：
```
npm install antd-mobile@next --save
引入样式：import { Button } from 'antd-mobile'; （无效）
    解决1：改为
        import 'antd-mobile/dist/antd-mobile.css' （有效）
    解决2：
        cnpm install babel-plugin-import --save-dev
        package.json  紫色为新增部分
        "babel": {
            "presets": ["react-app"],
            "plugins":[
                ["import", { "libraryName": "antd-mobile", "style": "css" }]
            ]
        }
```

> redux

```
简介：专注于状态管理，和react解耦
      单一状态，单项数据流
能力：一个保险箱(store),所有人的状态,在那里都有记录(state)
      需要改变的时候，告诉专员(dispatch)要干什么(action)
      reducer函数接收state和action,返回新的state,可以使用store.subscribe监听每次修改

1. 实战1：npm install redux --save
    import { createStore } from 'redux';
    //通过reducer建立
    //根据老的状态和action，生产新的state
    function counter(state=0, action){
        switch (action.type){
            case '添加项目':
                return state + 1;
            case '删除项目':
                return state - 1;
            default:
                return 10;
        }
    }

    //新建store
    const store = createStore(counter);

    //获取状态
    const init = store.getState();
    console.log(init)

    //订阅方法
    function listener() {
        const current = store.getState();
        console.log(`现在有项目${current}个`)
    }
    //订阅
    store.subscribe(listener);

    //派发事件,传递action
    store.dispatch({type:'添加项目'})
    store.dispatch({type:'添加项目'})
    store.dispatch({type:'删除项目'})

2. 实战2：
> app:
import React, { Component } from 'react';
import { Button,WingBlank } from 'antd-mobile'
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


> index:
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import App from '../../app/App';
import { counter , addPro, delPro, addProAsync} from "./a/index.redux";
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))

function render() {
    ReactDOM.render(
            <App
                store={store}
                addPro={addPro}
                delPro={delPro}
                addProAsync={addProAsync}
            />, document.getElementById('root'));
}
render();
//订阅
store.subscribe(render)

> index.redux:
const ADD_PRO = '添加项目';
const DEL_PRO = '删除项目';

//reducer
export function counter(state=0, action){
    switch (action.type){
        case ADD_PRO:
            return state + 1;
        case DEL_PRO:
            return state - 1;
        default:
            return 10;
    }
}

//action
//添加
export function addPro() {
    return {type:ADD_PRO}
}
//删除
export function delPro() {
    return {type:DEL_PRO}
}
//异步添加
export function addProAsync() {
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addPro())
        },2000)
    }
}

```
> redux处理异步：

```
redux-thunk插件：npm install redux-thunk --save
import { createStore, applyMiddleware, compose } from 'redux';
import  thunk  from 'redux-thunk'
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))
ReactDOM.render(<App store={store} addPro={addPro} delPro={delPro} addProAsync={addProAsync}/>, document.getElementById('root'));

Google商店 添加 Redux Devtools
redux-devtools-extension 并且开启：
npm install redux-devtools-extension --save
```

> react-redux

```
npm install react-redux --save
解决组件需要时一层一层传递action
忘记subscribe，记住render，action，dispatch
提供两个新接口j链接：Provider，connect
使用：
provider 组件在应用最外层，传入store即可，只用一次
ReactDOM.render(
    (<Provider store={store}>
        <App />
</Provider>), document.getElementById('root'));

connect 装饰器负责从外部获取组件需要的参数

app:
import { connect } from 'react-redux'
import { addPro, delPro, addProAsync} from './a/index.redux'
class App extends Component {
    render() {
        return (
            <WingBlank >
               <h3>现在有项目{this.props.num}个</h3>
               <Button style={{margin:'10px 0'}} onClick={this.props.addPro}>添加项目</Button>
               <Button style={{margin:'10px 0'}} onClick={this.props.delPro}>删除项目</Button>
               <Button onClick={this.props.addProAsync}>延迟添加项目</Button>
            </WingBlank >
        )
    }
}
const mapStatetoProps = (state)=>{
    return {num:state}
}
const actionCreators = {addPro, delPro, addProAsync}
//装饰器
App = connect(mapStatetoProps, actionCreators)(App)
export default App;

```

> 装饰器优化

```
app:
//装饰器
@connect(
    //需要state什么属性放到props
    state=>({num:state}),
    //需要什么方法放到props，自动dispatch
    {addPro, delPro, addProAsync}
)
```

> 个性化配置

```
npm run eject 弹出个性化配置
npm install babel-plugin-transform-decorators-legacy --save-dev  开发者需要的插件
package.json 里babel添加plugins配置

"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      "transform-decorators-legacy",
      ["import",{
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ]
    ]
},
```

> React-Router4(核心概念：动态路由，Route,Link,Switch)

```
> react-router-dom
npm install react-router-dom --save
exact 完全匹配路由  <Route path='/' exact component={Home} ></Route>

demo:
import { BrowserRouter, Route, Link } from 'react-router-dom'
<BrowserRouter>
    <div>
        <ul>
            <li><Link to='/'>首页</Link></li>
            <li><Link to='/advice' >咨询</Link></li>
            <li><Link to='/about' >关于我们</Link></li>
        </ul>
        <Route path='/' exact component={Home} ></Route>
        <Route path='/advice' component={Advice} ></Route>
        <Route path='/about' component={About} ></Route>
    </div>
</BrowserRouter>

> 其他组件
  a. url参数，Route组件参数可用冒号标识参数
  b. Redirect组件 跳转
  c. Switch只渲染一个子Route组件

  history:
  location:
  match:参数
     eg: this.props.match.params.location

  <Redirect to='/advice'></Redirect>  //路由跳转

```

#### react-redux重点（两个api：Provider,装饰器(@connect)，合并reducers，基础redux）

```
redux是数据存储和管理的工具，但是想要在react中使用redux，并不能直接将store、action和react组件建立连接，所以就需要react-redux来结合react和redux。

//使用combineReducers合并所有reducers,并且返回
import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { auth } from './auth/auth.redux'
export default combineReducers ({counter, auth})

报错：
Objects are not valid as a React child (found: object with keys {counter, auth}). If you meant to render a collection of children, use an array instead.

因为reducer合并后state变成了一个对象所以App.js里state的值也要变为对象格式

//index.redux.js
const ADD_PRO = '添加项目';
const DEL_PRO = '删除项目';

> reducer通过返回state，创建并更新state
  它是个纯函数，接受2个参数，第一个是state，第二个是action，通过action去”改变“state的值
    export const counter = (state={ num: 10}, action)=>{
        switch (action.type){
            case ADD_PRO:
                state.num++;
                // console.log(state.num + " : state")
                return state;
            case DEL_PRO:
                state.num--;
                return state;
            default:
                return state
        }
    }

> action creater
    //添加
    export const addPro = ()=>{
        return {type:ADD_PRO}
    }
    //删除
    export const delPro = ()=>{
        return {type:DEL_PRO}
    }
    //异步添加
    export const addProAsync =()=>{
        return dispatch=>{
            setTimeout(()=>{
                dispatch(addPro())
            },2000)
        }
    }

> redux的API:Provider和connect
    import { Provider } from 'react-redux'
    Provider提供的是一个顶层容器的作用，实现store的上下文传递。
    ReactDOM.render(
        (<Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>  {/*登录或注册验证*/}
                    <Switch>
                        <Route path='/boss' exact component={Boss} ></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>), document.getElementById('root'));
-----------------------------------------------------------------
    //装饰器
    import { connect } from 'react-redux'
    @connect(
        state=>state,//需要state什么属性放到props
        //需要什么方法放到props，自动dispatch
        {addPro, delPro, addProAsync}
    )

属性

```

> axios

```
使用axios发送异步请求
     a.发送，端口不一致，使用proxy配置转发
     b.axios拦截器，统一loading处理
     c.redux里使用异步数据，渲染页面

npm install axios --save
packjson添加：
"proxy": "http://localhost:5203",

http://localhost:3000/
http://localhost:5203/data

//测试
axios.get('/data').then(res=>{
    console.log(res);
})

axios.interceptors 设置拦截器，比如全局loading
axios.get,.post 发送请求，返回promise对象
Redux里获取数据，然后dispatch即可
```

> 项目开始
- [x] 登录

```

启动
nodemon server/server.js

import { withRouter } from 'react-router-dom'
@withRouter
class AuthRoute extends Component{}

node
Error: Cannot find module 'mongoose'
cnpm install mongoose --save

使用 post
cnpm install body-parser --save
cnpm install cookie-parser --save

server.js
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
app.use(cookieParser());
app.user(bodyParser.json()); //可以解析post请求接收的json数据
```

> 加密

```
http://www.cmd5.com/
https://www.npmjs.com/package/utility

//加密算法
function md5Pwd(pwd) {
    const salt = 'react_is_chat_13412424324xfsfdvsdfgfdgdfs!@~~';
    return utils.md5(utils.md5(pwd+salt))
}
pwd = md5Pwd(pwd);
```

> 运行

```
启动mongo d:\mongodb\bin:
mongod --dbpath D:MongoDB\data\db
启动 项目: npm start
启动 server: nodemon server/server.js

Could not proxy request /user/info from localhost:5203 to http://localhost:5203/.
未启动:mongo

error:
1. Error: couldn't connect to server 127.0.0.1:27017 src/mongo/shell/mongo.js
若数据库出现如上不能连接的原因，可能是data目录下的mongod.lock文件问题
删除data/mongod.lock

2. MongoDB Data directory /data/db not found [duplicate]
Mongodb异常关闭重启失败解决
连接mongodb的网站没有关，直接关闭了mongodb的cmd窗口。再次打开mongodb出现失败
解决
> mongod --dbpath d:\Mongodb\data\db --repair
> mongod --dbpath d:\Mongodb\data\db


启动成功访问
http://localhost:27017/
It looks like you are trying to access MongoDB over HTTP on the native driver port.

mongo停止：
> use admin;
switched to db admin
> db.shutdownServer();
server should be down...

webStorm 启动异常
使用命令行会询问是否切换端口，也是可以使用的

```

> 登录注册

```
react-router 提供了一个withRouter组件
withRouter可以包装任何自定义组件，将react-router 的 history,location,match 三个对象传入。

import { withRouter } from 'react-router-dom'
@withRouter
console.log(this.props.history)

登录注册-用户信息校验，跳转登录
authRoute.js

<InputItem onChange={v=>{this.handlerChange('user',v)}}>用户</InputItem>
<InputItem onChange={v=>{this.handlerChange('pwd',v)}}>用户</InputItem>
handlerChange = (key, val)=>{
    this.setState({
        [key]:val
    });
}

用户列表
http://localhost:5203/user/list
```
