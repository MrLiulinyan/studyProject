说明：
 js处理：
 babel：将ES6代码转换为ES5代码
 相关依赖 @babel/core @babel/preset-env babel-loader
 css处理：
 mini-css-extract-plugin 将CSS从JS中提取出来，单独生成一个CSS文件，避免打包时，JS文件过大及加载时出现闪屏现象
 postcss-loader postcss postcss-preset-env CSS兼容性处理
 css-minimizer-webpack-plugin 将css压缩
问题：
1、.eslintignore 无效
2、extends 配置问题