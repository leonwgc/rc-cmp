import React, { Component } from 'react';
import Pager from './src/Pager';
import Dialog from './src/Dialog';
import Upload from './src/tp/index';
import PlaceholderInput from './src/PlaceholderInput';
import UploadBox from './src/UploadBox';
import { observer, inject } from 'mobx-react';
import './App.scss';

import Avatar from './ref/Avatar';

const uploaderProps = {
  action: 'http://localhost:3001/api/upload',
  data: { name: 'leon', age: 18 },
  headers: {
    myHeader: 'leonwgc'
  },
  multiple: true,
  beforeUpload(file) {
    console.log('beforeUpload', file.name);
  },
  onStart: file => {
    console.log('onStart', file.name);
    // this.refs.inner.abort(file);
  },
  onSuccess(file) {
    console.log('onSuccess', file);
  },
  onProgress(step, file) {
    console.log('onProgress', Math.round(step.percent), file.name);
  },
  onError(err) {
    console.log('onError', err);
  }
};

@inject('store')
@observer
export default class App extends Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        <h1>pagination </h1>
        <Pager pageCount={this.props.store.pageCount} onPageChange={this.props.store.onPageChange} />
        <div>current page is: <span className="hilight"> {this.props.store.page}</span></div>
        <div>
          <h1>placeholder input support IE </h1>
          <PlaceholderInput placeholder="type here" name="name" value={this.props.store.name} onChange={this.props.store.onChange} />
          <button disabled={!this.props.store.formIsValid}>submit</button>
        </div>
        <div>
          <h1>dialog </h1>
          <button
            onClick={() => {
              store.setData({ isOpen: true });
            }}>
            open dialog
          </button>
          <Dialog
            isOpen={store.isOpen}
            close={() => {
              store.setData({ isOpen: false });
            }}>
            <div style={{ width: '400px', height: '200px' }}>
              <div>hello world</div>
              <p><PlaceholderInput placeholder="type here" name="name" value={this.props.store.name} onChange={this.props.store.onChange} /></p>
            </div>
          </Dialog>
        </div>
        <div>
          <h1>upload </h1>
          <Upload {...uploaderProps} component="div" style={{ display: 'inline-block' }}>
            <UploadBox />
          </Upload>

        </div>
        <div>
          <h1>upload antd </h1>
          <Avatar />

        </div>

      </div>
    );
  }
}
