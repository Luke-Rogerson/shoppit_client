import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';

import CurrentUserAvatar from './CurrentUserAvatar';

export default createStackNavigator(
  {
    CategoriesScreen
  },
  {
    headerMode: 'float',
    headerBackTitleVisible: true,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#91C7A3', height: 65 },
      headerTitle: (
        <Text
          style={{
            marginTop: -15,
            fontFamily: 'Pacifico',
            color: '#f8fafa',
            fontSize: 25
          }}
        >
          <Image source={require('./../assets/small-logo.png')} />
          shoppit
        </Text>
      ),
      headerBackTitle: 'Back',
      headerTintColor: 'white',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <CurrentUserAvatar />
        </TouchableOpacity>
      )
    })
  }
);
