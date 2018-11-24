import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator } from 'react-navigation';

import signInScreen from '../screens/signInScreen';
import categoriesScreen from '../screens/categoriesScreen';
import readyScreen from '../screens/readyScreen';
import homeScreen from '../screens/homeScreen';
import profileScreen from '../screens/profileScreen';
import friendListScreen from '../screens/friendListScreen';

const DrawerNav = createDrawerNavigator({
  homeScreen,
  profileScreen,
  friendListScreen,
});

const StackNavigator = createStackNavigator({
  signInScreen,
  DrawerNav,
  categoriesScreen,
  readyScreen,
});



const AppNavigator = createSwitchNavigator({
  StackNavigator,
  DrawerNav,
});

export default AppNavigator;


