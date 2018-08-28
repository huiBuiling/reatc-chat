const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

//新建app
const app = express();
app.use(cookieParser());
app.use(bodyParser.json()); //可以解析post请求接收的json数据

app.use('/user',userRouter);

//测试
app.get('/data',function(req,res){
    res.json({name:"huihui",age:"21"})
});

app.listen(5203,function(){
    console.log('Node app start at port 5203');
})