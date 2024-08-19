const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const { loginRules } = require("../schema/user");
const { login, reguser } = require("../routerHandler/user");

//登录
router.post("/login", expressJoi(loginRules), login);
//注册
router.post("/reguser", expressJoi(loginRules), reguser);

module.exports = router;
