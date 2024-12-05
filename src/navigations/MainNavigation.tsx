import {View, Text} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/login/LogInScreen';
import SignUp from '../screens/signUp/SignUp';
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import NewPassword from '../screens/forgotPassword/NewPassword';
import Home from '../screens/home/Home';
import CapturedData from '../screens/capturedData/CapturedData.';

const Stack = createStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CapturedData" component={CapturedData} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
