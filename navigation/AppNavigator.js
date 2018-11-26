import { createSwitchNavigator } from 'react-navigation';

import SignUpStack from './SignUpStack';
import BottomTabNavigator from './BottomTabNavigator';

export default createSwitchNavigator({
  SignUpStack,
  BottomTabNavigator
});
