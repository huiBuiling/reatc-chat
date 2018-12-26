# reatc-chat 招聘模拟学习

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
  a. const obj = {name:'imlc',course:'react'}
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
  c. Switch只渲染匹配中的第一个子Route组件

  exact:严格匹配
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

http://localhost:5203/
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


cookie记录：Application->cookie
user.js
login:
res.cookie('userid', doc._id);  //写入cookie,判断是否登录

info:
//用户cookie检测
Router.get('/info',function (req,res) {
    const { userid } = req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    User.findOne({_id:userid}, _filter, function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了！'})
        }
        return res.json({code:0,data:doc});
    })
})


//更新
user.redux:
const AUTH_SUCCESS = 'AUTH_SUCCESS';
//用户信息
const initState = {redirectTo:'',msg:'',user:'', pwd:'', type:''}
//reducer
export function user(state=initState, action){
    switch (action.type){
        case AUTH_SUCCESS:  //更新
            return {
                ...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload  //帐号数据
            }
        case LOAD_DATA:  //登录后获取用户信息
            return { ...state, ...action.payload  //帐号数据 }
        case ERROR_MSG:  //错误信息
            return { ...state, isAuth:false, msg:action.msg }
        default:
            return state
    }
}

//action
//更新回调
export function authSuccess(data){
    return {type:AUTH_SUCCESS, payload:data}
}

//错误信息
export function errorMsg(msg){
    return { msg, type:ERROR_MSG}
}

//登录成功用户信息回调
export function loadData(userinfo){
    return {type:LOAD_DATA, payload:userinfo}
}

//登录请求 | 注册请求 中修改
dispatch(loginSuccess(res.data.data)) | dispatch(registerSuccess(res.data.data))
修改为: dispatch(authSuccess(res.data.data));

//更新请求
export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

server/user
Router.post('/update',function (req,res) {
    //cookie 检测
    const { userid } = req.cookies;
    if(!userid){
        return res.json({code:1});
    }

    const body = req.body;
    User.findByIdAndUpdate(userid,body,function (err,doc) {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);
        return res.json({code:0,data});
    })

});

查看提交信息
http://localhost:5203/user/info
```

> 头像选择
```
react:PropTypes （强类校验）
安装：cnpm install prop-types --save

使用：
import PropTypes from 'prop-types';
   static PropTypes = {
       selectAvatar: PropTypes.func.isRequired
   }
    constructor(props){}
```

> 牛人列表
```
disborad:
<Switch>
    {navList.map(item =>(
        <Route key={item.path} path={item.path} component={item.component} />
    ))}
</Switch>

navBar:
<TabBar.Item
    title={item.title}
    key={item.title}
    icon={<div style={this.getStyles(item.icon)}/>}
    selectedIcon={<div style={this.getStyles(item.selectedIcon)}/>}
    selected={pathname === item.path}
    badge={1}
    onPress={() => {
        this.props.history.push(item.path)
    }}
/>

thumb={require(`../../assert/image/avatar/${item.avatar}.jpg`)}

http://localhost:5203/user/list?type=genius

注意：头像字段无法存入数据库
解决：server 里面的数据模型字段不匹配（拼写有误）

chat.user.redux.js getUserList()
this.props.getUserList('boss' | 'genius');
```

> 个人中心
```
user.redux 获取展示列表
退出登录（清除cookie）

npm isntall browser-cookies --save

user.js
//擦除 cookie 下 userid
browserCookies.erase('userid');

//redux 数据变为初始
case LOGIN_OUT:
    return {
        ...initState,
        redirectTo:'/login'
    }
```

> 高阶组件(属性代理，反向继承)
```
react-redux中的connect就是一个高阶组件

//高阶函数编程（函数=》参数，返回值）
function hello() {
    console.log("hello huihui!")
}
function WrapperHello(fn) {
    return function () {
        console.log("hello huihui1!");
        fn();
        console.log("hello huihui2!")
    }
}
hello = WrapperHello(hello);
hello();  //返回新函数

* 属性代理：
function WrapperHello(Comp) {
    class WrapperHelloComp extends Component{
        render (){
            return <div>
                <h5>hello niuniu!</h5>
                <Comp name="ccc" {...this.props} />
            </div>
        }
    }
    return WrapperHelloComp
}

class Hello extends Component{
    render (){
        return <h5>hello huihui!<em>{this.props.name}</em></h5>
    }
}

Hello = WrapperHello(Hello); ==>简写为
@WrapperHello
class Hello extends Component{...}

显示调用：<Hello></Hello>

* 反向继承：
```

> Socket.io
```
* 基于事件的实时双向通信库
    1. 基于webscoket协议
    2. 前后端通过事件进行双向通信
    3. 配合express,快速开发实时应用

* Socket.io 和 ajax 区别：
    * 基于不同的网络协议
        1. Ajax基于http协议，单向，实时获取数据只能论询
        2. Socket.io基于webscoket协议，后端可以主动推送数据
        3. 现代浏览器均支持webscoket协议

* Socket.io 后端API 配合express
    1. Io = require('socket.io')(http)
    2. io.on 监听事件
    3. io.emit 触发事件

* Socket.io 前端API 配合express
    1. import io from 'socket.io-client'
    2. io.on 监听事件
    3. io.emit 触发事件

npm install socket.io --save
npm install socket.io-client --save
```

> 聊天发送消息
```
<Route path='/chat/:user' component={Chat} />

server:
const server = require('http').Server(app);
const io = require('socket.io')(server);
//io 全局连接请求
io.on('connection',function(socket){
    //socket 当前连接请求
    socket.on('sendMsg',function(data){
        console.log(data);
        //发送全局消息
        io.emit('receiveMsg',data);
    })
})

chat.js :
//import io from 'socket.io-client'
//let socket = io('ws://localhost:5203');

@withRouter
@connect(
    state=>state,
    { getMsgList,sendMsg,recvMsg }
)

componentDidMount(){
   //发起连接  接收的全局消息
   /*socket.on('receiveMsg',(data)=>{
        this.setState({ msg:[...this.state.msg,data.text] })
    })*/

   //判断是否已有信息
   if(!this.props.chat.chatMsg.length) {
       this.props.getMsgList();
       this.props.recvMsg();
   }
}

//发送消息
handlerSubmit = ()=>{
    // socket.emit('sendMsg',{text:this.state.text});

    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});

    this.setState({ text:'' });
}

const userid = this.props.match.params.user;
const {users, chatMsg} = this.props.chat;
{chatMsg.map((item, index) =>{}
name: {users[userid].name}
avatar: require(`../../assert/image/avatar/${users[item.from].avatar}.jpg`)

---------------------------------------------------
chat.redux.js:
const MSG_LIST = 'MSG_LIST';   //获取聊天列表
const MSG_RECV = 'MSG_RECV';   //读取信息
const MSG_READ = 'MSG_READ';   //标识已读

case MSG_LIST:
    return {
        ...state,
        chatMsg:action.payload.msgs,
        unread:action.payload.msgs.filter(item => !item.read).length,
        users:action.payload.users
    }
case MSG_RECV:
    return {
        ...state,
        chatMsg:[...state.chatMsg,action.payload],
        unread:state.unread + 1
    }

数据模型|model.js：
chat:{
    'chatid':{type:String, require:true}, //id排序 ，一次查询

    'from':{type:String, require:true},  //从那里发出来
    'to':{type:String, require:true},  //发给谁

    'read':{type:Boolean, default:false}, //已读数据，只对 to有效

    'content':{type:String, require:true, default:''},  //内容
    'createTime':{type:Number, default:new Date().getTime()}  //时间戳
}

bug:
1. 初次发送消息会显示多次
2. 路由可随意切换
3. 过滤后brage 点击消息页才显示数量
```

> 聊天消息过滤
```
util.js:
/**
 * 聊天消息过滤
 * 根据数据模型 里面的 from and to 过滤出 chatid
 */
export function getChatId(userId, targetId){
    return [userId, targetId].sort().join('_');
}

chat.js:
import {getChatId} from "../../util/util";
let {users, chatMsg} = this.props.chat;
const chatid = getChatId(userid, this.props.user._id);
chatMsg = chatMsg.filter(item => item.chatid == chatid);

```

> bug修复
```
定位：disabord.js

1. 过滤后brage 点击消息页才显示数量
未加载获取消息方法
componentDidMount(){
    this.props.getMsgList();
    this.props.recvMsg();
}

2.初次发送消息会显示多次
原因：this.props.recvMsg();
添加判断
componentDidMount(){
    if(!this.props.chat.chatMsg.length) {
        this.props.getMsgList();
        this.props.recvMsg();
    }
}

3.未阅读数量对应到具体聊天人
chat.redux:
    已有的信息过滤
    case MSG_LIST:
        return {
            ...state,
            chatMsg:action.payload.msgs,
            //过滤消息： 当前发送目标是当前登录人
            unread:action.payload.msgs.filter(item => !item.read && item.to == action.payload.userid).length,
            users:action.payload.users
        }

    export function msgList(msgs,users,userid){
        return {type:MSG_LIST, payload:{msgs,users,userid}}
    }

    export function getMsgList() {
        return (dispatch,getState)=>{
            axios.get('/user/getMsgList').then(res=>{
                if(res.status === 200 && res.data.code === 0 ){
                    //新增userid
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users,userid));
                }
            })
        }
    }

    新发送的信息过滤
    case MSG_RECV:
        return {
            ...state,
            chatMsg:[...state.chatMsg,action.payload],
            //判断是否是当前登录人，不是则加1
            unread:action.payload.msg.from == action.payload.userid ? state.unread : state.unread + 1
        }

    export function msgList(msgs,users,userid){
        return {type:MSG_LIST, payload:{msgs,users,userid}}
    }

    export function getMsgList() {
        return (dispatch,getState)=>{
            axios.get('/user/getMsgList').then(res=>{
                if(res.status === 200 && res.data.code === 0 ){
                    //新增userid
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users,userid));
                }
            })
        }
    }


```

> emoj表情：
```
https://emojipedia.org/
谷歌浏览器的emoji扩展插件（Chromoji）:使其在window版本的谷歌浏览器上正常显示

const emoj = '😁 😂 😅 😆 😉 😊 😋 😎 😍 😍 😘 😗 😚 ☺ 😣 😥 😣 😪 😫 😌 😜 😝 😒 😓 😔 😲 😢 😇 😷 😠 😇 👻 💩 👦 👧 👨 👩 👴 👵 👋 💋 ☂️'
                .split(' ').filter(item => item == item).map(item => ({text:item}))

//使用宫格轮播显示bug解决
componentDidMount(){
    setTimeout(function () {
       window.dispatchEvent(new Event('resize'));
    },0)
}

```

> 消息列表
```
    const currentId = this.props.user._id;
    let { users,chatMsg } = this.props.chat;

    let msgGroup = {};
    //将聊天人信息分组
    chatMsg.forEach(item =>{
        msgGroup[item.chatid] = msgGroup[item.chatid] || [];
        msgGroup[item.chatid].push(item);
    });

    //转为数组并显示排序 createTime
    const chatList = Object.values(msgGroup).sort((a,b)=>{
        const a_last = this.getLastList(a).createTime;
        const b_last = this.getLastList(b).createTime;
        return b_last - a_last;
    });


    {chatList.map((item,index) => {
        let last = this.getLastList(item);
        let target = last.from === currentId ? last.to : last.from;
        let unread = item.filter(itemR => !itemR.read && itemR.to == currentId);
        if(!users[target]){return null;}

        return (
            <Item
                key = {index}
                arrow="horizontal"
                thumb={require(`../../../assert/image/avatar/${users[target].avatar}.jpg`)}
                multipleLine
                onClick={()=>this.handlerRedict(target)}
                extra={<Badge text={unread.length} overflowCount={10} />}
            >
                {users[target].name}
                <Brief>{last.content}</Brief>
            </Item>
        )})
    }
```

> 已读信息过滤
```
chat:
    componentDidMount(){
       //设置已读
       const to = this.props.match.params.user;
       this.props.readMsg(to);
    }

chat.redux:
    case MSG_READ:
        return {
            ...state,
            /*chatMsg:state.chatMsg.map(item =>{
                    item.read = true;
                    return item;
                }),*/
            chatMsg:state.chatMsg.map(item=>{ return {...item, read :true} }),
            unread:state.unread - action.payload.num
        }

    export function msgRead(from,userid,num){
        return {type:MSG_READ, payload:{from,userid,num}}
    }

    //已读数据
    export function readMsg(from){
        return (dispatch, getState) =>{
            axios.post('/user/readMsgList',{from}).then(res=>{
                if(res.status === 200 && res.data.code === 0 ){
                    const userid = getState().user._id;
                    dispatch(msgRead({userid,from,num: res.data.num}));
                }
            })
        }
    }

user:
    //设置已读
    Router.post('/readMsgList',function (req,res) {
        const userid = req.cookies.userid;
        const {from} = req.body;

        Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err, doc){
            console.log(doc)
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
        })
    })

bug:
新点进去才会监听已读，已在聊天界面，已读消息状态还在

方法1. 每次发通知告诉后端
方法2. 退出时就设置全部已读，根据路由
chat :
    //退出时移除事件
    componentWillUnmount(){
        //设置已读
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    新bug:
    退出当前聊天信息界面后，与其他所有人的未读消息都变成已读了（消息列表没有未读数据显示）
    chat.redux:修改为--> ({...item, read : action.payload.from === item.from ? true : item.read})
```
