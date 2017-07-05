import React, { Component } from 'react';
import classNames from 'classnames';
import './Dialog.scss';

const ESC_KEY = 27;
const TIMEOUT = 150;

export default class Dialog extends Component {
  state = {
    animateIn: false,
    isOpen: false
  };

  open = () => {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true }, () => {
        setTimeout(() => this.setState({ animateIn: true }));
      });
    }
  };

  close = () => {
    if (this.state.isOpen) {
      this.setState({ animateIn: false }, () => {
        setTimeout(() => this.setState({ isOpen: false }), TIMEOUT);
        this.props.onClose();
      });
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
    if (!this.state.isOpen && nextProps.isOpen) {
      this.open();
    } else if (this.state.isOpen && !nextProps.isOpen) {
      this.close();
    }
  }

  render() {
    return (
      <div className={classNames('rc-dialog', { 'x-hide': !this.state.isOpen })}>
        <div
          onClick={this.close}
          className={classNames('rc-dialog-overlay out', { in: this.state.animateIn })}
        />
        <div className={classNames('rc-dialog-body out', { in: this.state.animateIn })}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
