import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import FriendListScreen from '../screens/FriendListScreen';

export default createStackNavigator(
  {
    HomeScreen,
    ProfileScreen,
    ItemDetailScreen,
    FriendListScreen
  },
  {
    headerMode: 'float',
    headerBackTitleVisible: true,
    navigationOptions: ({
      headerStyle: { backgroundColor: '#6F6E6C' },
      title: 'WISHOP',
      headerTintColor: 'white',
    })
  }
);
