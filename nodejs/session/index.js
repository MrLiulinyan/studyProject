const session = require('express-session');

const sessionOp = session({
    secret:'sessionKey',
    resave:false,
    saveUninitialized:true
}) 

console.log(sessionOp)

module.exports = sessionOp