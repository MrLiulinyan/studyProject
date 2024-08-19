const Joi = require("joi");

const id = Joi.number().integer().min(1).required();
const nickname = Joi.string().required();
const email = Joi.string().email().required();
const password = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required();
const avatar = Joi.string().dataUri().required();

const updateRules = {
  body: {
    id,
    nickname,
    email,
  },
};

const updatePwdRules = {
  body: {
    oldPwd: password,
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
  },
};

const updateAvatarRules = {
  body: {
    avatar,
  },
};

module.exports = { updateRules, updatePwdRules, updateAvatarRules };
