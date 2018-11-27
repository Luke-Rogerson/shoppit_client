import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

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
      title: 'WISHOP',
      headerTintColor: '#6F6E6C',
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
              marginRight: 10,
              marginBottom: 10
            }}
          />
        </TouchableHighlight>
      )
    })
  }
);
