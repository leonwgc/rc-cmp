import React, { Component } from 'react';
import classNames from 'classnames';
import './UploadBox.scss';
import { observer, inject } from 'mobx-react';

@observer
export default class UploadBox extends Component {
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
                <span className="delete" onClick={this.doDelete}>
                  x
                </span>
              </div>
            </div>}
      </div>
    );
  }
}
