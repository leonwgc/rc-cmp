import React, { Component } from 'react';

//https://github.com/akiran/react-ssr/blob/master/lib/html.jsx

class Html extends Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>
            {this.props.title}
          </title>
        </head>
        <body>
          <div id="app">
            {this.props.children}
          </div>
        </body>
      </html>
    );
  }
}

export default Html;
