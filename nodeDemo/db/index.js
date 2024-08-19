const mysql = require('mysql');

const db = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'LLYlikeZYN',
  database:'lean_sql'
})

module.exports = db