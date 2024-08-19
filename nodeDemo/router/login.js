const express = require("express");
const router = express.Router();
const { login, loginForm } = require("../routerHandler/login");

//登录
router.get("/login", login);
router.post('/login', loginForm)
module.exports = router;