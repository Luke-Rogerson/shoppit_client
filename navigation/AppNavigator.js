import { createSwitchNavigator } from 'react-navigation';

import SignUpStack from './SignUpStack';
import DrawerNavigator from './DrawerNavigator';

export default createSwitchNavigator({
  SignUp: SignUpStack,
  DrawerNav: DrawerNavigator
});
