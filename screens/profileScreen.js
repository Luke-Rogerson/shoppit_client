import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import moment from 'moment';

import { connect } from 'react-redux';



const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends React.Component {

  componentDidMount() {
    // this.props.getLikedItems();
  }

  render() {

    const { navigate } = this.props.navigation;
    const { currentUser, currentUserId } = this.props;

    if (!currentUser) return <Text>Loading...</Text>;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {currentUser[currentUserId].first_name} {currentUser[currentUserId].last_name}
        </Text>
        <Image
          source={{ uri: currentUser[currentUserId].avatar_url }}
          style={styles.profile_pic}
        />
        <Text style={styles.text}>
          {moment(currentUser[currentUserId].birthday).format('Do MMMM')}
        </Text>
        {/* <ScrollView>
          {mockdb.fitness.map((item, i) => {
            return (
              <TouchableHighlight
                onPress={() => navigate('ItemDetailScreen')}
                key={i}
              >
                <Image
                  source={{ uri: item.img_url }}
                  style={styles.item_images}
                />
              </TouchableHighlight>
            );
          })}
        </ScrollView> */}
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
  currentUserId: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser,
});

// const mapDispatchToProps = dispatch => ({

// });


export default connect(
  mapStateToProps,
  null,
)(ProfileScreen);