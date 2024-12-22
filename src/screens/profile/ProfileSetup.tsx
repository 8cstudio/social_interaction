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
import {fontsInter} from '../../assets/fonts/Fonts';
import {svgobj} from '../../assets/svg/svg1';
import {SVGObj} from '../../components/svgs/SVG';
import {useSelector} from 'react-redux';
const ProfileSetup = ({navigation, route}: any) => {
  const p = useSelector((state: any) => state.profile);
  const profilex = p.data;
  console.log('fffffffffff:', profilex);

  const title = route?.params?.title ?? null;
  // console.log('route data: ', title);

  const [isLoading, setISLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(profilex?.profilePic ?? '');
  // console.log(profilePic);

  const [formData, setFormData] = useState({
    name: profilex?.name ?? '',
    userName: profilex?.userName ?? '',
    phoneNumber: profilex?.phoneNumber ?? '',
    description: profilex?.description ?? '',
    location: profilex?.location ?? '',
  });
  const [formErrors, setFormErrors] = useState({
    nameError: validateField('name', profilex?.name) ?? null,
    locationError: validateField('location', profilex?.location) ?? null,
    descriptionError: validateField('description', profilex?.description) ?? null,
    userNameError: validateField('userName', profilex?.userName) ?? null,
    phoneNumberError:
      validateField('phoneNumber', profilex?.phoneNumber) ?? null,
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
  const uploadProfilePic = async () => {
    try {
      const imageName = `profile_pic_${email}`;
      const reference = storage().ref(`UserMedia/ProfilePic/${imageName}`);
      await reference.putFile(profilePic);
      console.log('Image uploaded successfully:', imageName);
      const downloadURL = await reference.getDownloadURL();
      console.log('Download URL:', downloadURL);

      return downloadURL;
    } catch (error) {
      console.log('Error getting profile picture:', error);
      return null;
    }
  };
  const uploadOtherInformation = async () => {
    try {
      setISLoading(true);
      if (!userId) {
        throw new Error('User not authenticated');
      }
      let profile: any = '';
      if (profilePic.startsWith('https')) {
        profile = profilePic;
      } else {
        profile = await uploadProfilePic();
      }


      // navigation.navigate('SelectCategory', {
      //   title: title,
      //   name: formData.name,
      //   userName: formData.userName,
      //   phoneNumber: formData.phoneNumber,
      //   email: auth().currentUser?.email,
      //   profilePic: profile,
      // });
      await firestore()
        .collection('users')
        .doc(userId)
        .set(
          {
            name: formData.name,
            userName: formData.userName,
            phoneNumber: formData.phoneNumber,
            email: auth().currentUser?.email,
            profilePic: profile,
            description: formData.description,
            location: formData.location,
          },
          {merge: true},
        )
        .then(() => {
          console.log('current user: ', auth().currentUser?.email);
          // auth().signOut();
          setIsAlertVisible(true);
          setISLoading(false);
          setAlertData({
            title: 'Success',
            message: `Profile data saved successfully`,
            onPress: () => {
              navigation.goBack();
              // navigation.navigate('SelectCategory');
              // navigation.reset({
              //   index: 1,
              //   routes: [
              //     {name: 'SocialAuth'}, // First screen you want to keep
              //     {name: 'LoginScreen'}, // The new screen you want to navigate to
              //   ],
              // });
              // setIsAlertVisible(false);

            },
          });
        });
      console.log('User name uploaded successfully');
    } catch (error) {
      console.log('Error uploading user data:', error);
    } finally {
      setISLoading(false);
    }
  };
  function alert(title: string, message: string) {
    setIsAlertVisible(true);
    setAlertData({
      title: title,
      message: message,
      onPress: handleOK,
    });
  }
  console.log('Form Errors: ', formErrors);

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
                  label={'Phone Number'}
                  // editable={false}
                  placeholder={'Phone Number'}
                  value={formData.phoneNumber}
                  keyboardType={'number-pad'}
                  onChangeText={(text: any) =>
                    handleInputChange('phoneNumber', text)
                  }
                  backgroundColor
                  bg={colors.iconBackground}
                />
              </View>

              {formErrors.phoneNumberError !== 'true' &&
                formErrors.phoneNumberError && (
                  <Text style={styles.error}>
                    {formErrors.phoneNumberError}
                  </Text>
                )}
              <View
                style={{
                  height: 85,
                  width: '100%',
                  marginTop: 15,
                }}>
                <CustomTextInput
                  svg={svgobj.email}
                  label={'Description'}
                  // editable={false}
                  placeholder={'Edit Description'}
                  value={formData.description}
                  // keyboardType={'number-pad'}
                  onChangeText={(text: any) =>
                    handleInputChange('description', text)
                  }
                  backgroundColor
                  
                  bg={colors.iconBackground}
                />
              </View>

              {formErrors.descriptionError !== 'true' &&
                formErrors.descriptionError && (
                  <Text style={styles.error}>
                    {formErrors.descriptionError}
                  </Text>
                )}
              <View
                style={{
                  height: 85,
                  width: '100%',
                  marginTop: 15,
                }}>
                <CustomTextInput
                  svg={svgobj.email}
                  label={'Location'}
                  // editable={false}
                  placeholder={'Location'}
                  value={formData.location}
                  // keyboardType={'number-pad'}
                  onChangeText={(text: any) =>
                    handleInputChange('location', text)
                  }
                  backgroundColor
                  
                  bg={colors.iconBackground}
                />
              </View>

              {formErrors.locationError !== 'true' &&
                formErrors.locationError && (
                  <Text style={styles.error}>
                    {formErrors.locationError}
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
                  title={'Save'}
                  onPress={async () => {
                    try {
                      await uploadOtherInformation();
                      // navigation.navigate()
                      // navigation.navigate('SelectCategory', {title: title});
                    } catch (error) {
                      console.log('Error uploading user data');
                    }
                  }}
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
