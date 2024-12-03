import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets/data/colors';
import {styles} from './styles';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
// import auth from '@react-native-firebase/auth';
import {validateField} from '../../assets/data/InputValidation';
// import axios from 'axios';
// import {baseUrl} from '../../assets/data/ApiKeys';
// import CustomAlert from '../../components/customAlert/CustomAlert';
const ForgotPassword = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recovery, setRecovery]: any = useState(false);
  const [formData, setFormData]: any = useState({
    email: '',
    recoveryKey: '',
  });
  const [formErrors, setFormErrors]: any = useState({
    emailError: null,
    recoveryKeyError: null,
  });

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    onPress: () => {},
  });

  // const handleOK = () => {
  //   navigation.reset({
  //     index: 1,
  //     routes: [{name: 'LoginScreen'}, {name: 'ForgotPassword'}],
  //   });
  //   setIsAlertVisible(false);
  // };
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
  console.log(formErrors.emailError);
  function handleRecoveryKey() {
    navigation.navigate('NewPassword', {
      email: formData.email,
      recoveryKey: formData.recoveryKey,
    });
    console.log('recovering here');
  }
  // function handleForgot() {
  //   setIsLoading(true);
  //   console.log(formData.email);
  //   fetch(`${baseUrl}forget_password`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({email: formData.email}),
  //   })
  //     .then(async result => {
  //       const data = await result.json();
  //       console.log('Success', data);
  //       if (data?.message === 'Recovery code sent and saved successfully') {
  //         alert2('Success', 'Password recovery key sent');

  //         setIsLoading(false);
  //         setRecovery(true);
  //       } else {
  //         setIsLoading(false);
  //         alert('Error Message', 'invalid Email');
  //       }
  //     })
  //     .catch(error => {
  //       setIsLoading(false);
  //       alert('Error Message', error);
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
  function alert2(title: string, message: string) {
    setIsAlertVisible(true);
    setAlertData({
      title: title,
      message: message,
      onPress: () => {
        setIsAlertVisible(false);
      },
    });
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        onPress={() => navigation.goBack()}>
        {/* <Ionicons size={25} name={'arrow-back'} color={'#000'} /> */}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>
          {recovery ? 'Recovery Code' : 'Forget Password'}
        </Text>
        <Text style={styles.description}>
          {recovery
            ? 'Experience Fitness, Virtually Perfect. Try Before You Buy with Kenna Fitness AR'
            : ' Experience Fitness, Virtually Perfect. Try Before You Buy with Kenna Fitness AR'}
        </Text>
        <View style={{width: '100%', height: 60, marginTop: 15}}>
          <CustomTextInput
            // editable={recovery&& formData.recoveryKey.length ===6 ? false: true}
            backgroundColor
            bg={colors.iconBackground}
            placeholder={recovery ? 'Enter your code' : 'Email'}
            iconName={recovery ? 'lock' : 'mail'}
            iconFamily={recovery ? 'fontAwesome6' : 'antDesign'}
            iconSize={15}
            prefixIcon
            iconColor={colors.inputPlaceholder}
            isSecure={undefined}
            value={recovery ? formData.recoveryKey : formData.email}
            onChangeText={(text: any) =>
              handleInputChange(recovery ? 'recoveryKey' : 'email', text)
            }
          />
        </View>
        {formErrors.emailError !== 'true' && formErrors.emailError && (
          <Text style={styles.error}>{formErrors.emailError}</Text>
        )}
        {recovery &&
          formErrors.recoveryKeyError !== 'true' &&
          formErrors.recoveryKeyError && (
            <Text style={styles.error}>{formErrors.recoveryKeyError}</Text>
          )}
        <View style={{width: '100%'}}>
          <CustomButton
            isLoading={isLoading}
            disabled={
              recovery
                ? formErrors.recoveryKeyError !== 'true'
                : formErrors.emailError !== 'true'
            }
            // isLoading={isLoading}
            title={'Next'}
            btnColor={
              recovery
                ? formErrors.recoveryKeyError === 'true'
                  ? colors.black
                  : colors.grey
                : formErrors.emailError === 'true'
                ? colors.black
                : colors.grey
            }
            btnTextColor={'#fff'}
            onPress={recovery ? handleRecoveryKey : ()=>setRecovery(true)}
            // onPress={recovery ? handleRecoveryKey : handleForgot}
            // onPress={()=>navigation.navigate('GenderSelection')}
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
    </SafeAreaView>
  );
};

export default ForgotPassword;
