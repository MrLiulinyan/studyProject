const fs = require("fs");
const path = require("path");

const handle = () => {
  const demoHtmlPath = path.join(__dirname, "./index.html");
  fs.readFile(demoHtmlPath, "utf8", (err, data) => {
    if (err) {
      console.log(err, "读取文件失败");
      return false;
    }
    handleCSS(data);
    handleJS(data);
    handleNewHtml(data);
  });
};

const handleCSS = (data) => {
  const rules = /<style>[\s\S]*<\/style>/;
  const arr = rules.exec(data);
  if (arr.length) {
    const cssPath = path.join(__dirname, "./newFile/style.css");
    const cssData = arr[0].replace('<style>','').replace('</style>','')
    fs.writeFile(cssPath, cssData, (err) => {
      if (err) {
        console.log(err, "写入样式失败");
        return false;
      }
      console.log("写入样式成功");
    });
  }
};

const handleJS = (data) => {
  const rules = /<script>[\s\S]*<\/script>/;
  const arr = rules.exec(data);
  if (arr.length) {
    const jsPath = path.join(__dirname, "./newFile/script.js");
    const jsData = arr[0].replace('<script>','').replace('</script>','')
    fs.writeFile(jsPath, jsData, (err) => {
      if (err) {
        console.log(err, "写入JS失败");
        return false;
      }
      console.log("写入JS成功");
    });
  }
};

const handleNewHtml = (data) => {
    const cssPath = '<link rel="stylesheet" type="text/css" href="./style.css" />'
    const jsPath = '<script src="./script.js"></script>'
    const htmlPath = path.join(__dirname, "./newFile/newIndex.html");
    const newHtml = data.replace(/<style>[\s\S]*<\/style>/,cssPath).replace(/<script>[\s\S]*<\/script>/,jsPath)
    fs.writeFile(htmlPath, newHtml, (err) => {
        if (err) {
          console.log(err, "写入HTML失败");
          return false;
        }
        console.log("写入HTML成功");
      });
};

handle();
