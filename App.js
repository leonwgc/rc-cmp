import React from 'react';
import ReactDOM from 'react-dom';
import Pager from './src/Pager';

export default () =>
  <div>
    <Pager pageCount={20} onPageChange={page => console.log(page)} />
  </div>;
