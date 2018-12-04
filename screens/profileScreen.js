import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  FlatList
} from 'react-native';

import moment from 'moment';

import { connect } from 'react-redux';
import { getLikedItems } from '../actions';
import { Row } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.didFocusListener = props.navigation.addListener('didFocus', () => {
      props.getLikedItems(props.currentUserId);
    });
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { currentUser, currentUserId, likedItems } = this.props;

    if (!currentUser) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <View styles={styles.profileInfo}>
          <Image
            source={{ uri: currentUser[currentUserId].avatar_url }}
            style={styles.profile_pic}
          />

          <Text style={styles.text}>
            {currentUser[currentUserId].first_name}{' '}
            {currentUser[currentUserId].last_name}
          </Text>

          <Text style={styles.text}>
            {moment(currentUser[currentUserId].birthday).format('Do MMMM')}
          </Text>
        </View>
        <View>
          <ScrollView contentContainerStyle={styles.itemsList}>
            {likedItems.map((currentItem, i) => {
              return (
                <TouchableHighlight
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
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFA',
    flex: 1
  },

  profileInfo: {
    margin: 20
  },

  text: {
    margin: 10,
    color: '#6F6E6C',
    fontSize: 20,
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
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: 'white',
    padding: 10
  }
});

const mapStateToProps = state => ({
  currentUserId: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser,

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
)(ProfileScreen);
