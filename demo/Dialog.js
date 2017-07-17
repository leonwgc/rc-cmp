import Dialog from '../src/Dialog';
import { observer, inject } from 'mobx-react';
import React from 'react';

const DialogDemo = ({ store }) => {
  return (
    <div>
      <h1>dialog </h1>
      <button onClick={e => (store.isOpen = true)}>open dialog</button>
      <Dialog isOpen={store.isOpen} onClose={() => (store.isOpen = false)}>
        <div style={{ width: '400px', height: '200px' }}>
          <div>hello world</div>
          <button onClick={e => (store.isOpen = false)}>close dialog</button>
        </div>
      </Dialog>
    </div>
  );
};

export default inject('store')(observer(DialogDemo));
