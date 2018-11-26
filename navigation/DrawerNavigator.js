import { createBottomTabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import FriendsStack from './FriendsStack';

export default createBottomTabNavigator(
  {
    HomeStack,
    MyProfileStack,
    FriendsStack
  },
  {
    initialRouteName: 'HomeStack'
  }
);
