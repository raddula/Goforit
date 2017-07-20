var http=require('http'),
place = require('./place.js'),
path = require('path'),
fs = require('fs'),
express = require("express");

var app = express();

http.createServer(function(request,res){
  
	fs.readFile('/Users/yc05ea1/Work/POC/Goforit/ui/mediauploader.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
	
}).listen(8080);
console.log("Server Running on 8080"); 

app.post('/upload', function (req, res) {
	
	var tempPath = req.files.file.path,
    targetPath = path.resolve('/Users/yc05ea1/image.jpg');

    fs.rename(tempPath, targetPath, function(err) {
        if (err) throw err;
        console.log("Upload completed!");
    });

// ...
});