var express = require('express');
var app = express();

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Clock from './Clock';
var serveStatic = require('serve-static');

app.use(serveStatic('dist'));

const port = 3002;

function genDoc(title, html) {
  return `<html>

<head>
  <meta charset="utf-8">
  <meta httpequiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>
    ${title}
  </title>
</head>

<body>
  <div id="app">
  ${html}
  </div>
<script type="text/javascript" src="client.js"></script></body>

</html>`;
}

app.get('/', function(req, res) {
  var html = ReactDOMServer.renderToString(<Clock />);
  res.send(genDoc('ssr', html));
});

app.listen(port);

console.log('server running at ' + port);
