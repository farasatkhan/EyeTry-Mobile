// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import App from './App'; 
import { Provider } from 'react-redux';
import store from './src/redux/store/store'; 

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
