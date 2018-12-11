import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ReadyScreen from '../screens/ReadyScreen';

export default createStackNavigator(
  {
    SignInScreen,
    CategoriesScreen,
    ReadyScreen
  },
  {
    headerMode: 'none'
  }
);
