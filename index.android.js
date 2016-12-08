import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Home from './src/app/index';

export default class orientationChangePlayground extends Component {
  render() {
    return (
      <Home/>
    );
  }
}

AppRegistry.registerComponent('orientationChangePlayground', () => orientationChangePlayground);
