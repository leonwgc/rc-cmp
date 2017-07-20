import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Dialog.scss';
import utility from './utility';

const ESC_KEY = 27;

export default class Dialog extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool
  };

  open = () => {
    if (!this.isOpen) {
      this.isOpen = true;
      utility.removeClass(this.dialog, 'x-hide');
      utility.reflow(this.dialog);
      utility.addClass(this.content, 'in');
      utility.addClass(this.overlay, 'in');
    }
  };

  close = () => {
    if (this.isOpen) {
      this.isOpen = false;
      if (this.props.onClose) {
        this.props.onClose();
      }
      utility.removeClass(this.overlay, 'in');
      utility.removeClass(this.content, 'in');
      setTimeout(() => {
        utility.addClass(this.dialog, 'x-hide');
      }, 300);
    }
  };

  handleESC = e => {
    if (e.keyCode === ESC_KEY) {
      this.close();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleESC);
    if (this.props.isOpen) {
      this.open();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleESC);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      nextProps.isOpen ? this.open() : this.close();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={dialog => (this.dialog = dialog)}
        className={classNames('rc-dialog x-hide')}>
        <div
          ref={overlay => (this.overlay = overlay)}
          onClick={this.close}
          className={classNames('rc-dialog-overlay out')}
        />
        <div
          ref={content => (this.content = content)}
          className={classNames('rc-dialog-body out')}>
          {children}
        </div>
      </div>
    );
  }
}
