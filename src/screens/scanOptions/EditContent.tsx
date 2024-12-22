import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header2 from '../../components/header2/Header2';
import {colors} from '../../assets/data/colors';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import Icon from '../../components/customIcon/CustomIcon';
// import SettingsOption from '../../components/settingsOption';
import CustomButton from '../../components/customButton/CustomButton';
import DocumentPicker, {types} from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { feedsData, uploadMediaToFirestore } from '../../components/functions/GlobalFunctions';
import Percentage from '../../components/modals/Percentage';
import { fontsInter } from '../../assets/fonts/Fonts';
import { useSelector } from 'react-redux';
// import {useSelector} from 'react-redux';

const category = [{label: 'Fitness'}, {label: 'Love'}, {label: 'Sports'}];
const EditContent = ({navigation, route}: any) => {
  const uid = auth().currentUser?.uid
  const data = route?.params ?? null;
  const scan = route?.params.scan ?? null;
  const p = useSelector((state: any) => state?.profile);
  const profile = p.data;
  console.log(profile);
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [pickerVisibleCat, setPickerVisibleCat] = useState(false);
  const [pickedMedia, setPickedMedia] = useState(data?.thumnail ?? '');
  const [title, setTitle] = useState('');
  const [videoTitle, setVideoTitle] = useState("")
  const [category, setCategory] = useState('');
  const [check, setCheck] = useState(false);
  const [progress, setProgress] = useState(0);
  const [percentageModal, setPercentageModal] = useState(false);
  const handleCategorySelect = (option: any) => {
    setSelectedCat(option);
  };

  async function sendToFeed(uri: any, thmnail: any) {
    try {
      const data1 = feedsData(
        thmnail,
        uri,
        videoTitle,
        profile
      );
      firestore()
        .collection('feeds')
        .doc(auth().currentUser?.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            // Document exists, update the array
            firestore()
              .collection('feeds')
              .doc(auth().currentUser?.uid)
              .set(
                {
                  feeds: firestore.FieldValue.arrayUnion(data1),
                },
                {merge: true},
              )
              .then(() => {
                // navigation.reset({
                //   index: 1,
                //   routes: [
                //     {name: 'Drawer2'}, // First screen you want to keep
                //     {name: 'Profile', params: {myProfile: true}}, // The new screen you want to navigate to
                //   ],
                // });
                
                setPercentageModal(false);
                setProgress(0);
                navigation.replace("Profile")
                console.log('Document updated successfully!');
              })
              .catch(error => {
                console.error('Error updating document: ', error);
              });
          } else {
            // Document does not exist, create it with the array
            firestore()
              .collection('feeds')
              .doc(auth().currentUser?.uid)
              .set({
                feeds: [data1],
              })
              .then(() => {
                // navigation.reset({
                //   index: 1,
                //   routes: [
                //     {name: 'Drawer2'}, // First screen you want to keep
                //     {name: 'Profile', params: {myProfile: true}}, // The new screen you want to navigate to
                //   ],
                // });
                
                setPercentageModal(false);
                setProgress(0);
                navigation.replace("Profile")
                console.log('Document created successfully!');
              })
              .catch(error => {
                console.error('Error creating document: ', error);
              });
          }
        })
        .catch(error => {
          console.error('Error getting document:', error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const handleMediaPick = async () => {
    try {
      const result: any = await DocumentPicker.pick({
        copyTo: 'documentDirectory',
        type: [types.images],
      });
      console.log('Media: ', result);
      if (result.length > 0) {
        setPickedMedia(result[0].fileCopyUri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn('User cancelled the picker');
      } else {
        console.error('Error picking media: ', err);
      }
    }
  };
  const handleSave = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('Artivive')
        .doc(uid)
        .get();
      if (documentSnapshot.exists) {
        const docData = documentSnapshot.data();
        const mediaArray = docData?.media || [];
        mediaArray[data.index] = {
          ...mediaArray[data.index],
          imageUri: pickedMedia
            ? pickedMedia
            : data.uri?.imageUri
            ? data.uri?.imageUri
            : '',
          category: selectedCat
            ? selectedCat
            : data.uri?.category
            ? data.uri?.category
            : '',
          title: title ? title : data.uri?.title ? data.uri?.title : 'No Title',
        };
        await firestore()
          .collection('Artivive')
          .doc(uid)
          .set({media: mediaArray}, {merge: true})
          .then(() => {
            if (check) {
            }
          })
          .then(() => {
            if (check) {
              sendToFeed();
            }
          });

        console.log('Title updated successfully!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating media title: ', error);
    }
  };
  const handleSelect = (value: any, label: any) => {
    // setLabel(label);
    setPickerVisibleCat(false);
    setCategory(value);
  };
  async function handleScanSave() {
 
    try {
      setPercentageModal(true);
      const result = await uploadMediaToFirestore(
        data?.thumnail,
        data?.file,
        setProgress,
      );
      await sendToFeed(result?.uri, result?.thumbnail)
      setIsLoading(false);
      Alert.alert('Succes', 'Content Uploaded Successfully');
    } catch (error) {
      Alert.alert('Error', 'Error Uploading Content:- ' + error);
      setPercentageModal(false);
      setProgress(0);
      setIsLoading(false);
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroungColor,
      }}>
      <View style={{flex: 1, paddingHorizontal: 28}}>
        <Header2 title="Customization" newBackIcon />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 2}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: fontsInter.f500,
                textAlign: 'center',
                width: '80%',
                alignSelf: 'center',
                color: colors.lightGrayText,
              }}>
              Chose your Fav Content to upload to Social App
            </Text>
            {data?.uri?.imageUri !== '' ? (
              <ImageBackground
                style={{
                  height: 110,
                  //   backgroundColor: 'red',
                  //   width: 150,
                  borderRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginVertical: 20,
                }}
                resizeMode="cover"
                source={
                  data?.type === 'image'
                    ? {uri: data?.file}
                    : pickedMedia !== ''
                    ? {uri: pickedMedia}
                    : data?.uri?.imageUri
                    ? {uri: data.uri?.imageUri}
                    : data?.thumnail
                    ? {uri: data?.thumnail}
                    : require('../../assets/images/ad.png')
                }>
                {data?.type !== 'image' && (
                  <TouchableOpacity
                    onPress={handleMediaPick}
                    style={{
                      //   position: 'absolute',
                      bottom: 5,
                      //   justifyContent:"center",
                      //   alignItems:'center',
                      right: 5,
                      //   backgroundColor: colors.white,
                      padding: 5,
                      borderRadius: 4,
                    }}>
                    <Icon
                      name="edit"
                      iconFamily="feather"
                      size={20}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            ) : (
              <View style={{height: 40}} />
            )}

            <CustomTextInput
              label="Add Tittle"
              placeholder={'Add Title'}
              backgroundColor={colors.white}
              value={videoTitle}
              onChangeText={setVideoTitle}
            />

            <CustomButton
              onPress={() => {
                handleScanSave() 
              }}
              disabled = {videoTitle === ''}
              marginTop={25}
              title={'Save'}
              btnColor={videoTitle === ''? colors.lightGrey:colors.black}
              width={'100%'}
              btnTextColor={'#fff'}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </View>
      <Percentage
        title={'Uploading'}
        message={`Upload Progress ${progress}%`}
        progress={progress}
        visible={percentageModal}
        onPress={() => setPercentageModal(false)}
        size={data?.size}
        type={data?.type}
      />
    </SafeAreaView>
  );
};

export default EditContent;
