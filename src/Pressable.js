import React, { Component } from 'react';
import utility from './utility';
import './Pressable.scss';

const TOUCHABLE = 'ontouchend' in document;

class Pressable extends Component {
  onPressed = () => {
    utility.addClass(this.el, 'pressed');
  };

  onLeave = () => {
    utility.removeClass(this.el, 'pressed');
  };

  render() {
    return TOUCHABLE
      ? <span
          onTouchStart={this.onPressed}
          onTouchEnd={this.onLeave}
          ref={el => (this.el = el)}
          className="rc-pressable">
          {this.props.children}
        </span>
      : <span
          onMouseDown={this.onPressed}
          onMouseLeave={this.onLeave}
          onMouseUp={this.onLeave}
          ref={el => (this.el = el)}
          className="rc-pressable">
          {this.props.children}
        </span>;
  }
}

export default Pressable;
