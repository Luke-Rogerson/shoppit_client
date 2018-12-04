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
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="home" color={tintColor} size={24} />
        )
      }
    },
    MyProfile: {
      screen: MyProfileStack,
      navigationOptions: {
        tabBarLabel: 'My Profile',
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="user" color={tintColor} size={24} />
        )
      }
    },
    Friends: {
      screen: FriendsStack,
      navigationOptions: {
        tabBarLabel: 'Friends',
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="user" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#91C7A3',
      inactiveTintColor: '#C0C0C0',
      style: { height: 70 },
      labelStyle: { fontSize: 14, fontFamily: 'Walsheim' }
    }
  }
);
