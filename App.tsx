/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import ScreenA from './src/screens/ScreenA';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';
import firestore from "@react-native-firebase/firestore"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
function App(): React.JSX.Element {
  // useEffect(()=>{
  //   firestore().collection("user").add({name:"Hellow"})
  //   .then((res)=>{
  //     console.log("resul",res);
      
  //   })
  //   .catch((error)=>{
  //     console.log(error);
      
  //   })
  // },[])
  GoogleSignin.configure({
    webClientId: "435849897760-esgl70pk9dr2487ib2eoj6c1o61kbmks.apps.googleusercontent.com",
  });
  return (
    // <ScreenA/>
    <NavigationContainer>
      <MainNavigation/>
    </NavigationContainer>
  );
}

export default App;
