var express = require('express');
var app = express();
var cors = require('cors');
var formidable = require('formidable'),
  http = require('http'),
  util = require('util');

app.use(cors());

app.get('/api', function(req, res) {
  res.send('Hello World');
});

app.post('/api/upload', function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('received upload:\n\n');
    res.end(util.inspect({ fields: fields, files: files }));
  });

  return;
});

app.listen(3001);
console.log('server running at ' + 3001);
