import { createDrawerNavigator } from 'react-navigation';

import MainViewsStack from './MainViewsStack';
import ProfileScreen from '../screens/ProfileScreen';
import FriendListScreen from '../screens/FriendListScreen';

export default createDrawerNavigator({
  Home: MainViewsStack, // Using MainViewsStack temporarily
  ProfileScreen,
  FriendListScreen
});
