import React from 'react';
import { TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import FriendsListScreen from '../screens/FriendListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import FriendsProfileScreen from '../screens/FriendsProfileScreen';
import CurrentUserAvatar from './CurrentUserAvatar';

export default createStackNavigator(
  {
    FriendsListScreen,
    ProfileScreen,
    ItemDetailScreen,
    FriendsProfileScreen
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
