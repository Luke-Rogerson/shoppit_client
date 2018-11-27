import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const Items = [
  { id: '1', uri: require('../assets/img1.jpg') },
  { id: '2', uri: require('../assets/img2.jpg') },
  {
    id: '3',
    uri: require('../assets/img3.jpg'),
    price: '$10.99',
    item_name: 'Cool Comfy Slipper Sock'
  },
  { id: '4', uri: require('../assets/img4.jpg') },
  { id: '5', uri: require('../assets/img5.jpg') },
  { id: '6', uri: require('../assets/img6.jpg') }
];

export default class ItemDetailScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>{Items[2].item_name}</Text>
        </Text>

        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: 'contain'
          }}
          source={Items[2].uri}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.titleText}>{Items[2].price}</Text>
          <Button
            title="BUY NOW"
            onPress={() => uri('https://www.amazon.com/')}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Entypo name="circle-with-cross" size={50} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="md-heart" size={50} color="grey" />
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
    color: '#6F6E6C',
    fontWeight: 'bold'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6F6E6C'
  }
});
