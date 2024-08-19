const db = require("../db/index");
const bcrypt = require("bcryptjs");

const userInfo = {
   // 获取用户信息
   getUserInfo:(req,res)=>{
      const sqlStr = 'SELECT id,username,nickname,email,user_pic FROM users WHERE id=?'
      const { id } = req.auth
      db.query(sqlStr,id,(err,res1)=>{
        if (err) return res.err(err);
        if (res1.length !== 1) return res.err("用户信息不存在");
        res.success('获取用户信息成功',res1[0])
      })
   },
   //更新用户信息
   updateUserInfo:(req,res)=>{
     const sqlStr = 'UPDATE users SET ? WHERE id=?';
     const { id } = req.auth
     db.query(sqlStr,[req.body,id],(err,res1)=>{
        if (err) return res.err(err);
        if (res1.affectedRows !== 1) return res.err("用户信息不存在，更新失败");
        res.success('更新用户信息成功')
     })
   },
   //更新用户密码
   updateUserPwd:(req,res)=> {
    const sqlStr = 'SELECT * FROM users WHERE id=?';
    const { id } = req.auth;
    const { oldPwd,newPwd } = req.body
    db.query(sqlStr,id,(err,res1)=>{
        if (err) return res.err(err);
        if (res1.length !== 1) return res.err("用户信息不存在");
        // 判断用户判断旧密码是否准确
        const isSame = bcrypt.compareSync(oldPwd,res1[0].password);
        if(isSame === false) return res.err('旧密码错误');
        //更新密码
        const newValue = bcrypt.hashSync(newPwd,10)
        const sql = 'UPDATE users SET password=? WHERE id=?'
        db.query(sql,[newValue,id],(err,res2)=>{
            if (err) return res.err(err);
            if (res2.affectedRows !== 1) return res.err("更改密码失败");
            res.success('更改密码成功')
        })
    })
   },
   //更新用户头像
   updateUserAvatar:(req,res)=>{
      const sqlStr = 'UPDATE users SET user_pic=? WHERE id=?';
      const { id } = req.auth;
      const { user_pic } = req.body
      db.query(sqlStr,[user_pic,id],(err,res1)=>{
        if (err) return res.err(err);
        if (res1.affectedRows !== 1) return res.err("更改头像失败");
        res.success('更改头像成功')
      })
   }
}

module.exports = userInfo