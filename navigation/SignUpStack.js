import { createStackNavigator } from 'react-navigation';

import signInScreen from '../screens/signInScreen';
import categoriesScreen from '../screens/categoriesScreen';
import readyScreen from '../screens/readyScreen';

export default createStackNavigator({
  signInScreen,
  categoriesScreen,
  readyScreen
});