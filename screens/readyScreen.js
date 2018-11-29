import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { connect } from 'react-redux';

class ReadyScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    if (!this.state.currentUser) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Congrats {this.props.currentUser.first_name}{' '}
          {this.props.currentUser.last_name}
        </Text>
        <Image
          source={{ uri: this.props.currentUser.avatar_url }}
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
  currentUser: state.pages.currentUserPage.currentUser.map(user_id => (
    state.entities.currentUser[user_id]
  ))
});

export default connect(
  mapStateToProps,
  null,
)(ReadyScreen);
