import { createSwitchNavigator } from 'react-navigation';

import SignUpStack from './SignUpStack';
import DrawerNavigator from './DrawerNavigator';
import MainViewsStack from './MainViewsStack';

export default createSwitchNavigator({
  SignUp: SignUpStack,
  DrawerNav: DrawerNavigator,
  MainViews: MainViewsStack,
});
