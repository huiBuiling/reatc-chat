const mongoose = require('mongoose');
//链接mongo 且shi使用此地址集合
const DB_URL = 'mongodb://localhost:27017/chat'
mongoose.connect(DB_URL);

mongoose.connection.on('connected',function () {
    console.log('mongo connect success')
})

const models = {
    user:{
        'user':{type:String, require: true},
        'pwd':{type:Number, require:true},
        'type':{type:String, require:true},
        'avater':{type:String},   //头像
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
