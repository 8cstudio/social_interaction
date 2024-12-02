import {View, Text} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ScreenA from '../screens/ScreenA';
import SplashScreen from '../navigations/splash/SplashScreen';
import LoginScreen from '../navigations/login/LoginScreen';

const Stack = createStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
