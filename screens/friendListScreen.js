import React from 'react';
import {
  StyleSheet,
  // Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
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
      <Container>
        <Content>
          <List>
            {friends.map((friend, i) => {
              return (
                <ListItem
                  avatar
                  key={i}
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
                    <Icon
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20
                      }}
                      type="FontAwesome"
                      name="bell-o"
                      // size={40}
                      color="#6F6E6C"
                      onPress={() => {
                        console.log('🎊 friend ID: ', friend.user_id);
                      }}
                    />
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
  getUserFriends: () => dispatch(getUserFriends())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListScreen);
