import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UploadBox.scss';

export default class UploadBox extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    title: PropTypes.string
  };
  doDelete = e => {
    e.stopPropagation();
    this.props.onDelete();
  };
  getJsx = () => {
    if (!this.props.image) {
      return this.props.percent && this.props.percent < 100
        ? <div className="uploading">
            <div>正在上传...</div>
            <div className="title">
              {this.props.percent}%
            </div>
          </div>
        : <div>
            <div className="trigger" />
            <div className="title">
              {this.props.title}
            </div>
          </div>;
    } else {
      return (
        <div
          className="image-holder"
          style={{
            backgroundImage: `url(${this.props.image})`
          }}>
          <div className="overlay">
            <span className="delete" onClick={this.doDelete} />
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="upload-box">
        {this.getJsx()}
      </div>
    );
  }
}
