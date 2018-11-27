import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { connect } from 'react-redux';

export default class SignInScreen extends React.Component {


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>THIS IS THE SIGN IN SCREEN</Text>
        <Button
          title="Next"
          onPress={() => navigate('CategoriesScreen')}
        />
        <Button
          title="Home"
          onPress={() => {
            navigate('HomeScreen');
          }}
        />
        <Button
          title="Click here"
          onPress={() => alert('Hello')}
        />
      </View>
    );

  }
}

const fetchUserData = (id) => ({
  type: 'FETCH_USER',

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

