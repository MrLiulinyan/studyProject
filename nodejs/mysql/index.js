const mysql = require('mysql')
// 连接数据库
const db = mysql.createPool({
    host:'127.0.0.1', //数据库的IP地址
    user:'root', //数据库用户名
    password:'LLYlikeZYN', //数据库密码
    database:'lean_sql' //数据库名称
})
//测试
// db.query('SELECT 1',(err,res)=>{
//   if(err) return 
//   console.log(res)
// })
const sqlStr = 'INSERT INTO users (username,password) VALUES (?,?)'
db.query(sqpStr,['zhangsan','123456'],(err,res)=>{
   if(err) return
   if(res.affectedRows === 1) console.log('成功')
})

module.exports = db