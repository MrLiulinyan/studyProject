module.exports = {
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // 继承其他规则
  // extends: ["plugin:vue/essential"],
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  // 具体检查规则
  rules: {
    // "no-var": 2,
    // "no-console": "error",
    // semi: "error",
  },
  globals: {},
};
