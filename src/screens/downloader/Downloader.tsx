import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    PermissionsAndroid,
    Alert,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import ReactNativeBlobUtil  from 'react-native-blob-util';
// import RNFetchBlob from 'rn-fetch-blob';
import Share, { Social } from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { globalMetrics } from '../../../src1/theme';
import RNFS from 'react-native-fs';
const filePath: string = globalMetrics.isAndroid
  ? ReactNativeBlobUtil.fs.dirs.CacheDir
  : ReactNativeBlobUtil.fs.dirs.MainBundleDir;
 export const requestStoragePermission = async (pastedURL: any, type: any, progress: any,setProgress: any, setModalVisible: any, via: any) => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission',
                message: 'This app needs access to your storage to download files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              Alert.alert('Permission Denied', 'Storage permission is required to download files.');
              return;
            }
          }
          downloadFile(pastedURL,type, progress, setProgress, setModalVisible, via);
    } catch (err) {
        console.warn(err);
    }
};

const downloadFile = (pastedURL: any, type: any, progress: any,setProgress: any, setModalVisible: any,via: any) => {
    const { fs } = ReactNativeBlobUtil;
    const date = new Date();
    const DownloadDir = fs.dirs.DownloadDir;
    const options = {
        fileCache: true,
        appendExt: type,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          //             fileDir +
          //             '/download_' +
          //             Math.floor(date.getDate() + date.getSeconds() / 2) +
          //             '.mp4',
          path: `${DownloadDir}/kenna${Math.floor(date.getDate() + date.getSeconds() / 2)}.${type}`,
          description: 'Downloading file.'
        }
      };
      setModalVisible(true)
    ReactNativeBlobUtil.config(options)
        .fetch('GET', pastedURL, {
            //some headers ..
        })
        .progress((received: any, total: any) => {
            const progressPercent = Math.floor((received / total) * 100);
            setProgress(progressPercent);
            console.log(progressPercent,"received: " + received,"total", total);
          })
        .then(res => {
            // setProgress('100');
            setModalVisible(false)
            // the temp file path
            console.log('The file saved to ', res);
            // Alert.alert('file downloaded successfully ');
            if(via !== "save"){
            shareVideo(res.path(),via)
            return
            }
            console.log('File saved to:', res.path()); 
            if (Platform.OS === 'ios') { 
            //  ReactNativeBlobUtil .fs.writeFile(`${DownloadDir}/kenna${Math.floor(date.getDate() + date.getSeconds() / 2)}.${type}`, res.data, 'base64')
            //   .then(() => {
            //      ReactNativeBlobUtil.ios.previewDocument(`${DownloadDir}/kenna${Math.floor(date.getDate() + date.getSeconds() / 2)}.${type}`); 
            //     }
            //   ); 
            saveToGallery(res.path());
            } else {
              // saveToGalleryAndroid(res.path());
            }
        });
};
export const shareVideo = async (filePath: any, via: any) => {
  console.log(filePath);
  
    try {
        const shareOptions: any = {
            title: 'Share Video',
            // message: 'Check out this video!',
            url: `file://${filePath}`,
            type: 'video/mp4',
            social:via==="fb"?Share.Social.FACEBOOK:via==="insta"?Share.Social.INSTAGRAM:Share.Social.WHATSAPP
        };
        console.log("cancelled");
        
        await Share.shareSingle(shareOptions).then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (error) {
        console.error('Error sharing video: ', error);
    }
};

const saveToGallery = async (filePath: any) => {
   try { 
    await CameraRoll.save(filePath, { type: 'video' }); 
    Alert.alert('Success', 'Video saved to gallery!'); 
  } 
  catch (error) { 
    console.error(error); Alert.alert('Error', 'Failed to save video to gallery.'); 
  } 
};
 const saveToGalleryAndroid = async (filePath: any) => { 
  const { fs } = ReactNativeBlobUtil; 
  const downloadPath = `${fs.dirs.DownloadDir}/video_${Date.now()}.mp4`; 
  fs.mv(filePath, downloadPath) .then(() => { Alert.alert('Success', 'Video saved to gallery!'); }) 
  .catch((error) => { console.error(error); 
    Alert.alert('Error', 'Failed to save video to gallery.'); });
 };

export const downloadAudioFile = (pastedURL: any, progress: any,setProgress: any, name: any) => {
  const { fs } = ReactNativeBlobUtil;
  const date = new Date();
  const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        //             fileDir +
        //             '/download_' +
        //             Math.floor(date.getDate() + date.getSeconds() / 2) +
        //             '.mp4',
        description: 'Downloading file.',
        path: `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${name}.mp3`,
      }
    };
    return ReactNativeBlobUtil.config(options)
      .fetch('GET', pastedURL, {
          //some headers ..
      })
      
};