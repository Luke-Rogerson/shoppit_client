import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import FriendsStack from './FriendsStack';
import CategoriesStack from './CategoriesStack';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        displayName: 'home',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome displayName="home" color={tintColor} size={24} />
        )
      }
    },
    MyCategories: {
      screen: CategoriesStack,
      navigationOptions: {
        tabBarLabel: 'Categories',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="th-list" color={tintColor} size={24} />
        )
      }
    },
    MyProfile: {
      screen: MyProfileStack,
      navigationOptions: {
        tabBarLabel: 'My Profile',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" color={tintColor} size={24} />
        )
      }
    },
    Friends: {
      screen: FriendsStack,
      navigationOptions: {
        tabBarLabel: 'Friends',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="users" color={tintColor} size={24} />
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
