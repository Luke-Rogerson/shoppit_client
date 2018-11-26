import { createSwitchNavigator } from 'react-navigation';

import SignUpStack from './SignUpStack';
import BottomTabNavigator from './DrawerNavigator';

export default createSwitchNavigator({
  SignUpStack,
  BottomTabNavigator
});
