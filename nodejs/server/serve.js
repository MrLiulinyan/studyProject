const http = require("http"); // nodejs 自带 http模块
const url = require("url");

const start = (route, handle) => {
  const onRequest = (request, response) => {
    console.log("Request received"); // 可能输出2次，那是因为大部分浏览器都会在你访问 http://localhost:8888/ 时尝试读取 http://localhost:8888/favicon.ico
    // response.writeHead(200,{'Content-Type':'text/plain'}) // 当收到请求时，使用 response.writeHead() 函数发送一个HTTP状态200和HTTP头的内容类型（content-type）
    const pathName = url.parse(request.url).pathname; // 获取路径名称
    route(pathName, handle, request, response);
    // let postData = "";
    // request.setEncoding("utf8");
    // request.addListener("data", (postDataChunk) => {
    //   postData += postDataChunk;
    // });
    // request.addListener("end", function () {
    //   // console.log(postData, "end");
    //   route(pathName, handle, request, response, postData);
    // });
    // response.write(content) //使用 response.write() 函数在HTTP相应主体中发送文本“Hello World"
    // response.end() //调用 response.end() 完成响应
  };
  // createServer返回一个对象，对象有个listen方法 listen参数为http服务监听的端口号
  const server = http.createServer();
  server.on('request',onRequest);
  server.close();
  server.listen(8881);
  console.log("Server has started");
};

module.exports.start = start;
