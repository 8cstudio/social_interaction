import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import Messages from '../messages/Messages';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import Icon from '../../components/customIcon/CustomIcon';
import {colors} from '../../assets/data/colors';
import {insect} from '../../assets/data/TypeScript';
import Feeds from '../feeds/Feeds';
import {RNCamera} from 'react-native-camera';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const CustomBottomNavigation = ({navigation, route}: any) => {
  const id = route?.params?.id ?? null;
  const [activeTab, setActiveTab] = useState(id ? id : 0);
  const [startX, setStartX] = useState(0);
  const tabNames = [
    'chat-processing-outline',
    'home-circle-outline',
    'account-circle-outline',
  ];
  const translateX = useRef(new Animated.Value(0)).current;
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef: any = useRef(null);
  const handleTouchStart = (e: any) => {
    setStartX(e.nativeEvent.pageX);
  };
  const handleTouchEnd = (e: any) => {
    const endX = e.nativeEvent.pageX;
    const distance = startX - endX;

    if (distance > 50 && activeTab < tabNames.length - 1) {
      setActiveTab(prev => Math.min(tabNames.length - 1, prev + 1));
    } else if (distance < -50 && activeTab > 0) {
      setActiveTab(prev => Math.max(0, prev - 1));
    }
  };
  Animated.timing(translateX, {
    toValue: -activeTab * SCREEN_WIDTH,
    duration: 300,
    useNativeDriver: true,
  }).start();
  const handleRecordStart = async () => {
    if (cameraRef?.current && !isRecording) {
      try {
        setIsRecording(true);
        const videoData = await cameraRef?.current?.recordAsync({
          quality: RNCamera.Constants.VideoQuality['720p'],
        });
        console.log('Video Recorded:', videoData);
        
        navigation.navigate('CapturedDataEdit', {uri: videoData?.uri});
        // Handle the recorded video (e.g., save or upload it)
      } catch (error) {
        console.error('Error recording video:', error);
      }
    }
  };

  const handleRecordStop = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };
  console.log(activeTab);

  return (
    <View style={styles.container}>
      <View
        style={styles.content}
        // onStartShouldSetResponder={() => true}
        // onResponderGrant={handleTouchStart}
        // onResponderMove={() => {}}
        // onResponderRelease={handleTouchEnd}
        >
        {/* <Animated.View
          style={[
            styles.slider,
            { transform: [{ translateX }] },
          ]}
        >
          {tabNames.map((tab, index) => (
            <View key={index} style={styles.tabPage}>
                {
                    index===0?<Feeds/>: index===1?<Home isRecording={isRecording} setIsRecording={setIsRecording} cameraRef={cameraRef}/>:<Messages/>
                }
                
            </View>
          ))}
        </Animated.View> */}
        {activeTab === 0 ? (
          <Feeds />
        ) : activeTab === 1 ? (
          <Home
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            cameraRef={cameraRef}
          />
        ) : (
          <Messages />
        )}
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: activeTab === 2 ? colors.black : colors.white,
            borderRadius: 50,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setActiveTab(0);
            // navigation.replace('Home',{id:0})
          }}>
          <Icon
            name={activeTab === 0 ? 'play' : 'play-outline'}
            size={18}
            iconFamily="ionic"
            color={activeTab === 2 ? colors.black : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity

        onPressIn={()=>{activeTab === 1&&handleRecordStart()}}
        onPressOut={()=>{activeTab === 1&& handleRecordStop()}}
          onPress={() => {
            setActiveTab(1);
            // navigation.replace('Home',{id:1})
          }}>
          <View
            style={[
              styles.cameraButton,
              {borderColor: activeTab === 2 ? colors.black : colors.white},
            ]}
          />
        </TouchableOpacity>
        {/* <View style={{width:28}}></View> */}
        <TouchableOpacity
          onPress={() => {
            setActiveTab(2);
            // navigation.replace('Home',{id:2})
          }}>
          <Icon
            name={activeTab === 2 ? 'chat-bubble' : 'chat-bubble-outline'}
            size={28}
            iconFamily="material"
            color={activeTab === 2 ? colors.black : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3, // To accommodate all 3 tabs horizontally
  },
  tabPage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 40, // Adjust the height to fill available space excluding the bottom nav
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red', // You can change the background color here
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // bottomNav: {
  //   height:50,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   borderTopWidth: 1,
  //   borderColor: '#ccc',
  //   paddingVertical: 10,
  //   backgroundColor: '#f8f8f8',
  // },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  cameraButton: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderRadius: 32,
    borderColor: 'white',
  },
});

export default CustomBottomNavigation;
