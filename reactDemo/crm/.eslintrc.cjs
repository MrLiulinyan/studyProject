module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用consele
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用debugger
      'linebreak-style': 'off', // 忽略检测换行风格 详情在这 ↑
      'prefer-destructuring': ['error', { object: true, array: false }], // 允许数组通过下标取值
      'no-use-before-define': ['error', { functions: false }], // 允许function声明的函数在定义前使用
      'func-names': 'off', // 允许使用function声明匿名函数
      'max-len': ['error', { code: 200 }], // 每一行最多200个字符
      'import/no-extraneous-dependencies': 'off', // 允许import开发依赖
      'no-unused-expressions': 'off', // 允许出现未使用的表达式
      'import/extensions': 'off', // 允许import时省略扩展名
      'no-restricted-syntax': 'off', // 关闭 '禁止使用指定的语法'
      eqeqeq: 'off', // 关闭强制使用全等于
      'no-plusplus': 'off', // 允许使用++
      'import/no-cycle': 'off', // 允许循环引入
      'consistent-return': 'off', // 允许任意return值
      'no-unused-vars': ['error', { argsIgnorePattern: 'commit' }],
      'vue/multi-word-component-names': 'off', // 禁用组件名必须多个单词组成的规则
      'no-underscore-dangle': 'off', // 允许使用下划线开头的变量名 
  	'no-return-assign': ['error', 'except-parens'], // return 后如果有赋值语句，则必须加括号
  	'no-param-reassign': 'off', // 允许修改方法中的参数 
  },
}
