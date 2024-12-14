import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/customButton/CustomButton';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import {colors} from '../../assets/data/colors';
import {FirebaseError, validateField} from '../../assets/data/InputValidation';
import {styles} from './styles';
import CustomAlert from '../../components/modals/CustomAlert';
import { handleSignUp, signInWithGoogle } from '../../components/functions/AuthFunctions';
const SignUp = ({navigation}: any) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    onPress: () => {},
  });

  const handleOK = () => {
    setIsAlertVisible(false);
  };
  // const [check, setCheck] = useState(false);
  const [isLoading, setISLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    userNameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
  });
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
  // const handleSignUp = async () => {
  //   setISLoading(true);
  //   try {
  //     await firestore()
  //       .collection('users')
  //       .where('userName', '==', `${formData.userName}`)
  //       .get()
  //       .then((result: any) => {
  //         console.log('here');

  //         if (!result?.docs[0]?.exists) {
  //           console.log('res: ', result?.docs[0]?.exists);
  //           auth()
  //             .createUserWithEmailAndPassword(formData.email, formData.password)
  //             .then(async () => {
  //               const userId = await auth().currentUser?.uid;
  //               const user = userData(
  //                 formData.email,
  //                 formData.password,
  //                 formData.userName,
  //               );
  //               console.log('User Data stored in firebase:- ', user);

  //               await firestore()
  //                 .collection('users')
  //                 .doc(userId)
  //                 .set(user)
  //                 .then(() => {
  //                   if (auth().currentUser) {
  //                     auth().currentUser?.sendEmailVerification();
  //                     console.log('current user: ', auth().currentUser?.email);
  //                     setIsAlertVisible(true);
  //                     setAlertData({
  //                       title: 'Success',
  //                       message: "'Account created successfully'",
  //                       onPress: () => {
  //                         navigation.reset({
  //                           index: 1,
  //                           routes: [
  //                             {name: 'LoginScreen'},
  //                             {name: 'ProfileSetting'}, 
  //                           ],
  //                         });
  //                       },
  //                     });
  //                   } else {
  //                     console.log('No user signed in');
  //                   }
  //                 })
  //                 .catch(error => {
  //                   alert('Error Message', FirebaseError(error));
  //                 });
  //               // navigation.navigate('GenderSelection');
  //               // setIsAlertVisible(true);
  //               // setAlertData({
  //               //   title: 'Success',
  //               //   message: "'Account created successfully'",
  //               //   onPress: () => {
  //               //     navigation.navigate('GenderSelection');
  //               //   },
  //               // });
  //               console.log('User account created');
  //             })
  //             .catch(error => {
  //               console.log('lknbkb', error);
  //               alert('Error Message', FirebaseError(error));
  //             });
  //         } else {
  //           Alert.alert('Error Message', 'Email or Username already exist');
  //         }
  //       });
  //   } catch (error) {
  //     alert('Error Message', FirebaseError(error));
  //   } finally {
  //     console.log(' jckd jh cjhd ch');

  //     setISLoading(false);
  //   }
  //   return;
  // };
  function alert(title: string, message: string) {
    setIsAlertVisible(true);
    setAlertData({
      title: title,
      message: message,
      onPress: handleOK,
    });
  }
  return (

    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={{paddingTop: 20, paddingLeft: 10}}
        onPress={() => navigation.goBack()}>
          {/* // icon here */}
      </TouchableOpacity>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop:10,
          }}>
          <Text
            style={{
              // marginTop: 15,
              fontSize: 30,
              fontWeight: '700',
              color: colors.headingColor,
            }}>
            Create Your Account
          </Text>
          <Text
            style={{
              marginVertical: 10,
              textAlign: 'center',
              color: colors.lightGray1,
            }}>
            Experience Fitness, Virtually Perfect.{'\n'}
            Try Before You Buy with Kenna Fitness AR
          </Text>
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
            autoCapitalize
              onError={
                formErrors.userNameError !== 'true' && formErrors.userNameError
                  ? true
                  : false
              }
              bg={colors.iconBackground}
              backgroundColor
              placeholder={'Username'}
              iconName={'user-large'}
              iconFamily={'fontAwesome6'}
              iconColor={colors.inputPlaceholder}
              iconSize={15}
              // prefixIcon={require('../../assets/icons/lock.png')}
              value={formData.userName}
              onChangeText={(text: any) => handleInputChange('userName', text)}
            />
          </View>
          {formErrors.userNameError !== 'true' && formErrors.userNameError && (
            <Text style={styles.error}>{formErrors.userNameError}</Text>
          )}
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
              autoCapitalize
              bg={colors.iconBackground}
              backgroundColor
              placeholder={'Email'}
              iconName={'mail'}
              iconFamily={'antDesign'}
              iconColor={colors.inputPlaceholder}
              iconSize={15}
              // prefixIcon={require('../../assets/icons/lock.png')}
              value={formData.email}
              onChangeText={(text: any) => handleInputChange('email', text)}
            />
          </View>
          {formErrors.emailError !== 'true' && formErrors.emailError && (
            <Text style={styles.error}>{formErrors.emailError}</Text>
          )}
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
              bg={colors.iconBackground}
              backgroundColor
              placeholder={'Password'}
              iconName={'lock'}
              iconSize={15}
              iconFamily={'fontAwesome6'}
              iconColor={colors.inputPlaceholder}
              // prefixIcon={require('../../assets/icons/lock.png')}
              isSecure={true}
              value={formData.password}
              onChangeText={(text: any) => handleInputChange('password', text)}
              isSecureTextEntry={true}
            />
          </View>
          {formErrors.passwordError !== 'true' && formErrors.passwordError && (
            <Text style={styles.error}>{formErrors.passwordError}</Text>
          )}
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
              bg={colors.iconBackground}
              backgroundColor
              placeholder={'Confirm Password'}
              iconName={'lock'}
              iconSize={15}
              iconFamily={'fontAwesome6'}
              iconColor={colors.inputPlaceholder}
              // prefixIcon={require('../../assets/icons/lock.png')}
              isSecure={true}
              isSecureTextEntry={true}
              value={formData.confirmPassword}
              onChangeText={(text: any) =>
                handleInputChange('confirmPassword', text)
              }
            />
          </View>
          {formErrors.confirmPasswordError === 'true' &&
            formData.password !== formData.confirmPassword && (
              <Text style={styles.error}>
                Confirm password should match with password.
              </Text>
            )}
          {formErrors.confirmPasswordError !== 'true' &&
            formErrors.confirmPasswordError && (
              <Text style={styles.error}>
                {formErrors.confirmPasswordError}
              </Text>
            )}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              marginBottom: 30,
            }}>
            <CheckBox check={check} onCheck={setCheck} index={1} />
            <Text
              style={{fontSize: 15, fontWeight: '500', color: colors.black}}>
              Remember me
            </Text>
          </View> */}
          <View style={{width: '100%', marginTop: 10}}>
            <CustomButton
              disabled={
                !(formErrors.userNameError === 'true') ||
                !(formErrors.emailError === 'true') ||
                !(formErrors.passwordError === 'true') ||
                !(formErrors.confirmPasswordError === 'true') ||
                formData.password !== formData.confirmPassword
              }
              title={'Sign Up'}
              btnColor={
                !(formErrors.userNameError === 'true') ||
                !(formErrors.emailError === 'true') ||
                !(formErrors.passwordError === 'true') ||
                !(formErrors.confirmPasswordError === 'true') ||
                formData.password !== formData.confirmPassword
                  ? colors.gray
                  :
                   colors.black
              }
              btnTextColor={'#fff'}
              icon={undefined}
              onPress={()=>handleSignUp(setISLoading, formData, navigation, setIsAlertVisible, setAlertData, alert)}
              // onPress={()=>navigation.goBack()}
              borderRadius={50}
              isLoading={isLoading}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
            }}>
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
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {/* <View
              style={{
                height: 65,
                width: 80,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#E5E0E0',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={require('../../assets/images/fb.png')}
              />
            </View> */}
            <TouchableOpacity 
                disabled={isLoading}
                onPress={() => signInWithGoogle(setISLoading, navigation)}
              style={{
                height: 65,
                width: 80,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#E5E0E0',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={require('../../assets/images/google.png')}
              />
            </TouchableOpacity>
            {/* <View
              style={{
                height: 65,
                width: 80,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#E5E0E0',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={require('../../assets/images/apple.png')}
              />
            </View> */}
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text style={{color: colors.lightGray1, 
            
            // fontFamily: fonts.f300

            }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={{color: '#000', 
                // fontFamily: fonts.f600
                
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomAlert
        message={alertData.message}
        title={alertData.title}
        visible={isAlertVisible}
        onPress={alertData.onPress}
        onRequestClose={handleOK}
      />
    </SafeAreaView>

    </KeyboardAvoidingView>
  );
};

export default SignUp;
