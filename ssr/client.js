import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';

function render() {
  ReactDOM.render(<Clock />, document.getElementById('app'));
}

render();
