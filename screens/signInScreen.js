import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { connect } from 'react-redux';

import { getCurrentUserData } from '../actions';
import { AsyncStorage } from 'react-native';

class SignInScreen extends React.Component {
  componentDidMount() {
    if (AsyncStorage.getItem('accesstoken')) this.props.getCurrentUserData();
  }

  storeToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  async logInFB() {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '269505717071910',
        {
          permissions: [
            'public_profile',
            'user_gender',
            'user_birthday',
            'email',
            'user_friends'
          ]
        }
      );
      if (type === 'success') {
        await this.storeToken('accesstoken', token);
        const currentUserCatLen = this.props.currentUser[
          this.props.currentUserId
        ].category.length;
        currentUserCatLen > 1
          ? this.props.navigation.navigate('HomeScreen')
          : this.props.navigation.navigate('CategoriesScreen');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    if (!this.props.currentUser) return <Text>Loading...</Text>;

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

        <Button
          title="Connect with Facebook"
          onPress={this.logInFB.bind(this)}
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

const mapStateToProps = state => ({
  currentUserId: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserData: () => dispatch(getCurrentUserData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
