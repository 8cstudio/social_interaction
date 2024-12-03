/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import ScreenA from './src/screens/ScreenA';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';
function App(): React.JSX.Element {
  return (
    // <ScreenA/>
    <NavigationContainer>
      <MainNavigation/>
    </NavigationContainer>
  );
}

export default App;
