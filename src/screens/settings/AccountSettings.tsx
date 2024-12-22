import {
  View,
  Text,
  SafeAreaView,
  ViewBase,
  TouchableOpacity,
  ScrollView,
  Image,
  Aert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
//   import {styles} from './styles';
//   import {colors} from '../../assets/data/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/data/colors';
import { styles } from './styles';
import Header2 from '../../components/header2/Header2';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
//   import Feather from 'react-native-vector-icons/Feather';
//   import CustomTextInput from '../../components/textInput/CustomTextInput';
//   import CustomButton from '../../components/customButton/CustomButton';
//   import ImagePicker from 'react-native-image-crop-picker';
//   import auth from '@react-native-firebase/auth';
//   import storage from '@react-native-firebase/storage';
//   import firestore from '@react-native-firebase/firestore';
//   import {validateField} from '../../assets/data/InputValidation';
//   import CustomAlert from '../../components/customAlert/CustomAlert';
//   import {fonts} from '../../assets/data/fonts';
//   import {svgobj} from '../../assets/data/svg1';
//   import {SVGObj} from '../../components/svg/SVG';
//   import PhoneNumberInput from '../../components/phInput/PhoneInput';
const AccountSettings = ({navigation, route}: any) => {
  // const title = route.params?.title ?? null;
  // console.log("route data: ", title);

  // const [isLoading, setISLoading] = useState(false);
  // // const [name, setName] = useState('');
  // // const [nickName, setNickName] = useState('');
  const [profilePic, setProfilePic] = useState(null
  );
  // const [formData, setFormData] = useState({
  //   name: '',
  //   userName: '',
  //   nickName: '',
  //   phoneNumber: '',
  // });
  // const [formErrors, setFormErrors] = useState({
  //   nameError: null,
  //   nickNameError: null,
  //   userNameError: null,
  //   phoneNumberError: null,
  // });
  // const handleInputChange = (fieldName: any, value: any) => {
  //   setFormData({
  //     ...formData,
  //     [fieldName]: value,
  //   });

  //   const error = validateField(fieldName, value);
  //   setFormErrors({
  //     ...formErrors,
  //     [`${fieldName}Error`]: error,
  //   });
  // };
  // const email = auth().currentUser?.email;
  // const userId = auth().currentUser?.uid;
  // console.log('The Current user email is :- ', auth().currentUser?.email);

  // const [countryCode, setCountryCode] = useState('');
  // const [isAlertVisible, setIsAlertVisible] = useState(false);
  // console.log('fetched code: ', countryCode + formData.phoneNumber);
  // const handleCountrySelect = (code: string) => {
  //   setCountryCode(code); // Store selected country code
  // };
  // const [alertData, setAlertData] = useState({
  //   title: '',
  //   message: '',
  //   onPress: () => {},
  // });

  // const handleOK = () => {
  //   setIsAlertVisible(false);
  //   // navigation.goBack();
  // };
  // const pickImageFromGallery = async () => {
  //   try {
  //     const image = await ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //       cropperCircleOverlay: true,
  //     });
  //     console.log('Image Path:', image.path);
  //     setProfilePic(image.path);
  //     return;
  //   } catch (error) {
  //     console.log('Error picking/uploading image:', error);
  //   }
  // };
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
  //     const profile = await uploadProfilePic();
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
        
      <Header2 newBackIcon title="Edit Profile" paddingHorizontal={20} />
        <View style={{paddingHorizontal: 20, flex: 1, paddingVertical: 20}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.innerContainer}>
              <View
                style={[
                  styles.profileIconBg,
                  {paddingTop: profilePic ? 10 : null},
                ]}>
                {profilePic===null ? (
                  <Image
                    style={{height: 120, width: 120, borderRadius: 70}}
                    source={require('../../assets/images/profile.png')}
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
                  // onPress={pickImageFromGallery}
                >
                  {/* <SVGObj icon={svgobj.addImage} /> */}
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontSize: 18,
                  // fontFamily: fontsInter.f300,
                  color: colors.black,
                }}>
                Upload Image
              </Text>
              <View
                style={{
                  // height: 85,
                  width: '100%',
                  marginTop: 15,
                }}>
                <CustomTextInput
                  label={'Name'}
                  placeholder={'Name'}
                  backgroundColor
                  bg={colors.iconBackground}
                  // value={formData.name}
                  // onChangeText={(text: any) => handleInputChange('name', text)}
                />
              </View>
              <View
                style={{
                  // height: 85,
                  width: '100%',
                  marginTop: 15,
                }}>
                <CustomTextInput
                  // svg={svgobj.email}
                  label={'Email'}
                  editable={false}
                  placeholder={'xyz@gmail.com'}
                  backgroundColor
                  bg={colors.iconBackground}
                />
              </View>
              <View
                style={{
                  // height: 85,
                  width: '100%',
                  marginTop: 15,
                }}>
                <CustomTextInput
                  // svg={svgobj.password}
                  label={'Password'}
                  editable={false}
                  placeholder={'Password'}
                  backgroundColor
                  bg={colors.iconBackground}
                />
              </View>
              <View
                style={{
                  // height: 85,
                  width: '100%',
                  marginVertical: 15,
                }}>
                <CustomTextInput
                  // svg={svgobj.password}
                  label={'Confirm Password'}
                  editable={false}
                  placeholder={'Confirm Password'}
                  backgroundColor
                  bg={colors.iconBackground}
                />
              </View>
              
              <CustomButton
                btnColor={colors.black}
                title={'Save'}
                width={'100%'}
                btnTextColor={'#fff'}
              />
              {/* </View> */}
            </View>
          </ScrollView>
        </View>
        {/* <CustomAlert
            message={alertData.message}
            title={alertData.title}
            visible={isAlertVisible}
            onPress={alertData.onPress}
            onRequestClose={handleOK}
          /> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AccountSettings;
