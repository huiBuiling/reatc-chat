const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

//新建app
const app = express();
app.use(cookieParser());
app.use(bodyParser.json())

app.use('/user',userRouter);
app.get('/data',function(req,res){
    res.json({name:"huihui",age:"21"})
});
app.listen(5202,function(){
    console.log('Node app start at port 5202');
})