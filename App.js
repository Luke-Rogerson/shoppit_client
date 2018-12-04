import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import AppNavigator from './navigation/AppNavigator';
import reducers from './reducers';
// import logger from './middleware/logger';
import api from './middleware/apimiddleware';

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount() {
    await Font.loadAsync({
      Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
      Walsheim: require('./assets/fonts/GT-Walsheim-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
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
  composeEnhancers(applyMiddleware(api('http://192.168.1.223:3333')))
);
