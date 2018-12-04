import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { getLikedItems } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class FriendsProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.didFocusListener = props.navigation.addListener('didFocus', () => {
      props.getLikedItems(this.props.navigation.getParam('id'));
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { friends, likedItems } = this.props;

    if (!friends || !likedItems) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.navigation.getParam('firstName')}{' '}
          {this.props.navigation.getParam('lastName')}
        </Text>
        <Image
          source={{ uri: this.props.navigation.getParam('image') }}
          style={styles.profile_pic}
        />
        <Text style={styles.text}>
          {this.props.navigation.getParam('birthday', '')}
        </Text>
        <ScrollView>
          {likedItems.map((currentItem, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigate('ItemDetailScreen', {
                    currentItem
                  })
                }
                key={i}
              >
                <Image
                  source={{ uri: currentItem.img_url }}
                  style={styles.item_images}
                />
              </TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  text: {
    margin: 10,
    color: '#6F6E6C',
    fontSize: 20
  },
  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10
  },
  item_images: {
    flex: 1,
    resizeMode: 'cover',
    height: 300,
    width: SCREEN_WIDTH - 20,
    margin: 10,
    borderRadius: 5,
    padding: 10
  },
  category_name: {
    textTransform: 'capitalize',
    color: '#6F6E6C',
    padding: 10
  }
});

const mapStateToProps = state => ({
  friends: state.pages.friendsPage.friendsList.map(
    friend => state.entities.friends[friend]
  ),
  friendsIds: state.pages.friendsPage.friendsList,

  likedItems: state.pages.profilePage.items.map(
    item_id => state.entities.likedItems[item_id]
  )
});

const mapDispatchToProps = dispatch => ({
  getLikedItems: id => dispatch(getLikedItems(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsProfileScreen);
