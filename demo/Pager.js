import Pager from '../src/Pager';
import { observer, inject } from 'mobx-react';
import React from 'react';

const PagerDemo = ({ store }) => {
  return (
    <div>
      <h1>pagination </h1>
      <Pager pageCount={store.pageCount} onPageChange={store.onPageChange} />
      <div>
        current page is: <span className="hilight"> {store.page}</span>
      </div>
    </div>
  );
};

export default inject('store')(observer(PagerDemo));
