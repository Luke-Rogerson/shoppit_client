import React from 'react';
import { TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import FriendListScreen from '../screens/FriendListScreen';
import CurrentUserAvatar from './CurrentUserAvatar';

export default createStackNavigator(
  {
    HomeScreen,
    ProfileScreen,
    ItemDetailScreen,
    FriendListScreen
  },
  {
    headerMode: 'float',
    headerBackTitleVisible: true,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#FAFAFA' },
      title: 'WISHER',
      headerTintColor: '#6F6E6C',
      headerRight: (
        <TouchableHighlight onPress={() => navigation.navigate('MyProfile')}>
          <CurrentUserAvatar />
        </TouchableHighlight>
      )
    })
  }
);
