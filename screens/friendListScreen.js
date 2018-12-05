import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
  Spinner
} from 'native-base';

import { connect } from 'react-redux';
import { getUserFriends } from '../actions';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

const SCREEN_HEIGHT = Dimensions.get('window').height;

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
    } else {
      followedFriends = [...this.state.followedFriends, id];
    }
    this.setState({ followedFriends });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { friends } = this.props;
    if (!friends.length)
      return (
        <Spinner
          style={{
            height: SCREEN_HEIGHT / 1.3
          }}
        />
      );

    return (
      <Container style={styles.container}>
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
  container: {
    backgroundColor: '#F8FAFA'
  },
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
  getUserFriends: () => dispatch(getUserFriends())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListScreen);
