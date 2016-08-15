import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './containers/app';
import {
  AppRegistry,
} from 'react-native';


export default class Root extends Component {
  render() {
    return (
      <Provider store = {store}>
        <App/>
      </Provider>
    )

  }
}
