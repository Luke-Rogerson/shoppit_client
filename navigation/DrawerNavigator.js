import { createDrawerNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import FriendsStack from './FriendsStack';

export default createDrawerNavigator(
  {
    HomeStack,
    MyProfileStack,
    FriendsStack
  },
  {
    initialRouteName: 'HomeStack'
  }
);
