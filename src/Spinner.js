import React, { Component } from 'react';
import PropTypes from 'prop-types';

const STEP = 0.1;
const ROTATION_STEP = 3 * Math.PI / 180;
const FULL_PI = 2 * Math.PI;
const HALF_PI = 0.5 * Math.PI;
const RADIUS_PERCENT = 0.8;
const DEFAULT_Loading_COLOR = '#00bc8d';
const DEFAULT_Loading_SIZE = 2;
const DEFAULT_DIMENSIONS = 40;
const LOADING_Text = '加载中...';

// upate values
let startAngle = 0;
let endAngle = 0;
let rotation = -HALF_PI;
let moveStart = false;
let radius = 15;

// valid props -- checked later and defaulted here
let size = DEFAULT_DIMENSIONS;
let color = DEFAULT_Loading_COLOR;
let lineWidth = DEFAULT_Loading_SIZE;
let loadingText = LOADING_Text;

class Loading extends Component {
  static hasRAF = typeof window.requestAnimationFrame === 'function';
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    lineWidth: PropTypes.number,
    loadingText: PropTypes.string
  };
  timer = 0;
  raf = 0;
  componentWillMount() {
    size = this.props.size || DEFAULT_DIMENSIONS;
    radius = Math.min(size / 2, size / 2) * RADIUS_PERCENT;
    color = this.props.color || DEFAULT_Loading_COLOR;
    lineWidth = this.props.lineWidth || DEFAULT_Loading_SIZE;
    loadingText = this.props.loadingText || LOADING_Text;
  }

  componentDidMount() {
    if (Loading.hasRAF) {
      this.raf = window.requestAnimationFrame(this.update);
    } else {
      this.timer = setInterval(this.update, 16);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }

  render() {
    return (
      <canvas ref={c => (this.c = c)} width={size} height={size}>
        {loadingText}
      </canvas>
    );
  }

  update = () => {
    var c = this.c;
    if (!c) return;

    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();

    ctx.arc(
      size / 2,
      size / 2,
      radius,
      rotation + startAngle,
      rotation + endAngle
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    rotation += ROTATION_STEP;
    if (rotation >= FULL_PI) {
      rotation = 0;
    }

    if (moveStart) {
      startAngle += STEP;
    } else {
      endAngle += STEP;
    }

    if (endAngle < startAngle) {
      moveStart = false;
      endAngle = 0;
      startAngle = 0;
      startAngle = 0;
    } else if (endAngle >= FULL_PI) {
      moveStart = true;
    }

    if (Loading.hasRAF) {
      this.raf = window.requestAnimationFrame(this.update);
    }
  };
}

export default Loading;
