import React from 'react';
import { TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import CurrentUserAvatar from './CurrentUserAvatar';

export default createStackNavigator(
  {
    ProfileScreen,
    ItemDetailScreen
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
