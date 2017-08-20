var express = require('express');
var app = express();

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Html from './ssr/Html';
import Clock from './ssr/Clock';

const port = 3002;

app.get('/', function(req, res) {
  var html = ReactDOMServer.renderToString(
    <Html>
      <Clock />
    </Html>
  );
  res.send(html);
});

app.listen(port);

console.log('server running at ' + port);
