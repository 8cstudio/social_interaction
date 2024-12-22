import { Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import { useSelector } from "react-redux";

export const {width, height} = Dimensions.get("window")
export function fontSize(font: number) {
    return font / (430 / width);
  }


  export async function uploadMediaToFirestore(
    thumbnail: any,
    uri: any,
    setProgress: any,
  ) {
    let imageUploadPromise;
    let videoUploadPromise;
    try {
      thumbnail &&
        (imageUploadPromise = uploadFile(
          thumbnail,
          'thumnail/' + new Date().getTime(),
          setProgress,
          false,
        ));
      videoUploadPromise = uploadFile(
        uri,
        'uploads/' + new Date().getTime(),
        setProgress,
        true,
      );
      try {
        const [imageUrl, videoUrl] = await Promise.all([
          imageUploadPromise,
          videoUploadPromise,
        ]);
        return {thumbnail: imageUrl, uri: videoUrl};
      } catch (error) {
        console.log('Error:', error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  async function uploadFile(fileUri: any, path: any, onProgress: any, show: any) {
    const response = await fetch(fileUri);
    const blob: any = await response.blob();
  
    const reference = storage().ref(path);
    const task: any = reference.put(blob);
  
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        (taskSnapshot: any) => {
          const progress =
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
  
          show && onProgress(Math.round(progress).toFixed(0)); // Update progress through the callback
        },
        reject,
        () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL: any) => {
            blob.close(); // Close the blob after the upload
  
            resolve(downloadURL);
          });
        },
      );
    });
  }
  
export const uploadMedia = async (mediaPath: any, time: any) => {
  const storageRef = storage().ref(`chat_media/${time}`);
  await storageRef.putFile(mediaPath);
  const downloadUrl = await storageRef.getDownloadURL();
  // generateThumbnail(downloadUrl)
  return {downloadUrl};
};

export const elevation2 = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,

  elevation: 1,
};

export function feedsData(
  thumbnail: any,
  uri: any,
  tittle: any,
  profile: any
) {
  return {
    comments: [],
    likes: 0,
    thumbnail: thumbnail,
    createdAt: new Date(),
    uri: uri,
    views: 0,
    tittle: tittle,
    name: profile?.name ?? '',
    pic: profile?.profilePic ?? ''
  };
}


moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 7);
moment.relativeTimeThreshold('w', 4);

moment.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: 'just now',
        ss: '%ss',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        w: '1w',
        ww: '%dw',
        M: '1mo',
        MM: '%dmo',
        y: '1y',
        yy: '%dy'
    }
})

export const formatTimeStamp = (timeStamp) => {
    if (typeof timeStamp !== 'number') {
        console.error('Invalid timestamp:', timeStamp);
        return 'Invalid date';
    } 
    return moment(timeStamp * 1000).fromNow(true)
}