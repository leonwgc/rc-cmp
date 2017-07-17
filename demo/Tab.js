import { Tabs, Tab } from '../src/Tabs';
import { observer, inject } from 'mobx-react';
import React from 'react';

const TabDemo = ({ store }) => {
  return (
    <div>
      <h1>Tabs</h1>
      <Tabs cls="test">
        <Tab title="tab1">
          <div>content1</div>
        </Tab>
        <Tab title="tab2" active>
          <div>
            <button onClick={e => (store.isOpen = true)}>open dialog</button>
          </div>
        </Tab>
        <Tab title="tab3">
          <div>content3</div>
        </Tab>
        <Tab title="tab4">
          <div>content4</div>
        </Tab>
        <Tab title="tab5">
          <div>content5</div>
        </Tab>
      </Tabs>

      <Tabs cls="test">
        <Tab title="one tab">
          <div>
            <button onClick={e => (store.isOpen = true)}>open dialog</button>
          </div>
        </Tab>
      </Tabs>

      <Tabs cls="">
        <Tab title="tab without content" />
        <Tab title="tab2" />
      </Tabs>
    </div>
  );
};

export default inject('store')(observer(TabDemo));
