const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user');

Router.post('/register',function (req,res) {
    console.log(req.body)
    let {user, pwd, type} = req.body;
    User.findOne({user},function (err, doc) {
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        pwd = md5Pwd(pwd);
        User.create({user,pwd,type},function (err, doc) {
            debugger
            if(err){
                return res.json(err)
                // return res.json({code:1, msg:'后端出错了'})
            }
            return res.json({code:0})  //登录成功
        })
    })
})

Router.get('/list',function (req,res) {
    User.find({},function (err, doc) {
        return res.json(doc);
    })
})


Router.get('/info',function (req,res) {
    return res.json({code:1})
})

//加密算法
function md5Pwd(pwd) {
    const salt = 'react_is_chat_13412424324xfsfdvsdfgfdgdfs!@~~';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router