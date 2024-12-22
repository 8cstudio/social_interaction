import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import Icon1 from '../../components/customIcon/CustomIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import DocumentPicker from 'react-native-document-picker';

import { colors } from '../../assets/data/colors';


export default function Home({isRecording, setIsRecording, cameraRef}: any) {
  
  const navigation :any= useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  async function handlePicVideo() {
    
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.video], // Allow all file types
        copyTo: 'cachesDirectory',
      });
      
      const f = res[0].fileCopyUri;
      console.log("res", res[0].fileCopyUri);
      
      navigation.navigate('CapturedDataEdit', {uri: res[0].fileCopyUri});
      
      return;
    } catch (err) {
      console.error('Error picking file:', err);

    } finally {
      console.log('called');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}
      />
      <View style={styles.header}>

        <View style={{
          flexDirection: 'row',
          gap:10,
          alignItems:'center',
        }}>

        <TouchableOpacity onPress={()=>navigation.navigate('AddFriendsScreen')} >
          <Icon1 name="adduser" iconFamily='antDesign' size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddFriendsScreen',{from:'search'})} >
        <Icon1 name="search1" iconFamily='antDesign' size={24} color="white" />
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity  onPress={()=>navigation.navigate('Profile')}>
          <View style={styles.avatar} >
            
          <Icon1 name="person" size={24} iconFamily='ionic' color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePicVideo}>
        <Image style={{height: 40, width: 40, resizeMode:'cover'}} source={require("../../assets/icons/gallery.png")} />
        </TouchableOpacity>
        </View>
      </View>

      {/* FAB Menu */}
      <View style={[styles.fabContainer, isMenuOpen && styles.menuOpen]}>
        {isMenuOpen && (
          <>
            <TouchableOpacity style={styles.fabItem}>
              <Icon name="refresh" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabItem}>
              <Icon name="people" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabItem}>
              <Icon name="emoji-people" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabItem}>
              <Icon name="widgets" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={styles.fabToggle}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

      // {/* Bottom Navigation */}
      // <View style={styles.bottomNav}>
      //   <TouchableOpacity style={{borderWidth:1, borderColor:colors.white, borderRadius:50, padding:5,
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}  onPress={()=>navigation.replace('Home',{id:0})}>
      //     <Icon1 name="play-outline" size={18} iconFamily='ionic' color="white" />
      //   </TouchableOpacity>
      //   <TouchableOpacity onPress={()=>navigation.navigate('CapturedData')}>
      //     <View style={styles.cameraButton} />
      //   </TouchableOpacity>
      //   {/* <View style={{width:28}}></View> */}
      //   <TouchableOpacity onPress={()=>navigation.replace('Home',{id:2})}>
      //     <Icon1 name="chat-bubble" size={28} iconFamily='material' color="white" />
      //   </TouchableOpacity>
      // </View>