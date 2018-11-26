import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import FriendListScreen from '../screens/FriendListScreen';

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
      headerStyle: { backgroundColor: '#6F6E6C' },
      title: 'WISHOP',
      headerTintColor: 'white',
      headerRight: (
        <TouchableHighlight onPress={() => navigation.navigate('MyProfile')}>
          <Image
            source={{
              uri:
                'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.163.720.720/p720x720/41794966_10156618291156963_5588614615241064448_o.jpg?_nc_cat=108&_nc_ht=scontent.xx&oh=f80eba4efe156c6846a93b352557a07b&oe=5C6B5A63'
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 0.5,
              borderColor: 'black',
              marginRight: 10,
              marginBottom: 10
            }}
          />
        </TouchableHighlight>
      )
    })
  }
);
