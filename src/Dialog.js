import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Dialog.scss';

const ESC_KEY = 27;
const TIMEOUT = 150;

export default class Dialog extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool
  };

  isClosed = true;
  state = {
    animateIn: false,
    isOpen: false
  };

  open = () => {
    if (!this.state.isOpen && this.isClosed) {
      this.setState({ isOpen: true }, () => {
        this.isClosed = false;
        setTimeout(() => this.setState({ animateIn: true }),TIMEOUT);
      });
    }
  };

  close = () => {
    if (this.state.isOpen && !this.isClosed) {
      this.setState({ animateIn: false }, () => {
        this.isClosed = true;
        setTimeout(() => this.setState({ isOpen: false }), TIMEOUT);
        if (this.props.onClose) {
          this.props.onClose();
        }
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
    const { children } = this.props;
    return (
      <div className={classNames('rc-dialog', { 'x-hide': !this.state.isOpen })}>
        <div onClick={this.close} className={classNames('rc-dialog-overlay out', { in: this.state.animateIn })} />
        <div className={classNames('rc-dialog-body out', { in: this.state.animateIn })}>
          {children}
        </div>
      </div>
    );
  }
}
