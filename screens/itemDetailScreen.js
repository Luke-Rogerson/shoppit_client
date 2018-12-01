import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  WebView
} from 'react-native';

import { connect } from 'react-redux';
import { setItemAffinity } from '../actions';

class ItemDetailScreen extends React.Component {
  state = {
    showWebView: false
  };

  renderAmazon() {
    return (
      <WebView
        source={{
          uri: this.props.navigation.getParam('link')
        }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
  }
  render() {

    if (this.state.showWebView) {
      return this.renderAmazon();
    } else
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text style={styles.baseText}>
            <Text style={styles.titleText}>
              {this.props.navigation.getParam('title')}
            </Text>
          </Text>

          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: 'contain'
            }}
            source={{ uri: this.props.navigation.getParam('image') }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={styles.titleText}>
              {this.props.navigation.getParam('price')}
            </Text>
            <View style={styles.container}>
              <Button
                title="BUY NOW"
                onPress={() => this.setState({ showWebView: true })}
              />
            </View>

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
    bottom: 10
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  baseText: {
    fontFamily: 'Arial',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
    zIndex: 1000,
    color: '#6F6E6C'
  },
  titleText: {
    fontSize: 20,
    color: '#6F6E6C'
  }
});

const mapDispatchToProps = dispatch => ({
  setItemAffinity: (id, affinity) =>
    dispatch(setItemAffinity(id, affinity))
});

export default connect(
  null,
  mapDispatchToProps
)(ItemDetailScreen);
