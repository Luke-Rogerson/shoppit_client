import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class ReadyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    fetch('http://private-e029e-wisher.apiary-mock.com/me')
      .then(res => res.json())
      .then(data => this.setState({ userData: data }))
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error:', error));
  }

  render() {
    const { userData } = this.state;
    const { navigate } = this.props.navigation;

    if (!userData) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Congrats {this.state.userData.first_name}{' '}
          {this.state.userData.last_name}
        </Text>
        <Image
          source={{ uri: this.state.userData.avatar_url }}
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
