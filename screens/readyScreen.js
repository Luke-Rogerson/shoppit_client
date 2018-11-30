import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { connect } from 'react-redux';

class ReadyScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    const { currentUser, loggedInUser} = this.props;

    if (!this.props.loggedInUser) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>

        <Text style={styles.text}>
          Congrats {currentUser[loggedInUser].first_name}{' '}
          {currentUser[loggedInUser].last_name}
        </Text>

        <Image
          source={{ uri: currentUser[loggedInUser].avatar_url }}
          style={styles.profile_pic}
        />

        <Text style={styles.text}>You are all set up!</Text>

        <Button title="Next" onPress={() => navigate('HomeScreen')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,

    margin: 10
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#6F6E6C'
  }
});

const mapStateToProps = state => ({
  loggedInUser: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser
});

export default connect(
  mapStateToProps,
  null,
)(ReadyScreen);
