import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ReadyScreen from '../screens/ReadyScreen';

export default createStackNavigator(
  {
    SignInScreen,
    CategoriesScreen,
    ReadyScreen,
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: { backgroundColor: '#E73536' },
      title: 'TINDER FOR COOL SHIT',
      headerTintColor: 'white',
      headerLeft: null, // Disables back button
      gesturesEnabled: false // Prevents user being able to swipe left to go back in stack
    }
  }
);
