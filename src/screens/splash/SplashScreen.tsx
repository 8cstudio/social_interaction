import {Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { styles } from './styles';
// import {styles} from './styles';
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {useDispatch} from 'react-redux';
// import CustomAlert from '../../components/customAlert/CustomAlert';
// import {addData} from '../../redux/ProfileSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
function SplashScreen({navigation}: any) {
//   const dispatch = useDispatch();
//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [alertData, setAlertData] = useState({
//     title: '',
//     message: '',
//     onPress: () => {},
//   });
  useEffect(() => {
    const timer = setTimeout(async () => {
      const jsonData = await AsyncStorage.getItem('userPreferences');
      if (jsonData !== null) {
        const data: any = JSON.parse(jsonData);
        console.log(data);
        
        // if (!auth().currentUser?.emailVerified) {
        //   navigation.reset({
        //     index: 0,
        //     routes: [{name: 'LoginScreen'}],
        //   });
        // } else {
          if (data.remember === true && data.type === 'google') {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } else if (data.remember === false && data.type === 'google') {
            await GoogleSignin.revokeAccess().then((t)=>{}).catch((e)=>{
            })
            await GoogleSignin.signOut().then((t)=>{}).catch((e)=>{});
           await  auth().signOut();
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          } else if (data.remember === true && data.type === 'email') {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } else if (data.remember === false && data.type === 'email') {
            auth().signOut();
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          } else if(data.remember === false && data.type === ''){
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          // } 
        }
      }else{
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    }, 2000);
  }, []);
//   }, [isAlertVisible]);

  return (
    <SafeAreaView style={styles.container}>
      
    {/* <ImageBackground source={require('../../assets/images/bgg.png')} style={styles.bgImage}> */}
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../../assets/images/logo.png')}
      />
      {/* <CustomAlert
        message={alertData.message}
        title={alertData.title}
        visible={isAlertVisible}
        onPress={() => {
          setIsAlertVisible(false);
        }}
        // onRequestClose={handleOK}
      /> */}
    {/* </ImageBackground> */}
    </SafeAreaView>
  );
}

export default SplashScreen;
