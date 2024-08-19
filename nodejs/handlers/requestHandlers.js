// const exec = require("child_process").exec;
const fs = require("fs");
const querystring = require("querystring");
const formidable = require("formidable");
util = require("util");

const start = (request, response) => {
  fs.readFile("./view/upload.html", "utf-8", (err, data) => {
    if (data) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
};
const upload = (request, response) => {
  const form = new formidable.IncomingForm();
  form.parse(request, (err, fields, files) => {
    console.log(files.upload)
    fs.renameSync(files.upload[0].filepath,'/tmp/test.png')
    // const res = util.inspect({ fields: fields, files: files });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("upload page:\n\n");
    response.write("<img src='/show' style='widhth:80px;height:80px;' />");
    response.end();
  });
};

const show = (request,response) => {
  fs.readFile("./tmp/test.png", "binary", (error, file)=> {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
    }
    response.end();
  });
};

module.exports = {
  start,
  upload,
  show,
};
