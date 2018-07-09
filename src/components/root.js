import React, { Component } from 'react';
import abc from '../images/abc.jpg';

export default class Root extends Component {
  render() {
    return (
      <div>
        <p>hello world</p>
        <image src={abc} height="50" />
      </div>
    )
  }
}
