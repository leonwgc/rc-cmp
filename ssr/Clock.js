import React, { Component } from 'react';

export default class Clock extends Component {
  state = {
    time: Date.now()
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.state.time).toString();
    return (
      <span>
        {time}
      </span>
    );
  }
}
