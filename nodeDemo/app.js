const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const userInfoRouter = require("./router/userInfo");
const loginRouter = require('./router/login');
const Joi = require("joi");
const { expressjwt } = require("express-jwt");

//创建服务器的实例对象
const app = express();
//设置端口，成功回调
app.listen("3007", () => {
  console.log("启动 127.0.0.1:3007");
});
// 静态资源
app.use('/static',express.static('static'));
//模板引擎
app.set('views','./views');
app.set('view engine','ejs');
// HTML渲染
// app.set('view engine','html')
// app.engine('html',require('ejs').renderFile)

// 解决接口跨域中间件
app.use(cors());
// 解析表单数据中间件 解析类型application/x-www-form-unlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// cookie中间件 cookie-parser
// 解析token
app.use(
  expressjwt({ secret: "LLY", algorithms: ["HS256"] }).unless({
    path: [/^\/api/,/^\/app/],
  })
);
// 请求错误返回函数
app.use((req, res, next) => {
  res.err = (err, status = 1) => {
    res.send({
      status,
      mesaage: err instanceof Error ? err.message : err,
    });
  };
  next();
});
// 请求成功返回函数
app.use((req,res,next)=>{
  res.success=(message = '请求成功',data=null,status = 0)=>{
    res.send({
      status,
      message,
      data
    });
  }
  next()
})
// 路由注册
app.use("/api", userRouter);
app.use("/my", userInfoRouter);
//页面路由
app.use('/app',loginRouter);
// 全局错误中间件，错误处理
app.use((err, req, res, next) => {
  // 校验失败导致的错误
  if (err instanceof Joi.ValidationError) return res.send({ status:1, mesaage: err });
  if (err.name === "UnauthorizedError") return res.send({ status:1, mesaage: "身份认证失败！" });
  //其他错误
  res.send({ status:1, mesaage: err });
});

// 73,32,76,79,86,69,32,89,79,85