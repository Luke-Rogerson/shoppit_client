import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { getUserFriends } from '../actions';
import { FontAwesome } from '@expo/vector-icons';
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
              <TouchableOpacity
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
                  <FontAwesome
                    name="bell-o"
                    size={30}
                    color="#6F6E6C"
                    onPress={() => {
                      console.log('🎊 friend ID: ', friend.user_id);
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

// bell icon is from FontAwesome
// bell outline: "bell-o", color: #6F6E6C
// colored-in bell: "bell", color: #FFBF77

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
    marginTop: 30,
    color: '#6F6E6C',
    fontSize: 20,
    fontFamily: 'Walsheim'
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
