const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/',(req,res)=>{
    
    fs.readFile("./view/upload.html", "utf-8", (err, data) => {
        if (data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
})

module.exports = router