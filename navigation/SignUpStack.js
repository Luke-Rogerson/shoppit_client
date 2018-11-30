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
    headerMode: 'float',
    navigationOptions: {
      headerStyle: { backgroundColor: '#FAFAFA' },
      title: 'WISHER',
      headerTintColor: '#6F6E6C',
      headerLeft: null, // Disables back button
      gesturesEnabled: false // Prevents user being able to swipe left to go back in stack
    }
  }
);
