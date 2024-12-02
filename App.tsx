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
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    // <ScreenA/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ScreenA} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
