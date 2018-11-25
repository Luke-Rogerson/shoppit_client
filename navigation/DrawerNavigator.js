import { createDrawerNavigator } from 'react-navigation';

import homeScreen from '../screens/homeScreen';
import profileScreen from '../screens/profileScreen';
import friendListScreen from '../screens/friendListScreen';

export default createDrawerNavigator({
  homeScreen,
  profileScreen,
  friendListScreen
});