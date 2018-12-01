import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ItemDetailScreen extends React.Component {
  render() {
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
          <Button
            title="BUY NOW"
            onPress={() => uri(this.props.navigation.getParam('link'))}
          />
        </View>
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
