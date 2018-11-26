import { createStackNavigator } from 'react-navigation';

import FriendsListScreen from '../screens/FriendListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

export default createStackNavigator(
  {
    FriendsListScreen,
    ProfileScreen,
    ItemDetailScreen
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
