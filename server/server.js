const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
//with express
const server = require('http').Server(app);

const model = require('./model')
const Chat = model.getModel('chat');

const io = require('socket.io')(server);
//io 全局连接请求
io.on('connection',function(socket){
	// console.log('user login');
	//socket 当前连接请求
	socket.on('sendMsg',function(data){
		//发送全局消息
		// io.emit('receiveMsg',data);
		console.log(data);
		
		const {from, to, msg} = data;
		const chatid = [from,to].sort().join('_');

		Chat.create({chatid,from, to, content:msg},function(err, doc){
			io.emit('receiveMsg',Object.assign({},doc._doc))
		})
	})
})

const userRouter = require('./user');

//新建app
app.use(cookieParser());
app.use(bodyParser.json()); //可以解析post请求接收的json数据

app.use('/user',userRouter);

//测试
app.get('/data',function(req,res){
    res.json({name:"huihui",age:"21"})
});

server.listen(5203,function(){
// app.listen(5203,function(){
    console.log('Node app start at port 5203');
})