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
        'chatid':{type:String, require:true}, //id排序 ，一次查询

        'from':{type:String, require:true},  //从那里发出来
        'to':{type:String, require:true},  //发给谁

        'read':{type:Boolean, default:false}, //已读数据，只对 to有效

        'content':{type:String, require:true, default:''},  //内容
        'createTime':{type:Number, default:new Date().getTime()}  //时间戳
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