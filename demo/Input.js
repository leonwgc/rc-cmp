import PlaceholderInput from '../src/PlaceholderInput';
import { observer, inject } from 'mobx-react';
import React from 'react';

const InputDemo = ({ store }) => {
  return (
    <div>
      <h1>placeholder (fix ie9 input placeholder ) </h1>
      <PlaceholderInput placeholder="type here" name="name" value={store.name} onChange={store.onChange} />
    </div>
  );
};

export default inject('store')(observer(InputDemo));
