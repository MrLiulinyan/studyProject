const db = require("../db/index");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jsonwebtoken = require('jsonwebtoken');

const login = {
    // 登录页
    login: (req, res) => {
      res.render('login')
    },
    // 表单提交
    loginForm:(req,res)=>{
      console.log('提交表单')
      res.redirect('/app/home')
    }
  };
  
  module.exports = login;