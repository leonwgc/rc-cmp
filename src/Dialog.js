import React, { Component } from 'react';
import classNames from 'classnames';
import './Dialog.scss';

const ESC_KEY = 27;
const TIMEOUT = 150;

export default class Dialog extends Component {
  state = {
    in: false,
    listenedOnWindow: false
  };

  init = () => {
    if (!this.state.listenedOnWindow) {
      this.setState({ listenedOnWindow: true }, () => {
        window.addEventListener('keydown', this.handleKeydown);
      });
    }
    setTimeout(() => {
      this.setState({ in: true });
    }, TIMEOUT);
  };

  handleKeydown = e => {
    if (e.keyCode === ESC_KEY) {
      this.dispose();
    }
  };

  dispose = e => {
    this.setState({ in: false, listenedOnWindow: false }, () => {
      window.removeEventListener('keydown', this.handleKeydown);
      setTimeout(() => {
        this.props.close();
      }, TIMEOUT);
    });
  };
  componentDidMount() {
    if (this.props.isOpen) {
      this.init();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.init();
    }
  }

  render() {
    return this.props.isOpen
      ? <div className="rc-dialog">
          <div onClick={this.dispose} className={classNames('rc-dialog-overlay fade', { in: this.state.in })} />
          <div className={classNames('rc-dialog-body fade', { in: this.state.in })}>{this.props.children}</div>
        </div>
      : null;
  }
}
