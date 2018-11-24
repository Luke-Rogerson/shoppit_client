import { createStackNavigator } from 'react-navigation';
import signInScreen from '../screens/signInScreen';
import categoriesScreen from '../screens/categoriesScreen';


const Apps = createStackNavigator({
  signInScreen: { screen: signInScreen },
  categoriesScreen: { screen: categoriesScreen }
});

export default Apps;

