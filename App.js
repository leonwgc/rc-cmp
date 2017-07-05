import React, { Component } from 'react';
import Pager from './src/Pager';
import Dialog from './src/Dialog';
import Upload from './src/tp/index';
import PlaceholderInput from './src/PlaceholderInput';
import UploadBox from './src/UploadBox';
import { observer, inject } from 'mobx-react';
import './App.scss';

// import Avatar from './ref/Avatar';

const uploaderProps = {
  action: '/wapi/upload',
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
        <Pager
          pageCount={this.props.store.pageCount}
          onPageChange={this.props.store.onPageChange}
        />
        <div>
          current page is: <span className="hilight"> {this.props.store.page}</span>
        </div>
        <div>
          <h1>placeholder (fix ie9 input placeholder ) </h1>
          <PlaceholderInput
            placeholder="type here"
            name="name"
            value={this.props.store.name}
            onChange={this.props.store.onChange}
          />
          <button disabled={!this.props.store.formIsValid}>submit</button>
        </div>
        <div>
          <h1>dialog </h1>
          <button onClick={e => (store.isOpen = true)}>
            open dialog
          </button>
          <Dialog isOpen={store.isOpen} onClose={e => (store.isOpen = false)}>
            <div style={{ width: '400px', height: '200px' }}>
              <div>hello world</div>
              <button onClick={e => (store.isOpen = false)}>close dialog</button>
              <p>
                <PlaceholderInput
                  placeholder="type here"
                  name="name"
                  value={this.props.store.name}
                  onChange={this.props.store.onChange}
                />
              </p>
            </div>
          </Dialog>
        </div>
        <div>
          <h1>upload (support both xhr & iframe mode)</h1>
          <Upload
            {...uploaderProps}
            onSuccess={store.uploadSuccess}
            image={store.image}
            style={{ display: 'inline-block' }}>
            <UploadBox onDelete={store.deleteImage} title="点击上传" />
          </Upload>
        </div>

      </div>
    );
  }
}
