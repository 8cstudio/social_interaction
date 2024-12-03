import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../assets/data/colors';
import CustomButton from '../../components/customButton/CustomButton';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import {styles} from './styles';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {validateField} from '../../assets/data/InputValidation';
// import {baseUrl} from '../../assets/data/ApiKeys';
// import SucessModal from '../../components/customAlert/SucessModal';
// import {Button} from 'react-native-share';
// import CustomAlert from '../../components/customAlert/CustomAlert';
const NewPassword = ({navigation, route}: any) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    onPress: () => {},
  });

  const handleOK = () => {
    navigation.reset({
      index: 1,
      routes: [
        // {name: 'SocialAuth'},
        {name: 'LoginScreen'},
        {name: 'ForgotPassword'},
      ],
    });
    setIsAlertVisible(false);
  };
  const [successModal, setSuccessModal] = useState(false);
  const data = route.params;
  const [formData, setFormData]: any = useState({
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors]: any = useState({
    passwordError: null,
    confirmPasswordError: null,
  });
  const handleInputChange = (fieldName: any, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    console.log(formErrors);

    const error = validateField(fieldName, value);

    setFormErrors({
      ...formErrors,
      [`${fieldName}Error`]: error,
    });
  };
  // console.log('Recieved data is:- ', data);
  // function handleChangePassword() {
  //   setIsLoading(true)
  //   console.log(formData.email);
  //   fetch(`${baseUrl}update_password`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: data?.email,
  //       recovery_code: data?.recoveryKey,
  //       new_password: formData.password,
  //     }),
  //   })
  //     .then(async result => {
  //       const data = await result.json();
  //       console.log('Success', data);
  //       if (data?.message !== 'Password updated successfully') {
  //         alert('Alert!', 'Please provide a valid recovery key.');
  //         //   Alert.alert('Alert!', 'Please provide a valid recovery key.', [
  //         //     {
  //         //       text: "OK",
  //         //       onPress: () => {
  //         //         navigation.reset({
  //         //             index: 1,
  //         //             routes: [{name: 'LoginScreen'}, {name: 'ForgotPassword'}],
  //         //           });
  //         //       }
  //         //     }
  //         //   ],);
  //       } else if (data?.message === 'Password updated successfully') {
  //         setIsLoading(false);
  //         setSuccessModal(true);
  //         setTimeout(() => {
  //           setSuccessModal(false);
  //           navigation.reset({
  //             index: 1,
  //             routes: [{name: 'SocialAuth'}, {name: 'LoginScreen'}],
  //           });
  //         }, 2000);
  //       }
  //     })
  //     .catch(error => {
  //       Alert.alert('Error Message', error);
  //     });
  // }
  // function alert(title: string, message: string) {
  //   setIsAlertVisible(true);
  //   setAlertData({
  //     title: title,
  //     message: message,
  //     onPress: handleOK,
  //   });
  // }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
        onPress={() => navigation.goBack()}>
        {/* <Ionicons size={25} name={'arrow-back'} color={'#000'} /> */}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          // height: '90%',
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.description}>
          Experience Fitness, Virtually Perfect. Try Before You Buy with Kenna
          Fitness AR
        </Text>
        <View style={{width: '100%', height: 60, marginTop: 15}}>
          <CustomTextInput
            // editable={recovery&& formData.recoveryKey.length ===6 ? false: true}
            backgroundColor
            bg={colors.iconBackground}
            placeholder={'Enter New Password'}
            iconName={'lock'}
            iconFamily={'fontAwesome6'}
            iconSize={15}
            prefixIcon
            iconColor={colors.inputPlaceholder}
            isSecureTextEntry
            isSecure
            value={formData.password}
            onChangeText={(text: any) => handleInputChange('password', text)}
          />
        </View>
        {formErrors.passwordError !== 'true' && formErrors.passwordError && (
          <Text style={styles.error}>{formErrors.passwordError}</Text>
        )}

        <View style={{width: '100%', height: 60, marginTop: 15}}>
          <CustomTextInput
            // editable={recovery&& formData.recoveryKey.length ===6 ? false: true}
            backgroundColor
            bg={colors.iconBackground}
            placeholder={'Confirm New Password'}
            iconName={'lock'}
            iconFamily={'fontAwesome6'}
            iconSize={15}
            prefixIcon
            iconColor={colors.inputPlaceholder}
            isSecureTextEntry
            isSecure
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
            <Text style={styles.error}>{formErrors.confirmPasswordError}</Text>
          )}

        <View style={{width: '100%'}}>
          <CustomButton
            isLoading={isLoading}
            disabled={
              !(formErrors.passwordError === 'true') ||
              !(formErrors.confirmPasswordError === 'true') ||
              formData.password !== formData.confirmPassword
            }
            title={'Next'}
            btnColor={
              !(formErrors.passwordError === 'true') ||
              !(formErrors.confirmPasswordError === 'true') ||
              formData.password !== formData.confirmPassword
                ? colors.gray
                : colors.black
            }
            btnTextColor={'#fff'}
            // onPress={handleChangePassword}
            onPress={()=>navigation.navigate('LoginScreen')}
            borderRadius={50}
          />
        </View>
      </View>
      {/* <CustomAlert
        message={alertData.message}
        title={alertData.title}
        visible={isAlertVisible}
        onPress={alertData.onPress}
        onRequestClose={handleOK}
      /> */}
      {/* <SucessModal
        visible={successModal}
        title={'You Have Successfully Uploaded Your Content'}
        // onPress={() => success()}
        // onCancel={() => success()}
        // onRequestClose={() => success()}
      /> */}
    </SafeAreaView>
  );
};

export default NewPassword;
