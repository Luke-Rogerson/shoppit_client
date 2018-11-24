import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppNavigator from './navigation';


export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
