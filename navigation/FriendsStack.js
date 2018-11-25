import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import FriendsListScreen from '../screens/FriendListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

export default createStackNavigator(
  {
    FriendsListScreen,
    ProfileScreen,
    ItemDetailScreen
  },
  {
    headerMode: 'float',
    headerBackTitleVisible: true,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#E73536' },
      title: 'TINDER FOR COOL SHIT',
      headerTintColor: 'white',
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('./hamburgericon.png')}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </TouchableHighlight>
      )
    })
  }
);
