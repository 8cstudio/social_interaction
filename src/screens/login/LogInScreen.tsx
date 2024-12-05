import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
import { validateField } from '../../assets/data/InputValidation';
import { styles } from './styles';
import { colors } from '../../assets/data/colors';
const LoginScreen = ({navigation}: any) => {
  // const dispatch = useDispatch();
  // const data = useSelector((state: any) => state.data);
  // const [resend, setResend] = useState(false);
  // const [isLoading, setISLoading] = useState(false);
  // const [check, setCheck]: any = useState(false);
  // const [googleSignedIn, setGoogleSignedIn]: any = useState(false);
  // const [isAlertVisible, setIsAlertVisible] = useState(false);
  // const [alertData, setAlertData] = useState({
  //   title: '',
  //   message: '',
  //   onPress: () => {},
  // });
  const [userData, setUserData]: any = useState({
    email: '',
    userName: '',
    profilePic: '',
  });
  const [formData, setFormData]: any = useState({
    email: '',
    passworda: '',
  });
  const [formErrors, setFormErrors]: any = useState({
    emailError: null,
    passwordaError: null,
  });
  // async function googleSignIn() {
  //   try {
  //     console.log('1: checking device');
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     console.log('2: getting userCred');
  //     const {idToken, user} = await GoogleSignin.signIn();
  //     console.log('3');
  //     const {email, name, photo} = user;
  //     console.log('User Info:', {email, name, photo});
  //     const googleCredential = await auth.GoogleAuthProvider.credential(
  //       idToken,
  //     );
  //     console.log('4');
  //     const success =await auth().signInWithCredential(googleCredential);
  //     return {
  //       userCred: success,
  //       userName: name,
  //       email: email,
  //       profilePic: photo,
  //     };
  //   } catch (error) {
  //     console.log('error while signing in: ', error);
  //   }
  // }
  // const signInWithGoogle = async () => {
  //   const returnedData = await googleSignIn();
  //   console.log('returned', returnedData);
  //   try {
  //     if (returnedData) {
        
  //       saveData('google');
  //       const userId = auth().currentUser?.uid;
  //       console.log('Current user:- ', auth().currentUser?.uid);
  //       await firestore()
  //         .collection('users')
  //         .where('email', '==', auth().currentUser?.email)
  //         .get()
  //         .then(async res => {
  //           console.log('result: ', res.docs[0]?.exists);
  //           if (res.docs[0]?.exists) {
  //             console.log(
  //               'Already added this user:- ',
  //               auth().currentUser?.email,
  //             );
  //             navigation.reset({
  //               index: 0,
  //               routes: [{name: 'OnBoarding'}],
  //             });
  //           } else {
  //             console.log(
  //               'updating new user data................................',
  //             );

  //             await firestore().collection('users').doc(userId).set(
  //               {
  //                 name: returnedData?.userName,
  //                 email: auth().currentUser?.email,
  //                 profilePic: returnedData.profilePic,
  //               },
  //               {merge: true},
  //             );
  //             navigation.reset({
  //               index: 0,
  //               routes: [{name: 'OnBoarding'}],
  //             });
  //           }
  //         });
  //     } else {
  //       console.log('Invalid user');
  //     }
  //   } catch (error) {
  //     console.log("Error:- ",error);
      
  //   }
  //   // .then(async () => {
  //   //   const userId = auth().currentUser?.uid;
  //   //   console.log('Current user:- ', userId);
  //   //   console.log('userData stored in array: ', userData);

  //   //   // await firestore().collection('users').doc(userId).set(  {
  //   //   //   userName: userData.userName,
  //   //   //   email: auth().currentUser?.email,
  //   //   //   profilePic: userData.profilePic,
  //   //   // },
  //   //   // {merge: true},)
  //   //   navigation.reset({
  //   //     index: 0,
  //   //     routes: [{name: 'OnBoarding'}],
  //   //   });
  //   //   console.log('Signed in with Google!');
  //   // })
  // }

  // const saveData = async (type: any) => {
  //   try {
  //     const dataToSave = {
  //       remember: check,
  //       type: type,
  //     };
  //     await AsyncStorage.setItem('userPreferences', JSON.stringify(dataToSave));
  //     console.log('Success', 'Data saved successfully: ',dataToSave);
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to save data');
  //   }
  // };
  
  const handleInputChange = (fieldName: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    const error = validateField(fieldName, value);
    setFormErrors({
      ...formErrors,
      [`${fieldName}Error`]: error,
    });
  };
  // const handleOK = () => {
  //   setIsAlertVisible(false);
  // };
  // const handleLogin = async () => {
  //   setISLoading(true);
  //   auth()
  //     .signInWithEmailAndPassword(formData.email, formData.passworda)
  //     .then(async (userData: any) => {
  //       try {
  //         console.log(userData.user.emailVerified);
  //         if (userData.user.emailVerified) {
  //           await saveData('email');
  //           navigation.reset({
  //             index: 0,
  //             routes: [{name: 'OnBoarding'}],
  //           });
  //         } else {
  //           setIsAlertVisible(true);
  //           setResend(true);
  //           setAlertData({
  //             title: 'Alert!',
  //             message: 'Please Verify your email',
  //             onPress: () => {
  //               auth().signOut();
  //               setIsAlertVisible(false);
  //             },
  //           });
  //           console.log('No user document found');
  //         }
  //       } catch (error) {
  //         setIsAlertVisible(true);
  //         setAlertData({
  //           title: 'Error Message',
  //           message: 'Error getting user data:',
  //           onPress: () => setIsAlertVisible(false),
  //         });
  //         console.log('Error getting user data:', error);
  //       }
  //     })
  //     .catch(error => {
  //       setIsAlertVisible(true);
  //       setAlertData({
  //         title: 'Error Message',
  //         message: FirebaseError(error),
  //         onPress: () => setIsAlertVisible(false),
  //       });
  //       // alert('Error Message', error.code);
  //     })
  //     .finally(() => setISLoading(false));
  // };
  // function alert(title: string, message: string) {
  //   setIsAlertVisible(true);
  //   setAlertData({
  //     title: title,
  //     message: message,
  //     onPress: handleOK,
  //   });
  // }
  // console.log(formErrors);
  // function handleResend() {
  //   auth()?.currentUser?.sendEmailVerification();
  //   setResend(false);
  //   setAlertData({
  //     title: 'Success',
  //     message: 'Verification email sent',
  //     onPress: () => {
  //       auth().signOut();
  //       setIsAlertVisible(false);
  //     },
  //   });
  // }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
        onPress={() => navigation.goBack()}>
        {/* <Ionicons size={25} name={'arrow-back'} color={'#000'} /> */}
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign In Your Account</Text>
          <Text style={styles.description}>
            Experience Fitness, Virtually Perfect.{'\n'}
            Try Before You Buy with Kenna Fitness AR
          </Text>
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
              autoCapitalize
              keyboardType={'email-address'}
              backgroundColor
              bg={colors.iconBackground}
              placeholder={'Email'}
              iconName={'mail'}
              iconFamily={'antDesign'}
              iconSize={15}
              // prefixIcon={require('../../assets/icons/lock.png')}
              iconColor={colors.inputPlaceholder}
              isSecure={undefined}
              value={formData.email}
              onChangeText={(text: any) => handleInputChange('email', text)}
            />
          </View>
          {formErrors.emailError !== 'true' && formErrors.emailError && (
            <Text style={styles.error}>{formErrors.emailError}</Text>
          )}
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
              // keyboardType={'email-address'}
              bg={colors.iconBackground}
              backgroundColor
              placeholder={'Password'}
              iconName={'lock'}
              iconSize={15}
              iconFamily={'fontAwesome6'}
              iconColor={colors.inputPlaceholder}
              // prefixIcon={require('../../assets/icons/lock.png')}
              isSecure={true}
              value={formData.passworda}
              onChangeText={(text: any) => handleInputChange('passworda', text)}
              isSecureTextEntry={true}
            />
          </View>
          {formErrors.passwordaError !== 'true' &&
            formErrors.passwordaError && (
              <Text style={styles.error}>{formErrors.passwordaError}</Text>
            )}
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              navigation.reset({
                index: 1,
                routes: [
                  // {name: 'SocialAuth'},
                  {name: 'LoginScreen'},
                  {name: 'ForgotPassword'},
                ],
              });

              // navigation.navigate('ForgotPassword')
            }}>
            <Text
              style={{marginTop: 10, color: colors.black, fontWeight: '500'}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={[styles.checkBox, {marginBottom: 10}]}>
            {/* <CheckBox check={check} onCheck={setCheck} index={1} /> */}
            <Text
              style={{fontSize: 15, fontWeight: '500', color: colors.black}}>
              Remember me
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <CustomButton
              disabled={
                !(formErrors.emailError === 'true') ||
                !(formErrors.passwordaError === 'true')
              }
              // isLoading={isLoading}
              title={'Sign In'}
              btnColor={
                !(formErrors.emailError === 'true') ||
                !(formErrors.passwordaError === 'true')
                  ? colors.gray
                  : colors.black
              }
              btnTextColor={'#fff'}
              onPress={()=>navigation.navigate('Home')}
              borderRadius={50}
            />
          </View>

          <View style={styles.orText}>
            <View
              style={{height: 2, width: '45%', backgroundColor: '#EAEAEA'}}
            />
            <Text
              style={{
                color: '#5C5C5C',
                fontSize: 18,
                padding: 5,
                marginBottom: 3,
              }}>
              or continue with
            </Text>
            <View
              style={{height: 2, width: '45%', backgroundColor: '#EAEAEA'}}
            />
          </View>
          <View style={styles.socialContainer}>
            {/* <View style={styles.socialBox}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={require('../../assets/images/fb.png')}
              />
            </View> */}
            <TouchableOpacity
              // onPress={signInWithGoogle}
              style={styles.socialBox}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={require('../../assets/images/google.png')}
              />
            </TouchableOpacity>
            {/* <View style={styles.socialBox}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={require('../../assets/images/apple.png')}
              />
            </View> */}
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text
              style={{
                color: colors.lightGray1,
                // fontFamily: fonts.f300,
              }}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{color: '#000',
              
              // fontFamily: fonts.f600


              }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <CustomAlert
        message={alertData.message}
        title={alertData.title}
        visible={isAlertVisible}
        onPress={handleOK}
        onRequestClose={handleOK}
        onResend={handleResend}
        resend={resend}
      /> */}
    </SafeAreaView>
  );
};

export default LoginScreen;
