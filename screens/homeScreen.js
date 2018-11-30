import React from 'react';
import { connect } from 'react-redux';

import { getAllRecommendedItems } from '../actions';

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

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
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
                  height: SCREEN_HEIGHT - 200,
                  width: SCREEN_WIDTH,
                  padding: 10,
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
                  height: SCREEN_HEIGHT - 200,
                  width: SCREEN_WIDTH,
                  padding: 10,
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
          backgroundColor: 'white'
        }}
      >
        <View style={{ flex: 1 }}>{this.renderItems()}</View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="ios-close-circle-outline"
              size={50}
              color="#6F6E6C"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="ios-heart-empty" size={50} color="#6F6E6C" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons
              name="ios-information-circle-outline"
              size={50}
              color="#6F6E6C"
              onPress={() =>
                navigate('ItemDetailScreen', {
                  name: currentItem.item_name,
                  image: currentItem.img_url,
                  price: currentItem.price
                })
              }
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
    bottom: 50
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
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
    backgroundColor: 'white'
  }
});

const mapStateToProps = state => ({
  currentUserId: state.pages.currentUserPage.currentUser,
  currentUser: state.entities.currentUser,

  recommendedItems: state.pages.homePage.items.map(
    item_id => state.entities.items[item_id]
  )
});

const mapDispatchToProps = dispatch => ({
  getAllRecommendedItems: () => dispatch(getAllRecommendedItems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
