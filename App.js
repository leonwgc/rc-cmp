import React, { Component } from 'react';
import Pager from './src/Pager';
import Dialog from './src/Dialog';
import Upload from './src/tp/index';
import PlaceholderInput from './src/PlaceholderInput';
import UploadBox from './src/UploadBox';
import { Tabs, Tab } from './src/Tabs';
import { Steps, Step } from './src/Steps';
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
        <div>
          <h1>Tabs</h1>
          <Tabs cls="test">
            <Tab title="tab1"><div>content1</div></Tab>
            <Tab title="tab2" active>
              <div>
                <button onClick={e => (store.isOpen = true)}>
                  open dialog
                </button>
              </div>
            </Tab>
            <Tab title="tab3"><div>content3</div></Tab>
            <Tab title="tab4"><div>content4</div></Tab>
            <Tab title="tab5"><div>content5</div></Tab>
          </Tabs>

          <Tabs cls="test">
            <Tab title="one tab">
              <div>
                <button onClick={e => (store.isOpen = true)}>
                  open dialog
                </button>
              </div>
            </Tab>
          </Tabs>

          <Tabs cls="">
            <Tab title="tab without content" />
            <Tab title="tab2" />
          </Tabs>
        </div>
        <div>
          <h1>Steps</h1>
          <Steps step={store.step}>
            <Step title="step1" />
            <Step title="step2" />
            <Step title="step3" />
            <Step title="step4" />
          </Steps>
        </div>

        <div>
          <Steps step={store.step} cls="my-steps">
            <Step title="step1" />
            <Step title="step2" />
            <Step title="step3" />
            <Step title="step4" />
          </Steps>
        </div>
        <div>
          <button
            type="button"
            onClick={e => {
              if (store.step < 3) {
                store.step++;
              } else {
                store.step = 0;
              }
            }}>
            Next Step
          </button>
        </div>
      </div>
    );
  }
}
