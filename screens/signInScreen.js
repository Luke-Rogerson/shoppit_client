import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Permissions, Notifications } from 'expo';

import { connect } from 'react-redux';

import { getCurrentUserData } from '../actions';
import { AsyncStorage } from 'react-native';

class SignInScreen extends React.Component {
  componentDidMount() {
    this.registerForPushNotificationsAsync();
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

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.storeToken('pushtoken', token);
  }

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
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
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

const mapDispatchToProps = dispatch => ({
  getCurrentUserData: () => dispatch(getCurrentUserData())
});

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);
