import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import reducers from './reducers';
// import logger from './middleware/logger';
import api from './middleware/apimiddleware';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
<<<<<<< HEAD
      api('http://localhost:3333')
=======
      api('http://private-e029e-wisher.apiary-mock.com/')
>>>>>>> b81e98c69603cde6820267c3073ed72af55d9826
    )
  )
);
