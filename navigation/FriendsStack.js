import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
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
      headerStyle: { backgroundColor: '#91C7A3' },
      headerTitle: (
        <Text
          style={{
            fontFamily: 'Pacifico',
            color: 'white',
            fontSize: 25,
            paddingBottom: 60
          }}
        >
          shoppit
        </Text>
      ),
      headerBackTitle: 'back',

      headerTintColor: 'white',
      headerRight: (
        <TouchableHighlight onPress={() => navigation.navigate('MyProfile')}>
          <CurrentUserAvatar />
        </TouchableHighlight>
      )
    })
  }
);
