const path = require('path');

module.exports = {
    entry: "./src/main.js",  // 入口
    output:{
        path: path.resolve(__dirname,"dist"),
        filename:'main.js',
    }, // 输出
    module:{}, // 模块
    plugins:[], // 插件
    devServer:{}, // 开发服务器
    resolve:{}, // 解析
    optimization:{}, // 优化
    devtool:'eval', // 调试工具
    performance:{}, // 性能
    externals:{}, // 外部依赖
    optimization:{}, // 优化
    mode: "production", // 模式
}