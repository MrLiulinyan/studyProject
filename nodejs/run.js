const express = require('express');
const app = express();
const router = require('./router/index');
const session = require('./session/index')

const errorHandle = (err,req,res,next)=>{
    console.log('未知错误',err.message)
    res.send('111')
    // next();
}

const eventHandle = (req,res,next)=>{
   console.log('中间件');
   next();
}


app.use(eventHandle)
app.use(router)
app.use(errorHandle)
app.use(session)

app.listen(81,()=>{
    console.log('启动')
})