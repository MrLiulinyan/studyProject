const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const { updateRules,updatePwdRules } = require("../schema/userInfo");
const { getUserInfo, updateUserInfo, updateUserPwd,updateUserAvatar } = require("../routerHandler/userInfo");

// 获取用户信息
router.get("/userInfo", getUserInfo);
// 更新用户信息
router.post("/updateUserInfo", expressJoi(updateRules), updateUserInfo);
// 更改用户密码
router.post('/updatePwd',expressJoi(updatePwdRules), updateUserPwd);
// 更改头像
router.post('/updateAvatar',updateUserAvatar)

module.exports = router;
