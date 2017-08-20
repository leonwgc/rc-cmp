var express = require('express');
var app = express();

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Clock from './Clock';
var serveStatic = require('serve-static');

app.use(serveStatic('dist'));

const port = 3002;

app.get('/', function(req, res) {
  var html = [
    `<html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {this.props.title}
        </title>
      </head>
      <body>
        `
  ];
  html.push(
    ReactDOMServer.renderToString(
      <div id="app">
        <Clock />
      </div>
    )
  );
  html.push(`
        <script type="text/javascript" src="client.js" ></script>
      </body>
    </html>`);
  res.send(html.join(''));
});

app.listen(port);

console.log('server running at ' + port);
