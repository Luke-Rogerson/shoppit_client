import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { getUserFriends } from '../actions';

import moment from 'moment';

class FriendListScreen extends React.Component {
  componentDidMount() {
    this.props.getUserFriends();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { friends } = this.props;

    if (!friends) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <ScrollView>
          {friends.map((friend, i) => {
            return (
              <TouchableHighlight
                onPress={() =>
                  navigate('FriendsProfileScreen', {
                    firstName: friend.first_name,
                    lastName: friend.last_name,
                    image: friend.avatar_url,
                    id: friend.user_id,
                    birthday: moment(friend.birthday).format('Do MMMM')
                  })
                }
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
    margin: 10
  },
  text: {
    margin: 30,
    color: '#6F6E6C',
    fontSize: 20
  }
});

const mapStateToProps = state => ({
  friends: state.pages.friendsPage.friendsList.map(
    friend => state.entities.friends[friend]
  )
});

const mapDispatchToProps = dispatch => ({
  getUserFriends: () => dispatch(getUserFriends())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListScreen);
