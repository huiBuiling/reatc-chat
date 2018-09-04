const mongoose = require('mongoose');
//连接mongo 且使用此地址集合
const DB_URL = 'mongodb://localhost:27017/chat'
mongoose.connect(DB_URL);
//连接成功打印
mongoose.connection.on('connected',function () {
    console.log('mongo connect success')
})

//数据库模型
const models = {  //对应属性不相符则无法插入
    user:{
        'user':{type:String, require: true},
        'pwd':{type:String, require:true},
        'type':{type:String, require:true},
        'avatar':{type:String},   //头像
        'desc':{type:String},     //个人简介或职位简介
        'title':{type:String},    //职位名
        'company':{type:String},  //boss字段  公司名
        'money':{type:String}     //boss字段  薪资
    },
    chat:{

    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function (name) {
       return mongoose.model(name)
    }
}