const express = require('express');
//新建app
const app = express();

app.get('/',function(req,res){
	res.send('<h1>Hello World!</h1>')
});

app.get('/data',function(req,res){
	res.json({name:"huihui",age:"21"})
});

app.listen(5202,function(){
	console.log('Node app start at port 5202');
})