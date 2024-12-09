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
import SendTo from '../screens/sendTo/SendTo';
import Feeds from '../screens/feeds/Feeds';
import Profile from '../screens/profile/Profile';
import SettingsScreen from '../screens/settings/Settings';
import AddFriendsScreen from '../screens/addFriends/AddFriends';
import ChatScreen from '../screens/chatScreen/ChatScreen';
import ChatsSettings from '../screens/settings/ChatsSettings';
import StorageAndData from '../screens/settings/StorageAndData';
import HelpScreen from '../screens/settings/HelpScreen';
import NotificationsSettings from '../screens/settings/NotificationsSettings';
import AccountSettings from '../screens/settings/AccountSettings';
import Messages from '../screens/messages/Messages';
import CustomBottomNavigation from '../screens/bottomTabs/BottomTabs';

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

      <Stack.Screen name="Home" component={CustomBottomNavigation} />

      <Stack.Screen name="SendTo" component={SendTo} />
      <Stack.Screen name="Feeds" component={Feeds} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="AddFriendsScreen" component={AddFriendsScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CapturedData" component={CapturedData} />
      <Stack.Screen name="ChatsSettings" component={ChatsSettings} />
      <Stack.Screen name="StorageAndData" component={StorageAndData} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettings} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
