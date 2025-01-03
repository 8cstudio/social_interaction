import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
  PermissionsAndroid,
  Animated,
  ImageBackground,
} from 'react-native';
import Icon from '../../components/customIcon/CustomIcon';
import {colors} from '../../assets/data/colors';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {SVG, SvgObjPath1, SvgObjPath2} from '../../components/svg/SVG';
import {svg} from '../../assets/data/svg';
import DocumentPicker, {types} from 'react-native-document-picker';
import PDF from 'react-native-pdf';
import Video from 'react-native-video';
import Media from './Media';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createThumbnail} from 'react-native-create-thumbnail';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {checkPermission, onStopRecord} from './functions';
import PlayModal from '../../components/modals/PlayModal';
import RNFS from 'react-native-blob-util';
import {RNCamera} from 'react-native-camera';
import {elevation, fontSize, formatTime } from '../../assets/data/TypeScript';
import fs from 'react-native-fs';
import {ListItem} from '../../../src1/App1';
import {width} from '../../../src1/theme';
import moment from 'moment';
import { svgobj1, svgobj2 } from '../../assets/data/svgobj';
import { useSelector } from 'react-redux';

const ChatScreen = ({navigation, route}: any) => {
  const uid = auth().currentUser?.uid
  
  const insects = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const [shouldScroll, setShouldScroll] = useState<boolean>(true);
  const [currentPlaying, setCurrentPlaying] = useState<string>('');
  const [camera, setCamera] = useState(false);
  const [recordedFile, setRecordedFile] = useState('');
  const [play, setPlay]: any = useState(null);
  const [upload, setUpload] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  // console.log(profile);
  
  const [media, setMedia]: any = useState(null);
  const [type, setType]: any = useState(null);
  const [pickedName, setPickedName]: any = useState('');
  const [thumbnail, setThumbnail]: any = useState(null);
  const {user} = route.params;
  const [paused, setPaused] = useState(false);
  const [messages, setMessages]: any = useState([]);
  const [text, setText] = useState('');
  const flatListRef: any = useRef(null);
  const currentUser = auth().currentUser;
  const opacity = useRef(new Animated.Value(1)).current;
  const isRecordings: any = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const cameraRef: any = useRef(null);
  const isSendingMessage = useRef(false);
  // console.log("1: ",modalVisible);
  // console.log("2: ",modal2Visible);
  
  const [playModal, setPlayModal] = useState({
    visible: false,
    uri: '',
    onPress: () => {},
  });
  const handleEnd = () => {
    setPaused(true);
    setModal2Visible(false);
  };
  const handlePressPlay = () => {
    setPaused(false);
  };
  //Get all Messages of current users with other selected users and update status of last messages
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(currentUser?.uid)
      .collection('chat')
      .doc(user.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        if (!isSendingMessage.current) {
          const messagesArray = querySnapshot.docs.map(documentSnapshot => ({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          }));
  
          // Update read status for unread messages
          const batch = firestore().batch();
          querySnapshot.docs.forEach(documentSnapshot => {
            if (!documentSnapshot.data().read) {
              const docRef = documentSnapshot.ref;
              batch.update(docRef, { read: true });
            }
          });
          batch
            .commit()
            .then(() => {
              setMessages(messagesArray);
            })
            .catch(error => {
              console.error('Error updating read status: ', error);
            });
        }
        isSendingMessage.current = false;
      });
  
    return () => unsubscribe();
  }, []);
  //Pick Media
  const handleMediaPick = async (t: any) => {
    try {
      const result = await DocumentPicker.pick({
        copyTo: 'documentDirectory',
        type: [types.images, types.video, types.pdf],
      });
      if (result.length > 0) {
        setMedia(result[0].fileCopyUri);
        setPickedName(result[0].name);
        if (result[0].type === 'application/pdf') {
          try {
            setThumbnail(null);
            const f: any = result[0].fileCopyUri;
            const thumb = await PdfThumbnail.generate(f, 0, 95);

            setType('pdf');
            setThumbnail(thumb.uri);
          } catch (error) {
            console.error('Error generating PDF thumbnail: ', error);
            setThumbnail(null);
            setType('pdf');
          }
          // setType('pdf');
          // setThumbnail(null);
        } else if (result[0].type === 'video/mp4') {
          setThumbnail(null);
          const f: any = result[0].fileCopyUri;
          const thumbnail = await createThumbnail({
            url: f,
            timeStamp: 1000,
          });
          setThumbnail(thumbnail.path);
          setType('video');
        } else if (
          result[0].type === 'image/png' ||
          result[0].type === 'image/jpeg' ||
          result[0].type === 'image/jpg'
        ) {
          setThumbnail(null);
          setType('image');
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn('User cancelled the picker');
      } else {
        console.error('Error picking media: ', err);
      }
    } finally {
      setUpload(false);
    }
  };
  //Upload Media To firebase storage
  const uploadMedia = async (mediaPath: any, time: any) => {
    setMedia(null);
    const storageRef = storage().ref(`chat_media/${time}`);
    const storageRefThumbnail = storage().ref(`chat_all_Media/${time}`);
    let uri = '';
    if (thumbnail) {
      await storageRefThumbnail.putFile(thumbnail);
      const downloadThumbnail = await storageRefThumbnail.getDownloadURL();
      uri = downloadThumbnail;
    }
    await storageRef.putFile(mediaPath);
    const downloadUrl = await storageRef.getDownloadURL();
    // generateThumbnail(downloadUrl)
    return {uri: downloadUrl, path: mediaPath, thumbnail: uri};
  };
  //Sent Message to user
  const sendMessage = async () => {
    isSendingMessage.current = true;
    let time = new Date().getTime();
    if (isRecordings.current) {
      console.log("Recordings");
      
      isRecordings.current = false;
      const file = await onStopRecord(setIsRecording, setRecordedFile);
      console.log(file);
      
      const messageData1 = {
        text,
        // local: {uri: mediaUrl.path, type: type},
        media: {
          uri: file,
          type: 'audio',
          thumbnail: '',
        },
        createdAt: firestore.FieldValue.serverTimestamp(),
        from: currentUser?.uid,
        to: user.id,
        read: false,
      };

      // setMessages((prevMessages: any) => [messageData1, ...prevMessages]);
      const batch = firestore().batch();
      const mediaUrl: any = await uploadMedia(file, time);
      console.log(mediaUrl);
      

      const messageData = {
        text,
        // local: {uri: mediaUrl.path, type: type},
        media: {
          uri: mediaUrl.uri,
          type: 'audio',
          thumbnail: '',
        },
        createdAt: firestore.FieldValue.serverTimestamp(),
        from: currentUser?.uid,
        to: user.id,
        read: false,
      };
      const chatDocRef = firestore().collection('chats').doc(currentUser?.uid);
      const userChatDocRef = chatDocRef.collection('chat').doc(user.id);
      const newMessageDocRef = userChatDocRef.collection('messages').doc();
      batch.set(chatDocRef, {a: 'aa'});
      batch.set(userChatDocRef, {a: 'aa'});
      batch.set(newMessageDocRef, messageData);
      const chatDocRef1 = firestore().collection('chats').doc(user.id);
      const userChatDocRef1 = chatDocRef1
        .collection('chat')
        .doc(currentUser?.uid);
      const newMessageDocRef1 = userChatDocRef1.collection('messages').doc(); // Generate a new document reference with an ID
      // Set data in the batch
      batch.set(chatDocRef1, {a: 'aa'});
      batch.set(userChatDocRef1, {a: 'aa'});
      batch.set(newMessageDocRef1, messageData);
      await batch.commit();
      return;
    }
    if (text.length > 0 || media) {
      let mediaUrl: any = {uri: '', path: ''};
      if (media) {
        const messageData = {
          text: text,
          local: {
            uri: media,
            type: type,
            thumbnail: thumbnail ? thumbnail : null,
          },
          media: {
            uri: '',
            type: null,
            thumbnail: thumbnail != null && thumbnail,
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
          from: currentUser?.uid,
          to: user.id,
          read: false,
        };
        setMessages((prevMessages: any) => [messageData, ...prevMessages]);
        mediaUrl = await uploadMedia(media, time);
      }
      const batch = firestore().batch();
      const messageData = {
        text,
        // local: {uri: mediaUrl.path, type: type},
        media: {
          uri: mediaUrl.uri,
          type: type,
          thumbnail: thumbnail != null && mediaUrl.thumbnail,
        },
        createdAt: firestore.Timestamp.fromDate(new Date()),
        from: currentUser?.uid,
        to: user.id,
        read: false,
      };
      const messageData1 = {
        text,
        media: {
          uri: mediaUrl.uri,
          type: type,
          thumbnail: thumbnail != null && mediaUrl.thumbnail,
        },
        // media: mediaUrl.uri,
        createdAt: firestore.FieldValue.serverTimestamp(),
        from: currentUser?.uid,
        to: user.id,
        read: false,
      };
      if (mediaUrl.path === '') {
        setMessages((prevMessages: any) => [messageData, ...prevMessages]);
      }
      const timestamp = firestore.Timestamp.fromDate(new Date());
      console.log("mmmmmmmmmmm", messageData);
      
      const chatDocRef = firestore().collection('chats').doc(currentUser?.uid);
      const userChatDocRef = chatDocRef.collection('chat').doc(user.id);
      const newMessageDocRef = userChatDocRef.collection('messages').doc();
      batch.set(chatDocRef, {a: 'aa'});
      batch.set(userChatDocRef, {a: 'aa'});
      batch.set(newMessageDocRef, messageData1);
      const chatDocRef1 = firestore().collection('chats').doc(user.id);
      const userChatDocRef1 = chatDocRef1
        .collection('chat')
        .doc(currentUser?.uid);
      const newMessageDocRef1 = userChatDocRef1.collection('messages').doc(); // Generate a new document reference with an ID
      // Set data in the batch
      batch.set(chatDocRef1, {a: 'aa'});
      batch.set(userChatDocRef1, {a: 'aa'});
      batch.set(newMessageDocRef1, messageData1);
      await batch.commit();

      setText('');
      setMedia(null);
      setType(null);
      setThumbnail(null);
    }
  };
  //Open Pdf or other documents in their respected app
  async function open(url: any) {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `This URL of  can't be opened: `);
      }
    } catch (error: any) {

      Alert.alert('Error', 'Failed to open URL: ' + error.message);
    }
  }
  const takePicture = async () => {
    if (cameraRef?.current) {
      const options = {quality: 0.5};
      const data = await cameraRef?.current.takePictureAsync(options);
      setType('image');
      setMedia(data.uri);
      setThumbnail(data.uri);
      setCamera(false);
    } else {
      Alert.alert('Error Camera', 'Something went wrong while scanning');
    }
  };
  const renderMessage = ({item, index}: any) => {
    
    const isCurrentUser = item.from === currentUser?.uid;
    return (
      <View
        key={index.toString()}
        style={
          isCurrentUser
            ? [
                styles.msgContainer,
                {alignSelf: 'flex-end', justifyContent: 'flex-end'},
                elevation,
              ]
            : [
                styles.msgContainer,
                {alignSelf: 'flex-start', justifyContent: 'flex-start'},
                elevation,
              ]
        }>
        {isCurrentUser && (
          <View style={[styles.currentUserMsg, (!item?.media?.type && item?.media?.type !== 'audio') &&elevation,{backgroundColor:(item?.media?.type&& item?.media?.type !== 'audio')?'rgba(0,0,0,0)':colors.myChatbg}]}>
            {item?.text !== '' && (
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSize(12),
                }}>
                {item.text}
              </Text>
            )}
            {item?.media?.type === 'audio' ? (
              <View style={{width: (width / 100) * 80}}>
                <ListItem
                current = {isCurrentUser}
                  key={item?.media?.uri}
                  currentPlaying={currentPlaying}
                  setCurrentPlaying={setCurrentPlaying}
                  item={{path: item?.media?.uri, uri: item?.media?.uri}}
                  onPanStateChange={value => setShouldScroll(!value)}
                />
              </View>
            ) : (
              item?.media?.type && (
                <View
                  style={{
                    height: 200,
                    width: 150,
                    alignItems:'flex-end',
                    alignSelf:'flex-end'
                  }}>
                  <TouchableOpacity
                    disabled={
                      !(
                        item.media.type === 'image' || item.media.type === 'pdf'
                      )
                    }
                    onPress={() => {
                      setPlay({uri: item.media.uri, type: item.media?.type});
                      item.media.type === 'pdf'
                        ? open(item.media.uri)
                        : setModalVisible(true);
                    }}>
                    <Media
                      uri={
                        item.media.type === 'video' || item.media.type === 'pdf'
                          ? item.media.thumbnail
                          : item.media.uri
                      }
                      type={item?.media?.type}
                      video={item?.media?.uri}
                      createdAt={formatTime(item?.createdAt)}
                    />
                  </TouchableOpacity>
                  {item.media?.type === 'video' && (
                    <TouchableOpacity
                      onPress={() => {
                        setPlay({uri: item.media.uri, type: item.media?.type});
                        setModalVisible(true);
                      }}
                      style={{
                        height: '100%',
                        width: width/2.5,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',

                        borderRadius: 20,
                      }}>
                      <Icon
                        name={'play'}
                        size={50}
                        iconFamily={'antDesign'}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )
            )}
            <View
              style={{
                position: 'absolute',
                top: 12,
                right: -4,
                // backgroundColor: 'red',
                transform: [{rotate: '225deg'}],
              }}>
              {(!item?.media?.type || item?.media?.type === 'audio')&&<SVG
                height={6}
                width={12}
                stroke={colors.myChatbg}
                // fill={colors.chatBubble}
                color={colors.myChatbg}
                icon={svg.corner}
              />}
            </View>
            {item?.createdAt&&(!item?.media?.type || item?.media?.type === 'audio')&&<Text
              style={{
                color: colors.black,
                fontSize: fontSize(11),
                textAlign: 'right',
              }}>
              {formatTime(item?.createdAt)}
            </Text>}
          </View>
        )}
        {isCurrentUser && (
          <TouchableOpacity onPress={()=>navigation.navigate("Profile",{uid:uid, myProfile:true})} style={[styles.profileSection]}>
            <Text style={{fontSize: fontSize(15), fontWeight: '700', color: colors.grey}}>
              {profile?.data?.name.length <= 7
                ? profile?.data?.name
                : profile?.data?.name.substring(0, 7)}
            </Text>
            {
              <Image
                style={{borderRadius: 25, height: 50, width: 50, borderWidth:1, borderColor:colors.black}}
                source={{uri: profile?.data?.avatar?profile?.data?.avatar:profile?.data?.profilePic?profile?.data?.profilePic:
                  'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'
                }}
              />}
          </TouchableOpacity>
        )}
        {!isCurrentUser && (
          <TouchableOpacity  onPress={()=>navigation.navigate("Profile",{uid:user.id})}  style={[styles.profileSection]}>
            <Text style={{fontSize: fontSize(15), color: colors.grey}}>
              {user.name.length <= 7 ? user.name : user.name.substring(0, 7)}
            </Text>
            <Image
                style={{borderRadius: 25, height: 50, width: 50, borderWidth:1, borderColor:colors.black}}
              source={{
                uri: user?.avatar
                  ? user?.avatar
                  : user?.profilePic
                  ? user?.profilePic
                  : 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg',
              }}
            />
          </TouchableOpacity>
        )}
        {!isCurrentUser && (
          <View style={[styles.otherUserMsg,  (!item?.media?.type && item?.media?.type !== 'audio')&&elevation,{backgroundColor:(item?.media?.type && item?.media?.type !== 'audio')?'rgba(0,0,0,0)':colors.black}]}>
            <View
              style={{
                position: 'absolute',
                top: 12,
                left: -4,
                transform: [{rotate: '45deg'}],
              }}>
              {(!item?.media?.type || item?.media?.type === 'audio')&&<SVG
                height={6}
                width={12}
                stroke={colors.black}
                // fill={colors.chatBubble}
                color={colors.black}
                icon={svg.corner}
              />}
            </View>
            {!item?.media?.type && (
              <Text style={{color: colors.myChatbg ,
                fontSize: fontSize(12),}}>{item.text}</Text>
            )}
            {item?.media?.type === 'audio' ? (
              <View style={{width: (width / 100) * 80}}>
                <ListItem
                  current = {isCurrentUser}
                  key={item?.media?.uri}
                  currentPlaying={currentPlaying}
                  setCurrentPlaying={setCurrentPlaying}
                  item={{path: item?.media?.uri, uri: item?.media?.uri}}
                  onPanStateChange={value => setShouldScroll(!value)}
                />
              </View>
            ) : (
              item?.media?.type && (
                <View
                  style={{
                    height: 200,
                    width: 150,
                  }}>
                  <TouchableOpacity
                    disabled={
                      !(
                        item.media.type === 'image' || item.media.type === 'pdf'
                      )
                    }
                    onPress={() => {
                      setPlay({uri: item.media.uri, type: item.media?.type});
                      item.media.type === 'pdf'
                        ? open(item?.media?.uri)
                        : setModalVisible(true);
                    }}>
                    <Media
                      uri={
                        item.media.type === 'video' || item.media.type === 'pdf'
                          ? item.media.thumbnail
                          : item.media.uri
                      }
                      type={item.media.type}
                      
                      video={item?.media?.uri}
                      createdAt={formatTime(item?.createdAt)}
                    />
                  </TouchableOpacity>
                  {item.media?.type === 'video' && (
                    <TouchableOpacity
                      onPress={() => {
                        setPlay({
                          uri: item.media.uri,
                          type: item.media?.type,
                        });
                        setModalVisible(true);
                      }}
                      style={{
                        height: '100%',
                        width: 150,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                        position: 'absolute',
                      }}>
                      <Icon
                        name={'play'}
                        size={50}
                        iconFamily={'antDesign'}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )
            )}
            {item?.createdAt&&(!item?.media?.type || item?.media?.type === 'audio')&&<Text
              style={{
                color: isCurrentUser?colors.black:colors.myChatbg,
                fontSize: fontSize(11),
                textAlign: 'right',
              }}>
              {formatTime(item?.createdAt)}
            </Text>}
          </View>
        )}
      </View>
    );
  };

  const fadeIn = () => {
    if (isRecordings.current) {
      Animated.timing(opacity, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(fadeOut, 1000);
      });
    } // Wait 1 second before starting fade out
  };

  const fadeOut = () => {
    if (isRecordings.current) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(fadeIn, 1000);
      });
    } // Wait 1 second before starting fade in
  };
  useEffect(() => {
    fadeOut(); // Start the animation cycle
  }, [isRecording]);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={{padding: 20, backgroundColor: colors.white, flexDirection:'row'}}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={25}
              name={'chevron-back-outline'}
              color={'#000'}
              iconFamily={'ionic'}
            />
          </TouchableOpacity> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: 35}}></View>
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: colors.gray1,
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 30,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontWeight: '700',
                  fontSize: 20,
                }}>
                {user.name}
              </Text>
            </View>
            <View style={{width: 35}} />
          </View> */}

          <TouchableOpacity  onPress={()=>navigation.navigate("Profile",{uid:user.id})}  style={[styles.profileSection,{flexDirection:'row', justifyContent:'center', alignItems:'center', gap:10}]}>

        <TouchableOpacity style={{marginEnd:0}}
          onPress={() =>route?.params?.reset?
            navigation.reset({
              index: 0,
              routes: [{name: 'Drawer2'}],
            }):navigation.goBack()
          }>
          <Icon
            size={25}
            name={'arrow-back-outline'}
            color={'#000'}
            iconFamily={'ionic'}
          />
        </TouchableOpacity>
           
            <Image
                style={{borderRadius: 25, height: 35, width: 35, borderWidth:1, borderColor:colors.black}}
              source={{
                uri: user?.avatar
                  ? user?.avatar
                  : user?.profilePic
                  ? user?.profilePic
                  : 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg',
              }}
            />
             <Text style={{fontSize: fontSize(20), color: colors.black}}>
              {user.name}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.divider} /> */}
        <View
          style={{flex: 1}}
          // tintColor={'red'}
          // source={require('../../assets/images/chatbg.png')}
          >
          <FlatList
            ref={flatListRef}
            inverted
            data={messages}
            renderItem={
              // ({item, index})=><RenderItem item = {item} index= {index} currentUser= {currentUser} navigation= {navigation} user= {user} />
              renderMessage
            }
            keyExtractor={(item, index) => index.toString()}
          />
          {upload && (
            <View style={styles.imagesContainer}>
              <TouchableOpacity onPress={() => handleMediaPick('gif')}>
                <SVG
                  icon={svg.gif}
                  height={34}
                  width={34}
                  color={colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMediaPick('all')}>
                <Image
                  source={require('../../assets/images/upload.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          )}
          {/*''''''''''''''''''''''''''' Input Container '''''''''''''''''''''''''''*/}
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              {isRecordings.current ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      onStopRecord(setIsRecording, setRecordedFile);
                      setIsRecording(false);
                      setRecordedFile('');
                      isRecordings.current = false;
                    }}>
                    <SVG
                      icon={svg.delete}
                      height={24}
                      width={24}
                      color={colors.red}
                    />
                  </TouchableOpacity>
                  <Animated.Text style={[styles.buttonText, {opacity}]}>
                    Recording...
                  </Animated.Text>
                </View>
              ) : (
                <>
                  <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                    style={{flex: 1, color: colors.black, borderRadius: 22.5}}
                    placeholderTextColor={colors.textPlaceholder}
                    // onSubmitEditing={sendMessage}
                  />
                  <TouchableOpacity onPress={() => setUpload(!upload)}>
                    {/* <SVG
                      icon={svg.file}
                      height={34}
                      width={34}
                      color={'#5F5F5F'}
                    /> */}
                  <SvgObjPath1 icon={svgobj1.iconFileupload} stroke={colors.black} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCamera(true)}>
                    {/* <SVG
                      icon={svg.camera}
                      height={34}
                      width={34}
                      color={colors.black}
                    /> */}
                  <SvgObjPath2 icon={svgobj2.camera} stroke1={colors.black} stroke2={colors.black}/>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* <Icon
            name={'gif-box'}
            iconFamily={'material'}
            size={25}
            color={colors.black}
          /> */}
              <View
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 17,
                  backgroundColor: colors.black,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {text.trim() !== '' ||
                media !== null ||
                isRecordings.current ? (
                  <TouchableOpacity onPress={sendMessage}>
                    <SVG
                      icon={svg.send}
                      height={24}
                      width={24}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      isRecordings.current = true;
                      checkPermission(setIsRecording);
                    }}>
                   <Icon
                      name={'microphone'}
                      iconFamily={'fontAwesome'}
                      size={24}
                      color={colors.white}
                    /> 
                  {/* <SvgObjPath1 icon={svgobj1.mike} stroke={colors.white} /> */}
                  </TouchableOpacity>
                )}
              </View>
              {/* <Icon
            name={'emoji-emotions'}
            iconFamily={'material'}
            size={25}
            color={colors.black}
          /> */}
              {/* media Button */}
              {/* <TouchableOpacity onPress={handleMediaPick}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../../assets/icons/camera-cap.png')}
            />
          </TouchableOpacity> */}
              {/* <Image
            style={{height: 25, width: 25}}
            source={require('../../assets/icons/upload.png')}
          /> */}
            </View>
          </View>
          {media && (
            <View
              style={{
                height: '40%',
                width: '85%',
                borderRadius: 10,
                backgroundColor: colors.gray,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 100,
              }}>
              {type === 'pdf' ? (
                <PDF
                  source={{uri: media}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : type === 'image' ? (
                <Image
                  source={{uri: media}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              ) : (
                type === 'video' && (
                  <View style={{height: '100%', width: '100%'}}>
                    <Image
                      source={{uri: media}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                    />

                    <TouchableOpacity
                      onPress={() => {
                        setModal2Visible(true);

                        handlePressPlay();
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name={'play'}
                        size={50}
                        iconFamily={'antDesign'}
                        color={colors.black}
                      />
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
          )}
        </View>
        {/******** See attachments or media ********/}
        {/*''''''''''''''''''''''''''' Modal 2 '''''''''''''''''''''''''''*/}
        <Modal
          visible={modal2Visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setModal2Visible(false);
          }}>
          <View style={{flex: 1}}>
            {
              <Video
                source={{uri: media}}
                style={{
                  flex: 1,
                  marginTop: insects.top,
                  bottom: insects.bottom,
                }}
                resizeMode="cover"
                paused={paused}
                onEnd={handleEnd}
                repeat={false}
                controls={false}
              />
            }
          </View>
        </Modal>
        {/*'''''''''''''''''''''''''''''' Modal 1 ''''''''''''''''''''''''''''''*/}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={{flex: 1}}>
            {play?.type === 'video' ? (
              <Video
                source={{uri: play?.uri}}
                resizeMode="cover"
                style={{
                  flex: 1,
                  marginTop: insects.top,
                  bottom: insects.bottom,
                }}
                paused={paused}
                onEnd={handleEnd}
                repeat={false}
                controls={false}
              />
            ) : (
              <Image
                source={{uri: play?.uri}}
                style={{
                  flex: 1,
                  marginTop: insects.top,
                  bottom: insects.bottom,
                }}
              />
            )}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: insects.top + 20,
                left: insects.left + 20,
              }}
              onPress={() => {
                setPlay(null);
                setModalVisible(false);
              }}>
              <Icon
                size={25}
                name={'chevron-back-outline'}
                color={'#000'}
                iconFamily={'ionic'}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <PlayModal
          title={'Audio Player'}
          uri={playModal.uri}
          visible={playModal.visible}
          onRequestClose={playModal.onPress}
        />
        {camera && (
          <RNCamera
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            style={{
              position: 'absolute',
              bottom: insects.bottom,
              top: insects.top,
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => setCamera(false)}>
                <Icon
                  size={25}
                  name={'chevron-back-outline'}
                  color={colors.white}
                  iconFamily={'ionic'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('CameraSetting')}>
                {/* <Image
              style={{height: 25, width: 25}}
              resizeMode="contain"
              source={require('../../assets/icons/settings.png')}
              tintColor={colors.white}
            /> */}
              </TouchableOpacity>
            </View>
            {/**Header Component where ony back and share button prsent ends here*/}
            <TouchableOpacity
              // ={handleLongPress}
              // onPressOut={handleRelease}
              onPress={() => {
                takePicture();
              }}
              style={{
                position: 'absolute',
                bottom: 50,
                left: Dimensions.get('screen').width / 2 - 40,
                // right: 0,
                alignSelf: 'center',
                height: 80,
                width: 80,
                backgroundColor: colors.black,
                borderRadius: 40,
                borderWidth: 5,
                borderColor: colors.white,
              }}
            />
          </RNCamera>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ChatScreen;




// const RenderItem = ({item, index, currentUser,navigation, user}: any) => {
//   const [shouldScroll, setShouldScroll] = useState<boolean>(true);
//   const [currentPlaying, setCurrentPlaying] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modal2Visible, setModal2Visible] = useState(false);
//   const [play, setPlay]: any = useState(null);
//   const profile = useSelector((state: any) => state.profile);

  
//   //Open Pdf or other documents in their respected app
//   async function open(url: any) {
//     try {
//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         Alert.alert('Error', `This URL of  can't be opened: `);
//       }
//     } catch (error: any) {

//       Alert.alert('Error', 'Failed to open URL: ' + error.message);
//     }
//   }
    
//   const isCurrentUser = item.from === currentUser?.uid;
//   return (
//     <View
//       key={index.toString()}
//       style={
//         isCurrentUser
//           ? [
//               styles.msgContainer,
//               {alignSelf: 'flex-end', justifyContent: 'flex-end'},
//               elevation,
//             ]
//           : [
//               styles.msgContainer,
//               {alignSelf: 'flex-start', justifyContent: 'flex-start'},
//               elevation,
//             ]
//       }>
//       {isCurrentUser && (
//         <View style={[styles.currentUserMsg, (!item?.media?.type && item?.media?.type !== 'audio') &&elevation,{backgroundColor:(item?.media?.type&& item?.media?.type !== 'audio')?'rgba(0,0,0,0)':colors.myChatbg}]}>
//           {item?.text !== '' && (
//             <Text
//               style={{
//                 color: colors.black,
//                 fontSize: fontSize(12),
//               }}>
//               {item.text}
//             </Text>
//           )}
//           {item?.media?.type === 'audio' ? (
//             <View style={{width: (width / 100) * 80}}>
//               <ListItem
//               current = {isCurrentUser}
//                 key={item?.media?.uri}
//                 currentPlaying={currentPlaying}
//                 setCurrentPlaying={setCurrentPlaying}
//                 item={{path: item?.media?.uri, uri: item?.media?.uri}}
//                 onPanStateChange={(value: any) => setShouldScroll(!value)}
//               />
//             </View>
//           ) : (
//             item?.media?.type && (
//               <View
//                 style={{
//                   height: 200,
//                   width: 150,
//                   alignItems:'flex-end',
//                   alignSelf:'flex-end'
//                 }}>
//                 <TouchableOpacity
//                   disabled={
//                     !(
//                       item.media.type === 'image' || item.media.type === 'pdf'
//                     )
//                   }
//                   onPress={() => {
//                     setPlay({uri: item.media.uri, type: item.media?.type});
//                     item.media.type === 'pdf'
//                       ? open(item.media.uri)
//                       : setModalVisible(true);
//                   }}>
//                   <Media
//                     uri={
//                       item.media.type === 'video' || item.media.type === 'pdf'
//                         ? item.media.thumbnail
//                         : item.media.uri
//                     }
//                     type={item?.media?.type}
//                     video={item?.media?.uri}
//                     createdAt={formatTime(item?.createdAt)}
//                   />
//                 </TouchableOpacity>
//                 {item.media?.type === 'video' && (
//                   <TouchableOpacity
//                     onPress={() => {
//                       setPlay({uri: item.media.uri, type: item.media?.type});
//                       setModal2Visible(true);
//                     }}
//                     style={{
//                       height: '100%',
//                       width: width/2.5,
//                       backgroundColor: 'rgba(0,0,0,0.3)',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       position: 'absolute',

//                       borderRadius: 20,
//                     }}>
//                     <Icon
//                       name={'play'}
//                       size={50}
//                       iconFamily={'antDesign'}
//                       color={colors.white}
//                     />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )
//           )}
//           <View
//             style={{
//               position: 'absolute',
//               top: 12,
//               right: -4,
//               // backgroundColor: 'red',
//               transform: [{rotate: '225deg'}],
//             }}>
//             {(!item?.media?.type || item?.media?.type === 'audio')&&<SVG
//               height={6}
//               width={12}
//               stroke={colors.myChatbg}
//               // fill={colors.chatBubble}
//               color={colors.myChatbg}
//               icon={svg.corner}
//             />}
//           </View>
//           {item?.createdAt&&(!item?.media?.type || item?.media?.type === 'audio')&&<Text
//             style={{
//               color: colors.black,
//               fontSize: fontSize(11),
//               textAlign: 'right',
//             }}>
//             {formatTime(item?.createdAt)}
//           </Text>}
//         </View>
//       )}
//       {isCurrentUser && (
//         <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={[styles.profileSection]}>
//           <Text style={{fontSize: fontSize(15), fontWeight: '700', color: colors.grey}}>
//             {profile?.data?.name.length <= 7
//               ? profile?.data?.name
//               : profile?.data?.name.substring(0, 7)}
//           </Text>
//           {
//             <Image
//               style={{borderRadius: 25, height: 50, width: 50, borderWidth:1, borderColor:colors.black}}
//               source={{uri: profile?.data?.avatar?profile?.data?.avatar:profile?.data?.profilePic?profile?.data?.profilePic:
//                 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'
//               }}
//             />}
//         </TouchableOpacity>
//       )}
//       {!isCurrentUser && (
//         <TouchableOpacity  onPress={()=>navigation.navigate("Profile",{id:user.id})}  style={[styles.profileSection]}>
//           <Text style={{fontSize: fontSize(15),color: colors.grey}}>
//             {user.name.length <= 7 ? user.name : user.name.substring(0, 7)}
//           </Text>
//           <Image
//               style={{borderRadius: 25, height: 50, width: 50, borderWidth:1, borderColor:colors.black}}
//             source={{
//               uri: user?.avatar
//                 ? user?.avatar
//                 : user?.profilePic
//                 ? user?.profilePic
//                 : 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg',
//             }}
//           />
//         </TouchableOpacity>
//       )}
//       {!isCurrentUser && (
//         <View style={[styles.otherUserMsg,  (!item?.media?.type && item?.media?.type !== 'audio')&&elevation,{backgroundColor:(item?.media?.type && item?.media?.type !== 'audio')?'rgba(0,0,0,0)':colors.black}]}>
//           <View
//             style={{
//               position: 'absolute',
//               top: 12,
//               left: -4,
//               transform: [{rotate: '45deg'}],
//             }}>
//             {(!item?.media?.type || item?.media?.type === 'audio')&&<SVG
//               height={6}
//               width={12}
//               stroke={colors.black}
//               // fill={colors.chatBubble}
//               color={colors.black}
//               icon={svg.corner}
//             />}
//           </View>
//           {!item?.media?.type && (
//             <Text style={{color: colors.myChatbg ,
//               fontSize: fontSize(12),}}>{item.text}</Text>
//           )}
//           {item?.media?.type === 'audio' ? (
//             <View style={{width: (width / 100) * 80}}>
//               <ListItem
//                 current = {isCurrentUser}
//                 key={item?.media?.uri}
//                 currentPlaying={currentPlaying}
//                 setCurrentPlaying={setCurrentPlaying}
//                 item={{path: item?.media?.uri, uri: item?.media?.uri}}
//                 onPanStateChange={(value: any) => setShouldScroll(!value)}
//               />
//             </View>
//           ) : (
//             item?.media?.type && (
//               <View
//                 style={{
//                   height: 200,
//                   width: 150,
//                 }}>
//                 <TouchableOpacity
//                   disabled={
//                     !(
//                       item.media.type === 'image' || item.media.type === 'pdf'
//                     )
//                   }
//                   onPress={() => {
//                     setPlay({uri: item.media.uri, type: item.media?.type});
//                     item.media.type === 'pdf'
//                       ? open(item?.media?.uri)
//                       : setModalVisible(true);
//                   }}>
//                   <Media
//                     uri={
//                       item.media.type === 'video' || item.media.type === 'pdf'
//                         ? item.media.thumbnail
//                         : item.media.uri
//                     }
//                     type={item.media.type}
                    
//                     video={item?.media?.uri}
//                     createdAt={formatTime(item?.createdAt)}
//                   />
//                 </TouchableOpacity>
//                 {item.media?.type === 'video' && (
//                   <TouchableOpacity
//                     onPress={() => {
//                       setPlay({
//                         uri: item.media.uri,
//                         type: item.media?.type,
//                       });
//                       setModalVisible(true);
//                     }}
//                     style={{
//                       height: '100%',
//                       width: 150,
//                       backgroundColor: 'rgba(0,0,0,0.3)',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       borderRadius: 20,
//                       position: 'absolute',
//                     }}>
//                     <Icon
//                       name={'play'}
//                       size={50}
//                       iconFamily={'antDesign'}
//                       color={colors.white}
//                     />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )
//           )}
//           {item?.createdAt&&(!item?.media?.type || item?.media?.type === 'audio')&&<Text
//             style={{
//               color: isCurrentUser?colors.black:colors.myChatbg,
//               fontSize: fontSize(11),
//               textAlign: 'right',
//               marginRight:10,
//             }}>
//             {formatTime(item?.createdAt)}
//           </Text>}
//         </View>
//       )}
//     </View>
//   );
// };