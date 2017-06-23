import React, { Component } from 'react';

export default class PlaceHolderInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      labelLineHeight: ''
    };

    if (PlaceHolderInput.needPlaceHolder) {
      if (!props.onChange) {
        throw new Error('PlaceHolderInput must specify onChange prop.');
      }
      this.oldChange = props.onChange;
      this.oldBlur = props.onBlur || (() => {});
    }
  }

  static needPlaceHolder = !('placeholder' in document.createElement('input'));

  onFocus = () => {
    this.inputEl.focus();
  };

  onBlur = e => {
    this.oldBlur(e);
    this.oldChange(e);
  };

  onChange = e => {
    this.oldChange(e);
  };

  componentDidMount() {
    if (PlaceHolderInput.needPlaceHolder) {
      var style = this.inputEl.currentStyle;
      if (style) {
        this.setState({
          display: style.display,
          labelLineHeight: style.height
        });
      }
    }
  }

  render() {
    return !PlaceHolderInput.needPlaceHolder
      ? <input {...this.props} />
      : <div
          style={{
            position: 'relative',
            display: this.state.display
          }}>
          <input {...this.props} ref={input => (this.inputEl = input)} onChange={this.onChange} onBlur={this.onBlur} />
          <label
            style={{
              cursor: 'text',
              color: this.props.placeholderColor || '#ccc',
              position: 'absolute',
              top: this.props.placeholderTop || '0',
              left: this.props.placeholderLeft || '12px',
              lineHeight: this.state.labelLineHeight
            }}
            onClick={this.onFocus}>
            {!this.props.value ? this.props.placeholder : ''}
          </label>
        </div>;
  }
}
