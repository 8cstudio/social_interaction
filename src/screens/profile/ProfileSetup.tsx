import {
    View,
    Text,
    SafeAreaView,
    ViewBase,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import React, {useState} from 'react';
  import {styles} from './styles';
  import {colors} from '../../assets/data/colors';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Feather from 'react-native-vector-icons/Feather';
  import CustomTextInput from '../../components/textInput/CustomTextInput';
  import CustomButton from '../../components/customButton/CustomButton';
  import ImagePicker from 'react-native-image-crop-picker';
  import auth from '@react-native-firebase/auth';
  import storage from '@react-native-firebase/storage';
  import firestore from '@react-native-firebase/firestore';
  import {validateField} from '../../assets/data/InputValidation';
import CustomAlert from '../../components/modals/CustomAlert';
import { fontsInter } from '../../assets/fonts/Fonts';
import { svgobj } from '../../assets/svg/svg1';
import { SVGObj } from '../../components/svgs/SVG';
//   import PhoneNumberInput from '../../components/phInput/PhoneInput';
//   import {useSelector} from 'react-redux';
  const ProfileSetup = ({navigation, route}: any) => {
    // const p = useSelector((state: any) => state.profile);
  
    const profilex: any = null;
    // console.log(profilex);
  
    const title = route.params?.title ?? null;
    // console.log('route data: ', title);
  
    const [isLoading, setISLoading] = useState(false);
    // const [name, setName] = useState('');
    // const [nickName, setNickName] = useState('');
    const [profilePic, setProfilePic] = useState(profilex?.profilePic ?? '');
    // console.log(profilePic);
    
    const [formData, setFormData] = useState({
      name: profilex?.name ?? '',
      userName:  profilex?.userName ?? '',
      nickName: '',
      phoneNumber:  profilex?.phoneNumber ?? '',
    });
    const [formErrors, setFormErrors] = useState({
      nameError: validateField('name', profilex?.name) ?? null,
      nickNameError: null,
      userNameError: validateField('userName', profilex?.userName) ?? null,
      phoneNumberError: validateField('phoneNumber', profilex?.phoneNumber) ?? null,
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
    const email = auth().currentUser?.email;
    const userId = auth().currentUser?.uid;
    // console.log('The Current user email is :- ', auth().currentUser?.email);
  
    // const [countryCode, setCountryCode] = useState('+93');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    // console.log('fetched code: ', countryCode + formData.phoneNumber);
    // const handleCountrySelect = (code: string) => {
    //   setCountryCode(code); // Store selected country code
    // };
    const [alertData, setAlertData] = useState({
      title: '',
      message: '',
      onPress: () => {},
    });
  
    const handleOK = () => {
      setIsAlertVisible(false);
      // navigation.goBack();
    };
    const pickImageFromGallery = async () => {
      try {
        const image = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
        });
        console.log('Image Path:', image.path);
        setProfilePic(image.path);
        return;
      } catch (error) {
        console.log('Error picking/uploading image:', error);
      }
    };
    // const uploadProfilePic = async () => {
    //   try {
    //     const imageName = `profile_pic_${email}`;
    //     const reference = storage().ref(`UserMedia/ProfilePic/${imageName}`);
    //     await reference.putFile(profilePic);
    //     console.log('Image uploaded successfully:', imageName);
    //     const downloadURL = await reference.getDownloadURL();
    //     console.log('Download URL:', downloadURL);
  
    //     return downloadURL;
    //   } catch (error) {
    //     console.log('Error getting profile picture:', error);
    //     return null;
    //   }
    // };
    // const uploadOtherInformation = async () => {
    //   try {
    //     setISLoading(true);
    //     if (!userId) {
    //       throw new Error('User not authenticated');
    //     }
    //     let profile: any='' ;
    //     if(profilePic.startsWith("https")){
    //       profile = profilePic;
    //     } else{
    //       profile = await uploadProfilePic();
    //     }
  
    //     setISLoading(false);
  
    //     navigation.navigate('SelectCategory', {
    //       title: title,
    //       name: formData.name,
    //       userName: formData.userName,
    //       phoneNumber: countryCode + formData.phoneNumber,
    //       email: auth().currentUser?.email,
    //       profilePic: profile,
    //     });
  
    //     return;
    //     await firestore()
    //       .collection('users')
    //       .doc(userId)
    //       .set(
    //         {
    //           name: formData.name,
    //           userName: formData.userName,
    //           phoneNumber: countryCode + formData.phoneNumber,
    //           email: auth().currentUser?.email,
    //           profilePic: profile,
    //         },
    //         {merge: true},
    //       )
    //       .then(() => {
    //         console.log('current user: ', auth().currentUser?.email);
    //         auth().signOut();
    //         setIsAlertVisible(true);
    //         setAlertData({
    //           title: 'Success',
    //           message: `Verification email sent to ${email} Please check your inbox.`,
    //           onPress: () => {
    //             navigation.navigate('SelectCategory');
    //             // navigation.reset({
    //             //   index: 1,
    //             //   routes: [
    //             //     {name: 'SocialAuth'}, // First screen you want to keep
    //             //     {name: 'LoginScreen'}, // The new screen you want to navigate to
    //             //   ],
    //             // });
    //             setIsAlertVisible(false);
    //           },
    //         });
    //       });
    //     console.log('User name uploaded successfully');
    //   } catch (error) {
    //     console.log('Error uploading user data:', error);
    //   } finally {
    //     setISLoading(false);
    //   }
    // };
    // function alert(title: string, message: string) {
    //   setIsAlertVisible(true);
    //   setAlertData({
    //     title: title,
    //     message: message,
    //     onPress: handleOK,
    //   });
    // }
    // console.log('Form Errors: ', formErrors);
  
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.container}>
          <View style={{paddingHorizontal: 20, flex: 1, paddingVertical: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons size={25} name={'arrow-back'} color={'#000'} />
              </TouchableOpacity>
              <Text style={styles.title}>
                {title === 'loggedIn' ? 'Edit Profile' : 'Fill Your Profile'}
              </Text>
              <View style={{width: 25}} />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.innerContainer}>
                <View
                  style={[
                    styles.profileIconBg,
                    {
                      paddingTop: !(profilePic || profilex.profilePic)
                        ? 10
                        : null,
                    },
                  ]}>
                  {profilePic || profilex?.profilePic ? (
                    <Image
                      style={{height: 120, width: 120, borderRadius: 70}}
                      source={{
                        uri: profilePic ? profilePic : profilex?.profilePic,
                      }}
                    />
                  ) : (
                    <Ionicons name={'person'} size={130} color={'#F2F4F6'} />
                  )}
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: 7,
                      position: 'absolute',
                      bottom: 10,
                      right: -3,
                    }}
                    onPress={pickImageFromGallery}>
                    <SVGObj icon={svgobj.addImage} />
                  </TouchableOpacity>
                </View>
                {/* {!profilePic && (
                  <Text
                    style={[styles.error, {alignSelf: 'center', marginTop: 10}]}>
                    Please select profile picture
                  </Text>
                )} */}
  
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: fontsInter.f300,
                    color: colors.uploadText,
                  }}>
                  Upload Image
                </Text>
                <View
                  style={{
                    height: 85,
                    width: '100%',
                    marginTop: 15,
                  }}>
                  <CustomTextInput
                    label={'Name'}
                    placeholder={profilex.name ? profilex?.name : 'Full Name'}
                    backgroundColor
                    bg={colors.iconBackground}
                    value={formData.name}
                    onChangeText={(text: any) => handleInputChange('name', text)}
                  />
                </View>
  
                {formErrors.nameError !== 'true' && formErrors.nameError && (
                  <Text style={styles.error}>{formErrors.nameError}</Text>
                )}
                <View
                  style={{
                    height: 85,
                    width: '100%',
                    marginTop: 15,
                  }}>
                  <CustomTextInput
                    label={'Username'}
                    placeholder={
                      profilex.userName ? profilex?.userName : 'Username'
                    }
                    backgroundColor
                    // editable={false}
                    bg={colors.iconBackground}
                    value={formData.userName}
                    onChangeText={(text: any) =>
                      handleInputChange('userName', text)
                    }
                  />
                </View>
  
                {formErrors.userNameError !== 'true' &&
                  formErrors.userNameError && (
                    <Text style={styles.error}>{formErrors.userNameError}</Text>
                  )}
                <View
                  style={{
                    height: 85,
                    width: '100%',
                    marginTop: 15,
                  }}>
                  <CustomTextInput
                    svg={svgobj.email}
                    label={'Email'}
                    editable={false}
                    placeholder={email}
                    backgroundColor
                    bg={colors.iconBackground}
                  />
                </View>
                <View
                //   style={{
                //     height: 85,
                //     width: '100%',
                //     marginTop: 15,
                //     marginBottom: 2,
                //   }}
                  >
                  {/* <PhoneNumberInput
                    label={'Phone Number'
                    }
                    value={formData.phoneNumber}
                    onChangeText={(text: any) =>
                      handleInputChange('phoneNumber', text)
                    }
                    code={countryCode}
                    onSelectCountry={handleCountrySelect}
                  /> */}
                  {/* <CustomTextInput
                    label={'Phone Number'}
                    keyboardType={'number-pad'}
                    placeholder={'Phone Number'}
                    countryPicker={true}
                    backgroundColor
                    bg={colors.iconBackground}
                    value={formData.phoneNumber}
                    onChangeText={(text: any) =>
                      handleInputChange('phoneNumber', text)
                    }
                  /> */}
                </View>
  
                {formErrors.phoneNumberError !== 'true' &&
                  formErrors.phoneNumberError && (
                    <Text style={styles.error}>
                      {formErrors.phoneNumberError}
                    </Text>
                  )}
                <View style={{flex: 1, height: 20}} />
                <View style={styles.buttonsView}>
                  <CustomButton
                    isLoading={isLoading}
                    // disabled={
                    //   !(formErrors.nameError === 'true') ||
                    //   !(formErrors.userNameError === 'true') ||
                    //   !(formErrors.phoneNumberError === 'true') ||
                    //   !(profilePic || profilex?.profilePic)
                    //     ? true
                    //     : false
                    // }
                    title={'Next'}
                    // onPress={async () => {
                    //   try {
                    //     await uploadOtherInformation();
                    //     // navigation.navigate()
                    //     // navigation.navigate('SelectCategory', {title: title});
                    //   } catch (error) {
                    //     console.log('Error uploading user data');
                    //   }
                    // }}
                    btnColor={
                    //   !(formErrors.nameError === 'true') ||
                    //   !(formErrors.userNameError === 'true') ||
                    //   !(formErrors.phoneNumberError === 'true') ||
                    //   !(profilePic || profilex?.profilePic)
                    //     ? colors.gray
                    //     : 
                        colors.black
                    }
                    width={'100%'}
                    btnTextColor={'#fff'}
                    // borderRadius={25}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
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
  
  export default ProfileSetup;
  