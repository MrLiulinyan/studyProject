const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        "postcss-preset-env", // 能解决大多数样式兼容性问题
      ],
    },
  },
};

module.exports = {
  mode: "development", // 模式
  entry: "./src/main.js", // 入口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true, // 清除dist文件夹
  }, // 输出
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配 .css结尾文件
        use: [MiniCssExtractPlugin.loader, "css-loader", postcssLoader], // use 数组里面 Loader 执行顺序是从右到左
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          postcssLoader,
          "less-loader",
        ],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  }, // 模块
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new VueLoaderPlugin(),
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/main.css",
    })
  ], // 插件
  devServer: {
    // host: "http://localhost", // 主机
    //port: 8085, // 端口
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
