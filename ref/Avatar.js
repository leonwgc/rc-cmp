import React, { Component } from 'react';
import { Upload, Icon, message, Modal } from 'antd';
import './Avatar.scss';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  // ie9 no type and size props, only has name as path
  // const isJPG = file.type === 'image/jpeg';
  // if (!isJPG) {
  //   message.error('You can only upload JPG file!');
  // }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJPG && isLt2M;
}

function ieProgress(file) {}

export default class Avatar extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    if (typeof FormData === 'undefined' && !this.timer) {
      // old browser ie9
      this.timer = window.setInterval(() => {
        this.setState({
          fileList: fileList.map(item => {
            if (item.status === 'done' && item.percent !== 100) {
              item.percent = 100;
            }
            return item;
          })
        });
      }, 200);
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          data={{ name: 'wgc', age: 18 }}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          action="http://localhost:3001/api/upload"
          beforeUpload={beforeUpload}>
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="image" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
