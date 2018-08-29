import React from 'react';
import { AppRegistry, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import App from './src/containers/App';
import config from './src/store'
import {name as appName} from './app.json';

StatusBar.setBarStyle('light-content')

const Root = () => (
  <Provider store={config.store}>
    <PersistGate persistor={config.persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
