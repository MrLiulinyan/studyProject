const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production", // 模式
  entry: "./src/main.js", // 入口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/main.js",
    clean: true, // 清除dist文件夹
  }, // 输出
  module: {
    rules:[
      {
        test: /\.css$/, // 匹配 .css结尾文件
        use: [MiniCssExtractPlugin.loader, "css-loader"], // use 数组里面 Loader 执行顺序是从右到左
        // generator: {
        //     filename: "css/[hash:8][ext][query]",
        //   },
      },
      {
        test: /\.less$/,
        use:[MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.vue$/,
        use:["vue-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "img/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(map4|map3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "media/[hash:8][ext][query]",
        },
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
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/main.css",
    })
  ], // 插件
  resolve: {}, // 解析
  optimization: {}, // 优化
  devtool: 'eval', // 调试工具
  performance: {}, // 性能
  externals: {}, // 外部依赖
  optimization: {}, // 优化
};