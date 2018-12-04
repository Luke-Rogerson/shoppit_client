import React from 'react';
import { connect } from 'react-redux';

import {
  getAllRecommendedItems,
  setItemAffinity,
  getCurrentUserData
} from '../actions';

import {
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });
  }

  componentDidMount() {
    this.props.getAllRecommendedItems();
    this.props.getCurrentUserData();

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gestureState) => {
        const currentItem = this.props.recommendedItems[
          this.state.currentIndex
        ];
        if (gestureState.dx > 120) {
          // swipe RIGHT ie. like
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.props.setItemAffinity(currentItem.item_id, true);
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          // swipe LEFT ie. dismiss
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.props.setItemAffinity(currentItem.item_id, false);
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  renderItems = () => {
    if (!this.props.recommendedItems) return <Text>Loading...</Text>;

    return this.props.recommendedItems
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.item_id}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 300,
                  width: SCREEN_WIDTH,
                  padding: 20,
                  position: 'absolute'
                }
              ]}
            >
              <Animated.View
                style={{
                  opacity: this.likeOpacity,
                  transform: [{ rotate: '-30deg' }],
                  position: 'absolute',
                  top: 40,
                  left: 40,
                  zIndex: 1000
                }}
              >
                <Text style={styles.textLike}>LIKE</Text>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: this.dislikeOpacity,
                  transform: [{ rotate: '30deg' }],
                  position: 'absolute',
                  top: 50,
                  right: 40,
                  zIndex: 1000
                }}
              >
                <Text style={styles.textNope}>NOPE</Text>
              </Animated.View>

              <Image style={styles.image} source={{ uri: item.img_url }} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.item_id}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                  height: SCREEN_HEIGHT - 300,
                  width: SCREEN_WIDTH,
                  padding: 20,
                  position: 'absolute'
                }
              ]}
            >
              <Animated.View style={styles.animated}>
                <Text style={styles.textLike}>LIKE</Text>
              </Animated.View>

              <Animated.View style={styles.animated}>
                <Text style={styles.textNope}>NOPE</Text>
              </Animated.View>

              <Image style={styles.image} source={{ uri: item.img_url }} />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    const { navigate } = this.props.navigation;
    if (!this.props.recommendedItems) return <Text>Loading...</Text>;

    const currentItem = this.props.recommendedItems[this.state.currentIndex];

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F8FAFA'
        }}
      >
        <View style={{ flex: 1 }}>{this.renderItems()}</View>

        <View style={styles.btnContainer}>
          {/* DISLIKE button */}
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="ios-close-circle-outline"
              size={50}
              color="#6F6E6C"
              onPress={() => {
                this.props.setItemAffinity(currentItem.item_id, false);
                this.setState({ currentIndex: this.state.currentIndex + 1 });
              }}
            />
          </TouchableOpacity>
          {/* INFO button */}
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="ios-information-circle-outline"
              size={50}
              color="#6F6E6C"
              onPress={() => {
                navigate('ItemDetailScreen', {
                  currentItem
                });
                this.setState({ currentIndex: this.state.currentIndex + 1 });
              }}
            />
          </TouchableOpacity>
          {/* LIKE button */}
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="ios-heart-empty"
              size={50}
              color="#6F6E6C"
              onPress={() => {
                this.props.setItemAffinity(currentItem.item_id, true);
                this.setState({ currentIndex: this.state.currentIndex + 1 });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    bottom: 30
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    height: SCREEN_HEIGHT - 600,
    width: SCREEN_WIDTH - 400,
    backgroundColor: 'white',
    resizeMode: 'contain',
    borderRadius: 20,
    padding: 20,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  textNope: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: '800',
    padding: 10
  },
  textLike: {
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: '800',
    padding: 10
  },
  animated: {
    opacity: 0,
    transform: [{ rotate: '30deg' }],
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000,
    backgroundColor: '#F8FAFA'
  }
});

const mapStateToProps = state => ({
  currentUserId: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser,

  recommendedItems: state.pages.homePage.items.map(
    item_id => state.entities.items[item_id]
  ),
  isUpdating: state.pages.homePage.loading
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserData: () => dispatch(getCurrentUserData()),

  getAllRecommendedItems: () => dispatch(getAllRecommendedItems()),
  setItemAffinity: (item_id, affinity) =>
    dispatch(setItemAffinity(item_id, affinity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
