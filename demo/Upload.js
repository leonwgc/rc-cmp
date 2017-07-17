import Upload from '../src/tp/index';
import UploadBox from '../src/UploadBox';
import { observer, inject } from 'mobx-react';
import React from 'react';

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

const UploadDemo = ({ store }) => {
  return (
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
  );
};

export default inject('store')(observer(UploadDemo));
