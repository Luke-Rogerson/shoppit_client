import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from 'react-navigation';

class SignIn extends React.Component {
  static navigationOptions = () => ({
    title: 'SignIn '
  });
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>SIGNIN</Text>
        <Button
          title="Next"
          onPress={() => {
            navigate('Categories');
          }}
        >
          Go to Categories
        </Button>
      </View>
    );
  }
}

class Categories extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>CATS</Text>
        <Button
          title="Back"
          onPress={() => {
            navigate('SignIn');
          }}
        >
          Back to signin!
        </Button>
      </View>
    );
  }
}

const Apps = createStackNavigator({
  SignIn: { screen: SignIn },
  Categories: { screen: Categories }
});

export default Apps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
