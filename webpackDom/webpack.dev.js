const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development", // 模式
  entry: "./src/main.js", // 入口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  }, // 输出
  module: {
    rules:[
      {
        test: /\.css$/, // 匹配 .css结尾文件
        use: ["style-loader", "css-loader"], // use 数组里面 Loader 执行顺序是从右到左
      },
      {
        test: /\.less$/,
        use:["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.vue$/,
        use:["vue-loader"]
      }
    ],
    generator:{
      asset:''
      // filename: "static/images/[hash:8][ext][query]",
    }
  }, // 模块
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new VueLoaderPlugin()
  ], // 插件
  devServer: {
    host: "127.0.0.1", // 主机
    port: 8085, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 热更新
  }, // 开发服务器
  resolve: {}, // 解析
  optimization: {}, // 优化
  devtool: "source-map", // 调试工具
  performance: {}, // 性能
  externals: {}, // 外部依赖
  optimization: {}, // 优化
};
