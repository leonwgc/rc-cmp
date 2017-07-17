import React, { Component } from 'react';

const STEP = 0.1;
const ROTATION_STEP = 3 * Math.PI / 180;
const FULL_PI = 2 * Math.PI;
const HALF_PI = 0.5 * Math.PI;
const RADIUS_PERCENT = 0.8;
const DEFAULT_Loading_COLOR = '#00bc8d';
const DEFAULT_Loading_WIDTH = 2;
const DEFAULT_DIMENSIONS = 40;

// upate values
let startAngle = 0;
let endAngle = 0;
let rotation = -HALF_PI;
let moveStart = false;
let radius = 15;

// valid props -- checked later and defaulted here
let width = DEFAULT_DIMENSIONS;
let height = DEFAULT_DIMENSIONS;
let loadingColor = DEFAULT_Loading_COLOR;
let loadingWidth = DEFAULT_Loading_WIDTH;

class Loading extends Component {
  static hasRAF = typeof window.requestAnimationFrame === 'function';
  timer = 0;
  raf = 0;
  componentWillMount() {
    width = this.props.width || DEFAULT_DIMENSIONS;
    height = this.props.height || DEFAULT_DIMENSIONS;
    radius = Math.min(width / 2, height / 2) * RADIUS_PERCENT;
    loadingColor = this.props.loadingColor || DEFAULT_Loading_COLOR;
    loadingWidth = this.props.loadingWidth || DEFAULT_Loading_WIDTH;
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
      <canvas ref={c => (this.c = c)} width={width} height={height}>
        加载中...
      </canvas>
    );
  }

  update = () => {
    var c = this.c;
    if (!c) return;

    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();

    ctx.arc(width / 2, height / 2, radius, rotation + startAngle, rotation + endAngle);
    ctx.strokeStyle = loadingColor;
    ctx.lineWidth = loadingWidth;
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
