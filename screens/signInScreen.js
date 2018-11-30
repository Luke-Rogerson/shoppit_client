import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { connect } from 'react-redux';

import {
  getCurrentUserData,
} from '../actions';

class SignInScreen extends React.Component {

  componentDidMount() {
    this.props.getCurrentUserData();
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>THIS IS THE SIGN IN SCREEN</Text>
        <Button title="Next" onPress={() => navigate('CategoriesScreen')} />
        <Button
          title="Home"
          onPress={() => {
            navigate('HomeScreen');
          }}
        />
      </View>
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

const mapDispatchToProps = dispatch => ({
  getCurrentUserData: () => dispatch(getCurrentUserData(2)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignInScreen);
