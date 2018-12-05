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
import { getFriendsLikedItems } from '../actions';
import NoItemsComponent from '../components/NoItemsComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;

class FriendsProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.user_id = this.props.navigation.getParam('id');
    this.didFocusListener = props.navigation.addListener('didFocus', () => {
      props.getFriendsLikedItems(this.props.navigation.getParam('id'));
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { friends, friendsItems } = this.props;

    if (!friends || !friendsItems[this.user_id]) return <Text>Loading...</Text>;
    const likedItems = friendsItems[this.user_id].map(
      item_id => this.props.likedItems[item_id]
    );

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

        {likedItems.length ? (
          <ScrollView
            alwaysBounceVertical={'false'}
            contentContainerStyle={styles.itemsList}
          >
            {likedItems.map((currentItem, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigate('ItemDetailScreen', {
                      currentItem
                    })
                  }
                  style={styles.item_image_shadow}
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
        ) : (
          <NoItemsComponent />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFA',
    flex: 1
  },
  text: {
    margin: 10,
    color: '#6F6E6C',
    fontSize: 20,
    fontFamily: 'Walsheim',
    textAlign: 'center'
  },
  profile_pic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    alignSelf: 'center'
  },

  itemsList: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item_images: {
    resizeMode: 'contain',
    height: 250,
    width: SCREEN_WIDTH / 2 - 30,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10
  },
  item_image_shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  }
});

const mapStateToProps = state => ({
  friends: state.pages.friendsPage.friendsList.map(
    friend => state.entities.friends[friend]
  ),
  friendsIds: state.pages.friendsPage.friendsList,

  friendsItems: state.pages.friendsPage.friendsItems,

  likedItems: state.entities.likedItems
});

const mapDispatchToProps = dispatch => ({
  getFriendsLikedItems: id => dispatch(getFriendsLikedItems(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsProfileScreen);
