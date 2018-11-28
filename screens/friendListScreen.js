import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

export default class FriendListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendsData: null
    };
  }

  componentDidMount() {
    fetch('http://private-e029e-wisher.apiary-mock.com/me/friends')
      .then(res => res.json())
      .then(data => this.setState({ friendsData: data.friends }))
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error:', error));
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.friendsData) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.friendsData.map((friend, i) => {
            return (
              <TouchableHighlight
                onPress={() => navigate('ProfileScreen')}
                key={i}
              >
                <View style={styles.container}>
                  <Image
                    key={i}
                    source={{ uri: friend.avatar_url }}
                    style={styles.profile_pic}
                  />

                  <Text style={styles.text}>
                    {friend.first_name} {friend.last_name}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10
  },
  text: {
    margin: 10,
    color: '#6F6E6C',
    fontSize: 20
  }
});
