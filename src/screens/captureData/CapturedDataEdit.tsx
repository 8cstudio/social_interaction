import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ScrollView,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {colors} from '../../assets/data/colors';
import CustomButton from '../../components/customButton/CustomButton';
// import MyCustomTabBar from '../../components/bottomTab/BottomTab';
import Video from 'react-native-video';
import Icon from '../../components/customIcon/CustomIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Percentage from '../../components/customAlert/Percentage';
import RNFS from 'react-native-fs';
// import {requestStoragePermission, shareVideo} from '../downloader/Downloader';
// import {
//   feedsData,
//   fontSize,
//   formatSecondsToMinutes,
//   height,
//   uploadMediaToFirestore,
//   width,
// } from '../../assets/data/TypeScript';
import {createThumbnail} from 'react-native-create-thumbnail';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import {plugins} from '../../../babel.config';
// import {SVG3, SvgColor, SvgObjPath1} from '../../components/svg/SVG';
// import {svgobj1, svgobj3} from '../../assets/data/svgobj';
import Header2 from '../../components/header2/Header2';
import {Slider} from '@miblanchard/react-native-slider';
import {FFmpegKit, FFmpegKitConfig, ReturnCode} from 'ffmpeg-kit-react-native';
import RNFetchBlob from 'react-native-blob-util';
// import {filters, fontFamilyArray} from '../../assets/data/arrays';
// import {fontsInter} from '../../assets/data/fonts';
// import ActivityIndicatorAlert from '../../components/customAlert/ActivityIndicator';
import ImagePicker from 'react-native-image-crop-picker';
import ColorPicker from 'react-native-wheel-color-picker';
import { formatSecondsToMinutes } from '../../components/functions/FeedFunctions';
import { fontSize, height, width } from '../../components/functions/GlobalFunctions';
import { SVG3, SvgColor, SvgObjPath1 } from '../../components/svgs/SVG';
import { svgobj1, svgobj3 } from '../../assets/data/svgobj';
import { filters, fontFamilyArray } from '../../assets/data/arrays';
import { fontsInter } from '../../assets/fonts/Fonts';
import ActivityIndicatorAlert from '../../components/modals/ActivityIndicator';
// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';
// const audioSet = {
//   AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//   AudioSourceAndroid: AudioSourceAndroidType.MIC,
//   AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//   AVNumberOfChannelsKeyIOS: 2,
//   AVFormatIDKeyIOS: AVEncodingOption.aac,
//   OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
// };
// import Share from 'react-native-share';
// import {Commands} from 'react-native-maps/lib/MapMarkerNativeComponent';
// const audioRecorderPlayer = new AudioRecorderPlayer();

const CapturedDataEdit = ({navigation, route}: any) => {
  const [size, setSize]: any = useState(null);
  const insects = useSafeAreaInsets();
  const [musics, setMusics] = useState(null);
  const [selectedMusic, setSelectedMusic]: any = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [text, setText] = useState('');
  const [font, setFontSize] = useState(50);
  const [textColor, setTextColor] = useState(colors.white); // Default to white
  const [fontFamily, setFontFamily] = useState(''); // Default font
  const [trimDuration, setTrimDuration] = useState(null)
  const [range, setRange]: any = useState([]);
  const [endTime, setEndTime] = useState(0); // Default to 10 seconds
  const [processing, setProcessing] = useState(false);
  const [uri, setUri] = useState(
    route?.params?.uri ??
      'file:///data/user/0/com.kenna/cache/e2f39e59-f580-4f75-815f-ec9700af4815/20240826_221120.mp4',
  );
  const [edit, setEdit] = useState('');
  const [frames, setFrames] = useState([]);
  const [distance, setDistance] = useState(50);
  const item = route?.params?.result ?? null;
  const [shareClicked, setShareClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [paused, setPaused] = useState(false); // Control play/pause
  const [showPlayButton, setShowPlayButton] = useState(false); // Show or hide the play button
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState(true);
  const [selectedFilter, setSelectedFilter]: any = useState(null);
  const [clicked, setClicked] = useState(false);
  const [cropResult, setCropResult]: any = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    firestore()
      .collection('Audios')
      .doc('zi9YFuiYGKf33DgYJJdz')
      .get()
      .then(async (doc: any) => {
        if (doc.exists) {
          setMusics(doc.data().audio);
        }
      })
      .catch(error => {
        Alert.alert(
          'Error',
          'Could Not Get Musics From Database:- ' + error.message,
        );
      });
  }, []);
  const handleEnd = () => {
    setPaused(true);
    setShowPlayButton(true);
  };

  useEffect(() => {
    if (edit === 'trim') {
    }
  }, [edit]);
  const onRangeChange = (value: any) => {
    setTrimDuration(true);
    console.log("chhgcg bnm ");
    
    setRange(value);
  };

  const handleLoad = async (meta: any) => {
    setSize(meta.naturalSize);
    setDuration(meta.duration);
    setRange([0, meta.duration]);
    setEndTime(meta.duration);
    // setDuration(meta.duration); // Duration is provided in seconds
  };

  async function applyAllCommand() {
    // const {  applyBlur, applyCrop, applyText, applyMusic } = options;
    setModalVisible(true);
    const outputUri = `${
      RNFetchBlob.fs.dirs.CacheDir
    }/video${formatSecondsToMinutes(range[1] - range[0])}.mp4`;
    let command = `-y -i ${uri}`;
    // Add time range if specified
    command += ` -ss ${range[0]} -to ${range[1]}`;

    if (selectedMusic) {
      command += ` -i ${selectedMusic}`;
    }

    // Convert text color to FFmpeg format
    const textColorHex = textColor ? textColor.replace('#', '0x') : null;

    // Initialize filter string
    let filterString = '';

    // Conditionally apply cropping
    if (cropResult) {
      const {x, y, width, height} = cropResult;
      filterString += `crop=${width}:${height}:${x}:${y}`;
    }

    // Conditionally apply blur
    if (selectedFilter) {
      filterString += (filterString !== '' ? ',' : '') + selectedFilter;
    }

    // Conditionally apply text overlay
    if (text && text !== '') {
      filterString +=
        (filterString !== '' ? ',' : '') +
        `drawtext=fontfile='/system/fonts/DroidSans.ttf':text='${text}':fontcolor=${textColorHex}:fontsize=${
          font * 2
        }:x=(w-text_w)/2:y=(h-text_h)/2`;
    }

    // Add the filter chain to the command if any filters are applied
    if (filterString && selectedMusic) {
      command += ` -filter_complex "[0:v]${filterString}[v];[1:a]anull[a]" -map "[v]" -map "[a]"`;
      command += ` -c:v mpeg4`;
    } else if (filterString) {
      command += ` -vf ${filterString}`;
    } else {
      command += ` -c:a copy`; // If no filters, copy the audio from the original video
    }

    // Set video codec

    // Complete the command with the output path
    command += ` ${outputUri}`;

    console.log('My Command', command);

    try {
      FFmpegKit.execute(command)
        .then(async session => {
          let state = await session.getState();
          console.log('The State is', state);

          const returnCode = await session.getReturnCode();
          console.log(returnCode);

          if (ReturnCode.isSuccess(returnCode)) {
            console.log('Succes');
            if (outputUri.startsWith('file://')) {
              setUri(outputUri);
            } else {
              setUri(`file://${outputUri}`);
            }
            setTrimDuration(null)
            setEdit('');
            // SUCCESS
          } else if (ReturnCode.isCancel(returnCode)) {
            console.log('Cancel');

            // CANCEL
          } else {
            console.log('Error');
          }
          setModalVisible(false);
        })
        .catch(error => {
          setModalVisible(false);
          Alert.alert('Error', 'Error Croping Video' + error);
        })
        .finally(() => {
          setModalVisible(false);
          setModalVisible(false);
          setSelectedFilter(null);
          setSelectedMusic(null);
          setCropResult(null);
          setText('');
        });
    } catch (error) {
      console.error('FFmpeg error:', error);
      Alert.alert('Error', 'An error occurred while processing the video.');
    }
  }

  const trimVideo = () => {
    setModalVisible(true);
    const outputUri = `${
      RNFetchBlob.fs.dirs.CacheDir
    }/video${formatSecondsToMinutes(range[1] - range[0])}.mp4`;
    const command = `-y -i ${uri} -ss ${range[0]} -to ${range[1]} -c copy ${outputUri}`;
    FFmpegKit.execute(command)
      .then(async session => {
        let state = await session.getState();
        console.log('The State is', state);

        const returnCode = await session.getReturnCode();
        console.log(returnCode);

        if (ReturnCode.isSuccess(returnCode)) {
          setEdit('');
          if (outputUri.startsWith('file://')) {
            setUri(outputUri);
          } else {
            setUri(`file://${outputUri}`);
          }
        } else {
          Alert.alert('Error', 'Failed to trim video.');
        }

        setModalVisible(false);
      })
      .catch(err => {
        console.log('errr', err);
      })
      .finally(() => {
        setModalVisible(false);
      });
  };
  const applyFilter = async (filterCommand: any) => {
    setModalVisible(true);
    let outputPath = `${
      RNFetchBlob.fs.dirs.CacheDir
    }/video${new Date().getTime()}.mp4`;
    if (!outputPath.startsWith('file://')) {
      outputPath = 'file://' + outputPath;
    }
    const command = `-y -i ${uri} -vf ${filterCommand} ${outputPath}`;
    FFmpegKit.execute(command)
      .then(async session => {
        let state = await session.getState();
        console.log('The State is', state);

        const returnCode = await session.getReturnCode();
        console.log(returnCode);

        if (ReturnCode.isSuccess(returnCode)) {
          console.log('Succes');
          if (outputPath.startsWith('file://')) {
            setUri(outputPath);
          } else {
            setUri(`file://${outputPath}`);
          }
          setEdit('');
          setSelectedFilter(null);

          // SUCCESS
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('Cancel');

          // CANCEL
        } else {
          console.log('Error');
        }
        setModalVisible(false);
      })
      .catch(error => {
        setModalVisible(false);
        Alert.alert('Error', 'Error Converting file' + error);
        console.error('FFmpeg process failed', error);
      })
      .finally(() => {
        setModalVisible(false);
      });
  };
  const cropVideo = async (cropResult: any) => {
    setModalVisible(true);
    const {x, y, width, height} = cropResult;
    let outputPath = `${
      RNFetchBlob.fs.dirs.CacheDir
    }/video${new Date().getTime()}.mp4`;
    const ffmpegCommand = `-i ${uri} -vf "crop=${width}:${height}:${x}:${y}" ${outputPath}`;
    try {
      FFmpegKit.execute(ffmpegCommand)
        .then(async session => {
          let state = await session.getState();
          console.log('The State is', state);

          const returnCode = await session.getReturnCode();
          console.log(returnCode);

          if (ReturnCode.isSuccess(returnCode)) {
            console.log('Succes');
            if (outputPath.startsWith('file://')) {
              setUri(outputPath);
            } else {
              setUri(`file://${outputPath}`);
            }
            setEdit('');
            // SUCCESS
          } else if (ReturnCode.isCancel(returnCode)) {
            console.log('Cancel');

            // CANCEL
          } else {
            console.log('Error');
          }
          setModalVisible(false);
        })
        .catch(error => {
          setModalVisible(false);
          Alert.alert('Error', 'Error Croping Video' + error);
        })
        .finally(() => {
          setModalVisible(false);
        });
    } catch (error) {
      console.error('FFmpeg error:', error);
      Alert.alert('Error', 'An error occurred while processing the video.');
      setModalVisible(false);
    }
  };

  const cropThumbnail = async (thumbnail: any) => {
    console.log('thumb', thumbnail);
    try {
      const result: any = await ImagePicker.openCropper({
        path: thumbnail.path,
        width: width,
        height: height,
      });
      console.log(result.cropRect);

      let crop = {};
      let cropheight: any = result.cropRect?.height;
      let imageHeight = thumbnail.height;
      let crophWidth: any = result.cropRect?.width;
      let imageWidth: any = thumbnail.width;
      const finalHeight = size.height / imageHeight;
      const finalWidth = size.width / imageWidth;
      setCropResult({
        width: finalWidth * crophWidth,
        height: finalHeight * cropheight,
        x: finalWidth * result?.cropRect?.x,
        y: finalHeight * result.cropRect?.y,
      });
      // cropVideo({width:finalWidth*crophWidth, height:finalHeight*cropheight,x:finalWidth*result?.cropRect?.x,y:finalHeight*result.cropRect?.y});
      // Pass crop coordinates to parent component
      // onCropComplete(result);
    } catch (error) {
      console.error('Error cropping thumbnail:', error);
    }
  };
  const applyTextOverlay = async () => {
    if (!text) {
      Alert.alert('Error', 'Please enter text.');
      return;
    }
    setModalVisible(true);
    let outputPath = `${
      RNFetchBlob.fs.dirs.CacheDir
    }/video${new Date().getTime()}.mp4`;
    const textColorHex = textColor.replace('#', '0x'); // Convert to FFmpeg format

    // FFmpeg command to add text overlay
    const ffmpegCommand = `-i ${uri} -vf "drawtext=fontfile=${'/system/fonts/DroidSans.ttf'}:text=${text}:fontcolor=${textColorHex}:fontsize=${
      font * 2
    }:x=(w-text_w)/2:y=(h-text_h)/2" -codec:a copy ${outputPath}`;

    try {
      FFmpegKit.execute(ffmpegCommand)
        .then(async session => {
          let state = await session.getState();
          console.log('The State is', state);

          const returnCode = await session.getReturnCode();
          console.log(returnCode);

          if (ReturnCode.isSuccess(returnCode)) {
            console.log('Succes');
            if (outputPath.startsWith('file://')) {
              setUri(outputPath);
            } else {
              setUri(`file://${outputPath}`);
            }
            setEdit('');
            // SUCCESS
          } else if (ReturnCode.isCancel(returnCode)) {
            console.log('Cancel');

            // CANCEL
          } else {
            console.log('Error');
          }
          setModalVisible(false);
        })
        .catch(error => {
          setModalVisible(false);
          Alert.alert('Error', 'Error Croping Video' + error);
        })
        .finally(() => {
          setModalVisible(false);
        });
    } catch (error) {
      Alert.alert('Error', 'An error occurred while processing.');
      setModalVisible(false);
    }
  };
  const addMusicToVideo = async () => {
    setModalVisible(true);

    // Define the output video path

    let outputPath = `${
      RNFetchBlob.fs.dirs.CacheDir
    }/video${new Date().getTime()}.mp4`;
    // FFmpeg command to merge video and audio
    const ffmpegCommand = `-i ${uri} -i ${selectedMusic} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest ${outputPath}`;

    // Execute FFmpeg command
    FFmpegKit.execute(ffmpegCommand)
      .then(async session => {
        let state = await session.getState();
        console.log('The State is', state);

        const returnCode = await session.getReturnCode();
        console.log(returnCode);

        if (ReturnCode.isSuccess(returnCode)) {
          console.log('Succes');
          if (outputPath.startsWith('file://')) {
            setUri(outputPath);
          } else {
            setUri(`file://${outputPath}`);
          }
          setSelectedMusic(null);
          setEdit('');
          // SUCCESS
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('Cancel');

          // CANCEL
        } else {
          console.log('Error');
        }
        setModalVisible(false);
      })
      .catch(error => {
        setModalVisible(false);
        Alert.alert('Error', 'Error Croping Video' + error);
      })
      .finally(() => {
        setModalVisible(false);
      });
  };
  function handleSaveVideo() {
    // console.log(edit, duration, range[1]);
    // if (edit === 'trim') {
    //   if (duration !== range[1] || range[0] !== 0) {
    //     trimVideo();
    //   } else {
    //     setEdit('');
    //   }
    // } else if (edit === 'filter') {
    //   if (selectedFilter) {
    //     applyFilter(selectedFilter);
    //   } else {
    //     setEdit('');
    //   }
    // } else if (edit === 'text') {
    //   if (!text) {
    //     setEdit('');
    //     Alert.alert('Error', 'Please enter text.');
    //     return;
    //   }
    //   applyTextOverlay();
    // } else if (edit === 'music') {
    //   if (!selectedMusic) {
    //     setEdit('');
    //     Alert.alert('Error', 'No Audio Selected');
    //     return;
    //   }
    //   addMusicToVideo();
    // }
    setEdit('');
  }
  const Next = async () => {
    if (!selectedMusic && !cropResult && !selectedFilter && text === '') {
      console.log('Hurrah');
      save();
      return;
    }
    Alert.alert(
      'Confirmation',
      'You Have Selected a filter and you havent applied it yet press ok to upload video',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // This changes the button style to emphasize it's a cancel action
        },
        {
          text: 'OK',
          onPress: () => save(), // Replace with your logic
        },
      ],
      {cancelable: false}, // Optional: Prevent closing the alert by tapping outside
    );
  };
  async function save() {
    let video = uri;
    let path: any;
    let fileSizeInMB: any;
    if (video.startsWith('file://')) {
      path = video;
    } else {
      path = `file://${video}`;
    }
    const thumbnail = await createThumbnail({
      url: path,
      timeStamp: 100, // 1 seconds into the video
    });
    try {
      const stats = await RNFS.stat(uri);
      fileSizeInMB = stats.size / (1024 * 1024);
      console.log(`Local file size: ${fileSizeInMB} MB`);
    } catch (error) {
      console.error('Error getting local file size:', error);
      fileSizeInMB = 0;
    }

    navigation.replace('EditContent', {
      file: path,
      thumnail: thumbnail.path,
      size: fileSizeInMB,
    });
  }
  // const shareVideo = async () => {
  //   const options = {
  //     title: 'Share video',
  //     type: 'video/mp4', // Specify the type of content
  //     url: uri, // Path to the video file
  //     // Additional options like subject, message, etc.
  //   };

  //   try {
  //     await Share.open(options);
  //   } catch (error) {
  //     console.error('Error sharing video:', error);
  //   }
  // };
  function onEnd() {}
  return (
    <SafeAreaView style={{flex: 1}}>
      <Video
        source={{uri: uri}}
        resizeMode="cover"
        style={styles.backgroundVideo}
        paused={paused}
        controls={true}
        onEnd={handleEnd}
        repeat={false}
        // controls={true}
        onLoad={handleLoad}
        controlsStyles={{}}
      />
      {edit === '' && (
        <View style={[styles.container1, {top: 55 + insects.top}]}>
          {/*********************************** RIGHT ICONS  *************************************/}
          
          { (
            <View style={styles.rightIcons}>
              {/* <TouchableOpacity
                onPress={() => navigation.replace('AddFriends')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.addFriend} stroke={colors.white} />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => setEdit('music')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.music} stroke={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEdit('text')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.text} stroke={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEdit('trim')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.cut} stroke={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEdit('filter')}
                style={styles.icon1}>
                <SVG3 icon={svgobj3.filter} stroke={colors.white} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.replace('LogoDetection')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.Scan} stroke={colors.white} />
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() => navigation.replace('UploadLogoOptions')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.uploadIcon} stroke={colors.white} />
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => navigation.replace('ApplyForLogo')}
                style={styles.icon1}>
                <SvgObjPath1 icon={svgobj1.ads} fill={colors.viewBorder} />
              </TouchableOpacity> */}
              {/* <TouchableOpacity 
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => shareVideo()}
                >
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={require('../../assets/icons/share.png')}
                />
                <Text style={styles.shareText}>share</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          top: 0 + insects.top,
          left: 20,
          right: 20,
        }}>
        <Header2
          backIconcolor
          tick={edit === '' ? false : true}
          save={handleSaveVideo}
          edit={edit}
          setEdit={setEdit}
        />
      </View>
      {edit === 'trim' ? (
        <View style={styles.sliderContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={{color: colors.textPlaceholder, fontSize: 14}}>
              {range.length > 0 ? formatSecondsToMinutes(range[0]) : '00:00'}
            </Text>
            <Text style={{color: colors.textPlaceholder, fontSize: 14}}>
              {range.length > 0
                ? formatSecondsToMinutes(range[1] - range[0])
                : '00:00'}
            </Text>
            <Text style={{color: colors.textPlaceholder, fontSize: 14}}>
              {range.length > 0 ? formatSecondsToMinutes(range[1]) : '00:00'}
            </Text>
          </View>
          <Slider
            value={range}
            onValueChange={onRangeChange}
            minimumValue={0}
            maximumValue={duration}
            step={0.1}
            minimumTrackTintColor={colors.trim}
            maximumTrackTintColor={colors.grey}
            thumbTintColor={colors.white}
            // thumbStyle={styles.elevation}
            trackStyle={{height: 50}}
          />
        </View>
      ) : edit === 'filter' ? (
        <View style={{height: 130, backgroundColor: colors.black}}>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}
                  onPress={() => setSelectedFilter(filter.command)}>
                  <Image
                    source={require('../../assets/images/avatar1.png')}
                    style={{
                      width: 100,
                      height: 100,
                      opacity: selectedFilter === filter.command ? 0.5 : 1,
                    }}
                  />
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 12,
                      fontFamily: fontsInter.f500,
                    }}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : edit === 'text' ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: height / 2 - fontSize(160),
              left: 0,
              right: 0,
              alignItems: 'center',
              height: 94,
            }}>
            <TextInput
              style={[
                styles.input,
                {color: textColor, fontSize: font, fontFamily: fontFamily},
              ]}
              placeholder="Enter"
              value={text}
              onChangeText={setText}
              placeholderTextColor={textColor}
            />
          </View>
          <View
            style={{
              // justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: colors.black,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10,
                alignSelf: 'flex-end',
                marginEnd: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setColor(false);
                }}>
                <SvgObjPath1 icon={svgobj1.hamburger} stroke={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setColor(true);
                }}>
                <SvgColor />
              </TouchableOpacity>
            </View>
            {color && (
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  width: width / 2,
                }}>
                <SvgObjPath1 icon={svgobj1.text} stroke={colors.white} />
                <View style={[styles.sliderContainer, {width: '90%'}]}>
                  <Slider
                    value={font}
                    onValueChange={val => setFontSize(val[0])}
                    minimumValue={15}
                    maximumValue={50}
                    step={0.1}
                    minimumTrackTintColor="#D9D9D9" // Example color
                    maximumTrackTintColor="#7B7B7B" // Example color
                    thumbTintColor="#FFFFFF" // Example color
                    trackStyle={{height: 2}}
                  />
                </View>
              </View>
            )}
            {color ? (
              <ColorPicker
                color={textColor}
                onColorChange={col => {
                  console.log(col);
                  setTextColor(col);
                }}
                thumbSize={40}
                // sliderSize={40}
                noSnap={true}
                row={false}
                wheelLodingIndicator={<ActivityIndicator size={40} />}
                sliderLodingIndicator={<ActivityIndicator size={20} />}
                useNativeDriver={false}
                useNativeLayout={false}
                style={styles.colorPicker}
              />
            ) : (
              <View>
                <FlatList
                  data={fontFamilyArray}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={{marginVertical: 5}}
                      onPress={() => setFontFamily(item.family)}>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 20,
                          textAlign: 'center',
                          fontFamily: item.family,
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </>
      ) : edit === 'music' ? (
        <>
          <View
            style={{
              // justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: colors.black,
              padding: 20,
            }}>
            <FlatList
              numColumns={2}
              data={musics}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                    setSelectedMusic(item.audio);
                  }}
                  style={{
                    height: 100,
                    width: width / 2 - 30,
                    backgroundColor: colors.white,
                    borderRadius: 20,
                    margin: 5,
                    opacity: selectedMusic === item.audio ? 0.1 : 1,
                  }}>
                  <ImageBackground
                    source={{uri: item.uri}}
                    resizeMode="cover"
                    imageStyle={{
                      height: 100,
                      width: width / 2 - 30,
                      backgroundColor: colors.white,
                      borderRadius: 20,
                      // margin: 5,
                      opacity: selectedMusic === item.audio ? 0.5 : 1,
                      justifyContent: 'flex-end',
                    }}
                    style={{
                      height: 100,
                      width: width / 2 - 30,
                      backgroundColor: colors.white,
                      borderRadius: 20,
                      // margin: 5,
                      opacity: selectedMusic === item.audio ? 0.5 : 1,
                      justifyContent: 'flex-end',
                      // resizeMode:'cover'
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.opacity,
                        padding: 5,
                        borderRadius: 10,
                        margin: 10,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          fontFamily: fontsInter.f500,
                          color: colors.white,
                        }}>
                        Vibes
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          fontFamily: fontsInter.f500,
                          color: colors.white,
                        }}>
                        Song Name
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      {edit !== '' && (
        <View
          style={[
            {
              flexDirection: 'row',
              backgroundColor: colors.black,
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 20,
            },
          ]}>
          <TouchableOpacity
            onPress={async () => {
              const thumbnail = await createThumbnail({
                url: uri.startsWith('file://') ? uri : `file://${uri}`,
                timeStamp: 10, // 10 seconds into the video
              });
              setEdit('crop');
              cropThumbnail(thumbnail);
            }}
            style={[
              styles.icon1,
              {
                borderBottomWidth: edit === 'crop' ? 2 : 0,
                borderBottomColor: colors.white,
                paddingBottom: 10,
              },
            ]}>
            <SvgObjPath1 icon={svgobj1.crop} stroke={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEdit('trim')}
            style={[
              styles.icon1,
              {
                borderBottomWidth: edit === 'trim' ? 2 : 0,
                borderBottomColor: colors.white,
                paddingBottom: 10,
              },
            ]}>
            <SvgObjPath1 icon={svgobj1.cut} stroke={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEdit('filter')}
            style={[
              styles.icon1,
              {
                borderBottomWidth: edit === 'filter' ? 2 : 0,
                borderBottomColor: colors.white,
                paddingBottom: 10,
              },
            ]}>
            <SVG3 icon={svgobj3.filter} stroke={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEdit('text')}
            style={[
              styles.icon1,
              {
                borderBottomWidth: edit === 'text' ? 2 : 0,
                borderBottomColor: colors.white,
                paddingBottom: 10,
              },
            ]}>
            <SvgObjPath1 icon={svgobj1.text} stroke={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEdit('music')}
            style={[
              styles.icon1,
              {
                borderBottomWidth: edit === 'music' ? 2 : 0,
                borderBottomColor: colors.white,
                paddingBottom: 10,
              },
            ]}>
            <SvgObjPath1 icon={svgobj1.music} stroke={colors.white} />
          </TouchableOpacity>
        </View>
      )}
      {/* <Percentage
        title={'Downloading'}
        message={`Download Progress ${progress}%`}
        visible={modalVisible}
        onPress={() => setModalVisible(false)}
      /> */}

      {edit === '' && (
        <View
          style={{
            // flexDirection: 'row',
            // paddingHorizontal: 20,
            // justifyContent: 'space-between',
            position: 'absolute',
            // width: '100%',
            flexDirection: 'row',
            bottom: 90 + insects.bottom,
            // right: 20,
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <CustomButton
            disabled={
              !selectedMusic && !cropResult && !selectedFilter && text === '' && !trimDuration
            }
            onPress={() => applyAllCommand()}
            title={'Apply Filter'}
            width={'40%'}
            btnColor={
              (!selectedMusic && !cropResult && !selectedFilter && text === '' && !trimDuration)
                ? colors.lightGrey
                : colors.black
            }
            btnTextColor={colors.white}
            iconSize={20}
            height={fontSize(48)}
          />
          {/* <CustomButton
            onPress={()=>handleAddFedd()}
              title={'Add Feed'}
              width={'30%'}
              btnColor={colors.black}
              btnTextColor={colors.white}
            /> */}
          <CustomButton
            height={fontSize(48)}
            title={'Next'}
            width={'40%'}
            btnColor={colors.black}
            btnTextColor={colors.white}
            suffixIcon
            iconName={'send'}
            iconFamily={'ionic'}
            iconSize={15}
            iconColor={colors.white}
            onPress={() => Next()}
          />
        </View>
      )}

      <ActivityIndicatorAlert visible={modalVisible} title="Converting Video" />
      {/*************** bottom bar ***************/}
      {/* {edit === '' && <MyCustomTabBar top={0.00001} activeTab={3} />} */}
    </SafeAreaView>
  );
};

export default CapturedDataEdit;
