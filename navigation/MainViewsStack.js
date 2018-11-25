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
    navigationOptions: {
      headerStyle: { backgroundColor: '#E73536' },
      title: 'TINDER FOR COOL SHIT',
      headerTintColor: 'white'
    }
  }
);
