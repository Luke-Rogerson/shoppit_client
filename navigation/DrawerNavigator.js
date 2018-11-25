import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FriendListScreen from '../screens/FriendListScreen';

export default createDrawerNavigator(
  {
    HomeScreen,
    ProfileScreen,
    FriendListScreen
  },
  {
    initialRouteName: 'HomeScreen'
  }
);
