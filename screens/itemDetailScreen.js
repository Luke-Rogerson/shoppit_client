import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { Button, Spinner } from 'native-base';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { setItemAffinity } from '../actions';

class ItemDetailScreen extends React.Component {
  state = {
    showWebView: false
  };

  renderAmazon() {
    const { currentItem } = this.props.navigation.state.params;
    return (
      <WebView
        source={{
          uri: currentItem.amazon_url
        }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
  }
  render() {
    const { currentItem } = this.props.navigation.state.params;
    const item_id = currentItem.item_id;
    const alreadyLiked = Boolean(this.props.likedItems[currentItem.item_id]);

    if (this.state.showWebView) {
      return this.renderAmazon();
    } else
      return (
        <View style={styles.main_container}>
          <View style={styles.item_name_container}>
            <Text style={styles.baseText}>{currentItem.item_name}</Text>
          </View>

          <View style={styles.item_image_container}>
            <Image
              style={styles.item_image}
              source={{ uri: currentItem.img_url }}
            />
            <Text style={styles.price_text}>{currentItem.price}</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn}>
              <Ionicons
                name="ios-close-circle-outline"
                size={50}
                color="#6F6E6C"
                onPress={() => {
                  this.props.setItemAffinity(item_id, false);
                  this.props.navigation.goBack();
                }}
              />
            </TouchableOpacity>

            <Button
              warning
              onPress={() => this.setState({ showWebView: true })}
              style={styles.buy_button}
            >
              <AntDesign name="shoppingcart" size={25} color="#F8FAFA" />
              <Text
                style={{ color: '#F8FAFA', fontWeight: 'bold', marginLeft: 10 }}
              >
                BUY NOW
              </Text>
            </Button>

            <TouchableOpacity style={styles.btn}>
              {alreadyLiked ? (
                <Ionicons
                  name="ios-heart"
                  size={50}
                  color="#6F6E6C"
                  onPress={() => {
                    // eslint-disable-next-line no-console
                    console.log("Don't touch that!");
                  }}
                />
              ) : (
                <Ionicons
                  name="ios-heart-empty"
                  size={50}
                  color="#6F6E6C"
                  onPress={() => {
                    this.props.setItemAffinity(item_id, true);
                    this.props.navigation.goBack();
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#F8FAFA'
  },
  item_name_container: {
    padding: 0,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  item_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    bottom: 10
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  baseText: {
    fontFamily: 'Walsheim',
    padding: 10,
    zIndex: 1000,
    color: '#6F6E6C',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  price_text: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 30,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    backgroundColor: '#FFBF77',
    color: 'white',
    transform: [{ rotate: '30deg' }]
  },
  item_image_container: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  item_image: {
    height: SCREEN_HEIGHT - 450,
    width: SCREEN_WIDTH - 400,
    backgroundColor: 'white',
    resizeMode: 'contain',
    borderRadius: 20,
    margin: 20,
    padding: 20
  },
  buy_button: {
    alignSelf: 'center',
    backgroundColor: '#FFBF77',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  }
});

const mapStateToProps = state => ({
  likedItems: state.entities.likedItems
});

const mapDispatchToProps = dispatch => ({
  setItemAffinity: (id, affinity) => dispatch(setItemAffinity(id, affinity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailScreen);
