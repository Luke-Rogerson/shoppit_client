import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import reducers from './reducers';
import logger from './middleware/logger';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const store = createStore(
  reducers,
  applyMiddleware(
    api('http://private-e029e-wisher.apiary-mock.com/', 'api_loc')
  ),
  logger
);
