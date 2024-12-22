import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {colors} from '../../assets/data/colors';
import CustomButton from '../../components/customButton/CustomButton';
import MyCustomTabBar from '../../components/bottomTab/BottomTab';
import Video from 'react-native-video';
import Icon from '../../components/customIcon/CustomIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Percentage from '../../components/customAlert/Percentage';
import { requestStoragePermission, shareVideo } from '../downloader/Downloader';
import { feedsData, fontSize, uploadMediaToFirestore } from '../../assets/data/TypeScript';
import {createThumbnail} from 'react-native-create-thumbnail';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { plugins } from '../../../babel.config';
import Share from 'react-native-share';

const CapturedData = ({navigation, route}: any) => {
  const insects = useSafeAreaInsets();
  const item = route?.params?.result ?? null;
  const [shareClicked, setShareClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [paused, setPaused] = useState(false); // Control play/pause
  const [showPlayButton, setShowPlayButton] = useState(false); // Show or hide the play button
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  console.log("Uri of video",item);
  const [clicked, setClicked] = useState(false);
  

  const handleEnd = () => {
      setPaused(true);
      setShowPlayButton(true);
  };

  const handlePressPlay = () => {
      setPaused(false);
      setShowPlayButton(false);
  };
  function handleSave(value: any){
    console.log("Working");
    
      requestStoragePermission(item,'.mp4', progress, setProgress,setModalVisible,value)
  }
  // console.log(feedsData("Thumnail","uri"));
  async function handleAddFedd(){
    let path: any;
    if(Platform.OS==="ios"){
      if(item.startsWith("file")){
        path=item
      } else{
        path = `file://${item}`
      }
    } else{
      if(item.startsWith("file")){
        path=item
      } else{
        path = `file://${item}`
      }
    }
    
    const thumbnail = await createThumbnail({
      url: path,
      timeStamp: 10, // 10 seconds into the video
    });
    try {
      setModalVisible(true)
      const result = await uploadMediaToFirestore(thumbnail.path,path,setProgress)
      console.log(result);
      const data = feedsData(result?.thumbnail,result?.uri,"","","")
      firestore().collection("feeds").doc(auth().currentUser?.uid).get()
      .then(doc => {
        if (doc.exists) {
          // Document exists, update the array
          firestore().collection('feeds').doc(auth().currentUser?.uid).set({
            feeds: firestore.FieldValue.arrayUnion(data)
          }, { merge: true }).then(() => {
            navigation.reset({
              index: 1,
              routes: [
                { name: 'Drawer2' }, // First screen you want to keep
                { name: 'Profile', params: { myProfile: true } } // The new screen you want to navigate to
              ],
            });
            console.log('Document updated successfully!');
          }).catch(error => {
            console.error('Error updating document: ', error);
          });
        } else {
          // Document does not exist, create it with the array
          firestore().collection('feeds').doc(auth().currentUser?.uid).set({
            feeds: [data],
          }).then(() => {
            navigation.reset({
              index: 1,
              routes: [
                { name: 'Drawer2' }, // First screen you want to keep
                { name: 'Profile', params: { myProfile: true } } // The new screen you want to navigate to
              ],
            });
            console.log('Document created successfully!');
          }).catch(error => {
            console.error('Error creating document: ', error);
          });
        }
      })
      .catch(error => {
        console.error('Error getting document:', error);
      });
    } catch (error) {
      console.log(error);
      
    } finally{
      setModalVisible(false)
    }
  }
  
  const shareVideo = async () => {
    const options = {
      title: 'Share video',
      type: 'video/mp4', // Specify the type of content
      url: item, // Path to the video file
      // Additional options like subject, message, etc.
    };

    try {
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
        <Video
            source={{ uri: item }}
            resizeMode="contain"
            style={styles.backgroundVideo}
            paused={paused}
            onEnd={handleEnd}
            repeat={false}
            controls={false}
          />{showPlayButton && (
            <TouchableOpacity style={styles.playButtonContainer} onPress={handlePressPlay}>
              <Icon name={"play"} size={50} iconFamily={'antDesign'} color={colors.white}/>
            </TouchableOpacity>
        )}
        <View
          style={{
            position:'absolute',
            top:insects.top+20,bottom:insects.bottom+ 70, left:insects.left,right:insects.right,
            // pointerEvents:'none',
            flex: 1,
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <View style={styles.topBar}>
              <View/>
            <View style={styles.rightIcons}>
              {/* <TouchableOpacity>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/add-user2.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/change.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/add-video.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/music.png')}
                />
              </TouchableOpacity>
              {addClicked && (
                <>
                  <TouchableOpacity>
                    <Image
                      style={styles.icon}
                      resizeMode="contain"
                      source={require('../../assets/icons/half.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      style={styles.icon}
                      resizeMode="contain"
                      source={require('../../assets/icons/timer.png')}
                    />
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity onPress={() => setAddClicked(!addClicked)}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/add-outlined.png')}
                />
              </TouchableOpacity> */}
              <TouchableOpacity style={{backgroundColor:colors.black,height:40,width:40,borderRadius:20, justifyContent:'center', alignItems:'center'}} onPress={() => shareVideo()}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/share.png')}
                />
              <Text style={styles.shareText}>share</Text>
              </TouchableOpacity>
              {/* {shareClicked && (
                <View style={styles.shareOptions}>
                  <TouchableOpacity onPress={()=>Platform.OS ==="android"? shareVideo(item,"fb"):handleSave("fb")}>
                    <Image
                      style={styles.shareOptionIcon}
                      source={require('../../assets/icons/fb.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>Platform.OS ==="android"? shareVideo(item,"insta"):handleSave("insta")}>
                    <Image
                      style={styles.shareOptionIcon}
                      source={require('../../assets/icons/insta.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>Platform.OS ==="android"? shareVideo(item,"what"):handleSave("what")}>
                    <Image
                      style={styles.shareOptionIcon}
                      source={require('../../assets/icons/tiktok.png')}
                    />
                  </TouchableOpacity>
                </View>
              )} */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <CustomButton
            onPress={()=>handleSave("save")}
              title={'Save'}
              width={'40%'}
              btnColor={colors.black}
              btnTextColor={colors.white}
              prefixIcon
              iconName="save-alt"
              iconFamily="material"
              iconColor={colors.white}
              iconSize={20}
              height={fontSize(50)}
            />
            {/* <CustomButton
            onPress={()=>handleAddFedd()}
              title={'Add Feed'}
              width={'30%'}
              btnColor={colors.black}
              btnTextColor={colors.white}
            /> */}
            <CustomButton
              title={'Send To'}
              width={'40%'}
              btnColor={colors.black}
              btnTextColor={colors.white}
              suffixIcon
              iconName={'send'}
              iconFamily={'ionic'}
              iconSize={15}
              iconColor={colors.white}
              height={fontSize(50)}
              onPress={() => navigation.navigate('AddSnap',{item: item, thumbnail:route?.params?.thumbnail, videoUrl:route?.params?.videoUrl, cat:route?.params?.cat})}
            />
          </View>
        </View>
         
      <Percentage title={"Downloading"} message={`Download Progress ${progress}%`} visible={modalVisible} onPress={()=>setModalVisible(false)} />
      {/*************** bottom bar ***************/}
      <MyCustomTabBar top={0.00001} activeTab={3} />
    </SafeAreaView>
  );
};

export default CapturedData;
