import {Alert, Dimensions, PermissionsAndroid, Platform} from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import storage from '@react-native-firebase/storage';
const audioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
  OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
};
import fs from 'react-native-fs';
const dirs = ReactNativeBlobUtil.fs.dirs;
const path = Platform.select({
  ios: `audio.m4a`, // Use .m4a for iOS
  android: `${dirs.CacheDir}/audio.mp3`, // Use .mp3 for Android (optional)
});

const audioRecorderPlayer = new AudioRecorderPlayer();

export async function checkPermission(setIsRecording: any) {
  console.log('Here');

  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external storage', grants);

      if (
        // grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        //   PermissionsAndroid.RESULTS.GRANTED &&
        // grants['android.permission.READ_EXTERNAL_STORAGE'] ===
        //   PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        onStartRecord(setIsRecording);
      } else {
        Alert.alert('Please Grant All the Permission');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  } else{
    console.log("Called onStartRecord");
    
    onStartRecord(setIsRecording);
  }
}
export const onStartRecord = async (setIsRecording: any) => {
  console.log("Called start record");
  const result = await audioRecorderPlayer.startRecorder(path, audioSet);
  audioRecorderPlayer.addRecordBackListener((e: any) => {
    console.log('Recording is in progress: ', e);
  });
  setIsRecording(true);
};
export const onStopRecord = async (setIsRecording, setRecordedFile) => {
  try {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    console.log('Recorded file path:', result);

    if (!result) {
      throw new Error('No file path returned by the recorder.');
    }

    // Check if the file exists
    const fileExists = await ReactNativeBlobUtil.fs.exists(result);
    if (!fileExists) {
      throw new Error(`File does not exist at path: ${result}`);
    }

    setIsRecording(false);
    setRecordedFile(result); // Store the recorded file path for further processing
    console.log('Recording stopped and file saved:', result);
    return result

    // Optional: Upload to Firebase (uncomment if needed)
    // const contentType = "audio/mp4"; // Update if the format is different
    // const storageRef = storage().ref(`chat_media/${new Date().getTime()}`);
    // await storageRef.putFile(result, { contentType });
    // const downloadUrl = await storageRef.getDownloadURL();
    // console.log('File uploaded to Firebase:', downloadUrl);
  } catch (error) {
    console.error('Error in onStopRecord:', error);
    Alert.alert('Recording Error', 'Unable to process the recorded file. Please try again.');
  }
};

export const onStartPlay = async (file: any, setPlayBack: any,) => {
  audioRecorderPlayer.removePlayBackListener();
  console.log("file", file);
  
  const msg = await audioRecorderPlayer.startPlayer(file);
  setPlayBack((prev: any)=>({
    ...prev,
    play:true,
    pause:false
  }));
  console.log("file", file);
  // console.log("Message is",msg);
  audioRecorderPlayer.setVolume(1.0);
  audioRecorderPlayer.addPlayBackListener(e => {
    //   setState({
    //     currentPositionSec: e.currentPosition,
    //     currentDurationSec: e.duration,
    //     playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    //     duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    //   });
    let played = Dimensions.get("window").width-110
    let percentage = (e.currentPosition/e.duration)*100
    let playedValue = (played/100)*percentage
    if((e.duration-50)< e.currentPosition){
      // console.log("Hrrah Its Working");
      
      setPlayBack({
        current:Dimensions.get("window").width-110,
        total:0,
        play:false,
        pause:true
      })
      onStopPlay();
    } else{
      setPlayBack((prev: any)=>({
        ...prev,
        current: played-playedValue,
        total: playedValue,
      }));
    }
    // console.log(
    //   'currentPositionSec:',
    //   e.currentPosition,
    //   'currentDurationSec:',
    //   e.duration,
    //   'playTime:',
    //   audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    //   'duration:',
    //   audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    // );
    return;
  });
};
export const onPausePlay = async (setPlayBack: any) => {
  await audioRecorderPlayer.pausePlayer();
  setPlayBack((prev: any)=>({
    ...prev,
    pause:true
  }));
};
export const onResumePlay = async (setPlayBack: any) => {
  await audioRecorderPlayer.resumePlayer();
  setPlayBack((prev: any)=>({
    ...prev,
    pause:false
  }));
};

export const onStopPlay = async () => {
  // console.log('onStopPlay');
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
};
