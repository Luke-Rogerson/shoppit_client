import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Content,
  Container,
  Icon
} from 'native-base';

import { connect } from 'react-redux';
import { getUserFriends, followFriend, unFollowFriend } from '../actions';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

class FriendListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      followedFriends: []
    };
  }

  componentDidMount() {
    this.props.getUserFriends();
  }

  followfriend = id => {
    const inFollowList = this.state.followedFriends.includes(id);

    let followedFriends;
    if (inFollowList) {
      followedFriends = this.state.followedFriends.filter(
        friendID => friendID !== id
      );
      this.props.unFollowFriend(id);
    } else {
      followedFriends = [...this.state.followedFriends, id];
      this.props.followFriend(id);
    }
    this.setState({ followedFriends });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { friends } = this.props;

    if (!friends) return <Text>Loading...</Text>;

    return (
      <Container>
        <Content>
          <List>
            {friends.map(friend => {
              return (
                <ListItem
                  avatar
                  key={friend.user_id}
                  onPress={() =>
                    navigate('FriendsProfileScreen', {
                      firstName: friend.first_name,
                      lastName: friend.last_name,
                      image: friend.avatar_url,
                      id: friend.user_id,
                      birthday: moment(friend.birthday).format('Do MMMM')
                    })
                  }
                >
                  <Left>
                    <Thumbnail
                      style={styles.profile_pic}
                      source={{ uri: friend.avatar_url }}
                    />
                  </Left>
                  <Body>
                    <Text style={styles.text}>
                      {friend.first_name} {friend.last_name}
                    </Text>
                  </Body>
                  <Right>
                    <TouchableOpacity>
                      {!this.state.followedFriends.includes(friend.user_id) ? (
                        <FontAwesome
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginRight: 20
                          }}
                          size={25}
                          name="bell-o"
                          color="#C0C0C0"
                          onPress={() => {
                            this.followfriend(friend.user_id);
                          }}
                        />
                      ) : (
                        <FontAwesome
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginRight: 20
                          }}
                          size={25}
                          name="bell"
                          color="#FFBF77"
                          onPress={() => {
                            this.followfriend(friend.user_id);
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

// bell icon is from FontAwesome
// bell outline: "bell-o", color: #6F6E6C
// colored-in bell: "bell", color: #FFBF77

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
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
  getUserFriends: () => dispatch(getUserFriends()),
  followFriend: category_id => dispatch(followFriend(category_id)),
  unFollowFriend: category_id => dispatch(unFollowFriend(category_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListScreen);
