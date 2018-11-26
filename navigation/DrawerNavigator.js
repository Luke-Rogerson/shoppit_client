import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import FriendsStack from './FriendsStack';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Home',
        tabBarIcon:
          <Entypo name='home' size={25} color='lightgrey' style={{paddingTop: 5}} />
      }
    },
    MyProfile: {
      screen: MyProfileStack,
      navigationOptions: {
        title: 'My Profile',
        tabBarIcon:
          <Entypo name='user' size={25} color='lightgrey' style={{paddingTop: 5}} />
      }
    },
    Friends: {
      screen: FriendsStack,
      navigationOptions: {
        title: 'Friends',
        tabBarIcon:
          <Entypo name='users' size={25} color='lightgrey' style={{paddingTop: 5}} />
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);
