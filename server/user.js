const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user');
const _filter = {'pwd':0,'__v':0};  //过滤隐藏密码加密

//用户列表
Router.get('/list',function (req,res) {
    //删除全部数据
    // User.remove({},function (err,doc) {});

    //获取全部数据
    User.find({},function (err, doc) {
        return res.json(doc);
    })
})

//登录
Router.post('/login',function (req,res) {
    const { user, pwd } = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err, doc) {
        if(!doc){
            return res.json({code:1,msg:'用户名或密码不存在'})
        }
        res.cookie('userid', doc._id);  //写入cookie,判断是否登录
        return res.json({code:0,data:doc,msg:'已登录！'});
    })
})

//注册信息
Router.post('/register',function (req,res) {
    console.log(req.body)
    let {user, pwd, type} = req.body;
    User.findOne({user},function (err, doc) {
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        pwd = md5Pwd(pwd);  //加密

        const userModel = new User({user,type,pwd});
        userModel.save(function (err,doc) {
            if(err){
                return res.json({code:1,msg:'后端出错了！'})
            }
            const {user, type, _id} = doc;
            res.cookie('userid',_id);
            return res.json({code:0,data:{user, type, _id}})
        })

        /*User.create({user,pwd,type},function (err, doc) {
            if(err){
                return res.json(err)
                // return res.json({code:1, msg:'后端出错了'})
            }
            return res.json({code:0})  //登录成功
        })*/
    })
})

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

//加密算法
function md5Pwd(pwd) {
    const salt = 'react_is_chat_13412424324xfsfdvsdfgfdgdfs!@~~';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router