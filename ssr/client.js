import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';

console.log('begin to render client in 2s...');
setTimeout(() => {
  render();
}, 2000);

function render() {
  ReactDOM.render(<Clock />, document.getElementById('app'));
}
