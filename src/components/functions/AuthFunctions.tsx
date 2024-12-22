import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Sign in with google and stored the profile data in firebase firestore
export const signInWithGoogle = async (setISLoading: any, navigation: any) => {
    setISLoading(true);
    try {
      const returnedData = await googleSignIn();
      if (returnedData) {
        saveData('google');
        const userId = auth().currentUser?.uid;
        await firestore()
          .collection('users')
          .where('email', '==', auth().currentUser?.email)
          .get()
          .then(async res => {
            if (res.docs[0]?.exists) {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            } else {
              await firestore().collection('users').doc(userId).set(
                {
                  name: returnedData?.userName,
                  email: auth().currentUser?.email,
                  profilePic: returnedData.profilePic,
                },
                {merge: true},
              );
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }
          });
      } else {
        console.log('Invalid user');
      }
    } catch (error) {
      console.log('Error:- ', error);
    } finally {
      setISLoading(false);
    }
  };
  async function googleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      const {email, name, photo} = user;
      const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
      console.log('4');
      const success = await auth().signInWithCredential(googleCredential);
      return {
        userCred: success,
        name: name,
        userName: name,
        email: email,
        profilePic: photo,
      };
    } catch (error) {
      console.log('error while signing in: ', error);
    }
  }
  const saveData = async (type: any) => {
    try {
      const dataToSave = {
        remember: true,
        type: type,
      };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(dataToSave));
      console.log('Success', 'Data saved successfully: ', dataToSave);
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  
//Handle Login with email and password
export const handleLogin = async (
    setISLoading: any,
    formData: any,
    navigation: any,
    setIsAlertVisible: any,
    setResend: any,
    setAlertData: any,
  ) => {
    setISLoading(true);
    auth()
      .signInWithEmailAndPassword(formData.email, formData.passworda)
      .then(async (userData: any) => {
        const userId = auth().currentUser?.uid;
        try {
          console.log(userData.user.emailVerified);
          // if (userData.user.emailVerified) {
            await saveData('email');
  
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
            //   navigation.reset({
            //     index: 0,
            //     routes: [{name: 'OnBoarding'}],
            //   });
          // } else {
          //   setIsAlertVisible(true);
          //   setResend(true);
          //   setAlertData({
          //     title: 'Alert!',
          //     message: 'Please Verify your email',
          //     onPress: () => {
          //       auth().signOut();
          //       setIsAlertVisible(false);
          //     },
          //   });
          //   console.log('No user document found');
          // }
        } catch (error) {
          setIsAlertVisible(true);
          setAlertData({
            title: 'Error Message',
            message: 'Error getting user data:',
            onPress: () => setIsAlertVisible(false),
          });
          console.log('Error getting user data:', error);
        }
      })
      .catch(error => {
        setIsAlertVisible(true);
        setAlertData({
          title: 'Error Message',
          message: FirebaseError(error),
          onPress: () => setIsAlertVisible(false),
        });
        // alert('Error Message', error.code);
      })
      .finally(() => setISLoading(false));
  };
  //create user with email and password and send email verification
  export const handleSignUp = async (
    setISLoading: any,
    formData: any,
    navigation: any,
    setIsAlertVisible: any,
    setAlertData: any,
    alert: any,
  ) => {
    setISLoading(true);
    try {
      await firestore()
        .collection('users')
        .where('userName', '==', `${formData.userName}`)
        .get()
        .then((result: any) => {
          console.log('here');
  
          if (!result?.docs[0]?.exists) {
            console.log('res: ', result?.docs[0]?.exists);
            auth()
              .createUserWithEmailAndPassword(formData.email, formData.password)
              .then(async () => {
                const userId = auth().currentUser?.uid;
                const user = {
                  email: formData.email,
                  password: formData.password,
                  userName: formData.userName,
                };
                console.log('User Data stored in firebase:- ', user);
  
                await firestore()
                  .collection('users')
                  .doc(userId)
                  .set(user)
                  .then(() => {
                    if (auth().currentUser) {
                      // auth().currentUser?.sendEmailVerification();
                      console.log('current user: ', auth().currentUser?.email);
                      setIsAlertVisible(true);
                      setAlertData({
                        title: 'Success',
                        message: "'Account created successfully'",
                        onPress: () => {
                          navigation.reset({
                            index: 0,
                            routes: [
                              {name: 'Home'},
                            ],
                          });
                        },
                      });
                    } else {
                      console.log('No user signed in');
                    }
                  })
                  .catch(error => {
                    alert('Error Message', FirebaseError(error));
                  });
                // navigation.navigate('GenderSelection');
                // setIsAlertVisible(true);
                // setAlertData({
                //   title: 'Success',
                //   message: "'Account created successfully'",
                //   onPress: () => {
                //     navigation.navigate('GenderSelection');
                //   },
                // });
                console.log('User account created');
              })
              .catch(error => {
                console.log('lknbkb', error);
                alert('Error Message', FirebaseError(error));
              });
          } else {
            Alert.alert('Error Message', 'Email or Username already exist');
          }
        });
    } catch (error) {
      alert('Error Message', FirebaseError(error));
    } finally {
      setISLoading(false);
    }
    return;
  };

  export function FirebaseError(error: any) {
    console.log('Function Firebase Error', error);
  
    let errorMessage = '';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Incorrect Credential';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect Credential';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'Email is already in use.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many sign-in attempts. Try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Your account has been disabled. Please contact support.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Incorrect Credential';
        break;
      default:
        errorMessage = 'An error occurred. Please try again later.' + error.code;
        break;
    }
    return errorMessage;
  }