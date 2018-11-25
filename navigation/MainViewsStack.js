import { createStackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import FriendListScreen from '../screens/FriendListScreen';

export default createStackNavigator({
  ProfileScreen,
  ItemDetailScreen,
  FriendListScreen
});
