const db = require("../db/index");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jsonwebtoken = require('jsonwebtoken')

const user = {
  // 登录处理
  login: (req, res) => {
    const userInfo = req.body;
    const { username, password } = userInfo;
    const sqlStr = "SELECT * FROM users WHERE username=?";
    db.query(sqlStr, username, (err, resl) => {
      if (err) return res.err(err);
      if (resl.length !== 1) return res.err("用户不存在");
      //判断密码是否准确
      const isSame = bcrypt.compareSync(password,resl[0].password);
      if(isSame === false) return res.err('密码错误');
      // 登录成功，生成token并返回
      const jwtSecretKey = 'LLY'
      const user = {...resl[0],password:null,user_pic:null};
      const token = jsonwebtoken.sign(user,jwtSecretKey,{expiresIn: '12h'});
      res.success('登录成功',{token:`Bearer ${token}`})
    });
  },
  //注册处理
  reguser: (req, res) => {
    const userInfo = req.body;
    const { username, password } = userInfo;
    // 判断是否为空
    // if(!username || !password){
    //   return res.err('用户名或密码不合法')
    // }
    // 数据库查询
    const sqlStr = "SELECT * FROM users WHERE username=?";
    db.query(sqlStr, username, (err, res1) => {
      if (err) return res1.err("查询失败");
      if (res1.length) return res.err("用户名已存在");
      // 密码加密
      const pw = bcrypt.hashSync(password, 10);
      // 写入
      const sql = "INSERT INTO users SET ?";
      const obj = { username, password: pw };
      db.query(sql, obj, (err, res2) => {
        if (err) return res.err(err);
        if (res2.affectedRows !== 1) return res.err("注册失败");
        res.success('注册成功')
      });
    });
  },
};

module.exports = user;
