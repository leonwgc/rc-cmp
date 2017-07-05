var express = require('express');
var app = express();
var cors = require('cors');
var formidable = require('formidable'),
  http = require('http'),
  util = require('util');
var serveStatic = require('serve-static');
var path = require('path');

app.use(serveStatic(path.resolve(__dirname, './files')));
app.use(serveStatic(path.resolve(__dirname, './preact/')));
app.use(cors());

app.get('/api', function(req, res) {
  res.send('Hello World');
});

app.post('/wapi/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = './files/';
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(
      JSON.stringify({ content: { url: `http://localhost:3001` + files.file.path.slice(5)} })
    );
    res.end();
  });

  return;
});

app.listen(3001);

console.log('server running at ' + 3001);
