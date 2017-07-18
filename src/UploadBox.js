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
  render() {
    var props = this.props;
    return (
      <div className="upload-box">
        {!props.image
          ? <div>
              <div className="trigger" />
              <div className="title">
                {props.title}
              </div>
            </div>
          : <div
              className="image-holder"
              style={{
                backgroundImage: `url(${props.image})`
              }}>
              <div className="overlay">
                <span className="delete" onClick={this.doDelete} />
              </div>
            </div>}
      </div>
    );
  }
}
