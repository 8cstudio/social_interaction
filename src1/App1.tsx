import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FinishMode,
  IWaveformRef,
  PermissionStatus,
  PlayerState,
  RecorderState,
  UpdateFrequency,
  Waveform,
  useAudioPermission,
} from '@simform_solutions/react-native-audio-waveform';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Gifs, Icons} from './assets';
import {audioListArray} from './constants';
import stylesheet from './styles';
import {Colors, globalMetrics} from './theme';
import fs from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import {downloadAudioFile} from '../src/screens/downloader/Downloader';
import RNFS from 'react-native-fs';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import {colors} from '../src/assets/data/colors';
import Icon from '../src/components/customIcon/CustomIcon';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import moment from 'moment';
import {fontSize, formatDuration} from '../src/assets/data/TypeScript';
const filePath: string = globalMetrics.isAndroid
  ? fs.DocumentDirectoryPath
  : fs.DocumentDirectoryPath;
export const ListItem = React.memo(
  ({
    item,
    currentPlaying,
    setCurrentPlaying,
    onPanStateChange,
    current
  }: any) => {
    const [duration, setDuration] = useState(0);
    const ref = useRef<IWaveformRef>(null);
    const [playerState, setPlayerState] = useState(PlayerState.stopped);
    const styles = stylesheet({currentUser: item.fromCurrentUser});
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile]: any = useState(null);
    const [uriName, setUriName]: any = useState('');
    const [progress, setProgress] = useState(0);
    const handleButtonAction = () => {
      if (playerState === PlayerState.stopped) {
        setCurrentPlaying(item.path);
      } else {
        setCurrentPlaying('');
      }
    };
    const downloadFile = () => {
      setIsLoading(true);
      downloadAudioFile(item?.uri, progress, setProgress, 'audio')
        .progress((received: any, total: any) => {
          const progressPercent = Math.floor((received / total) * 100);
          setProgress(progressPercent);
        })
        .then(async res => {
          let p = '';
          if (res.path().startsWith('file://')) {
            p = res.path();
            setFile(res.path());
          } else {
            p = `file://${res.path()}`;
          }
          const downloadedFilePath = res.path(); // Get the temporary download path
          // console.log("The PAth of audio downloaded is: -",res.path());
          // console.log(uriName, uriName.length);
          if(uriName && uriName.length!==0){
           
          const permanentFilePath = `${RNFS.DocumentDirectoryPath}/${uriName}.mp3`; // Define a permanent path
          const m4a = `${RNFS.DocumentDirectoryPath}/${uriName}.m4a`; // Define a permanent path
          try {
            await RNFS.moveFile(downloadedFilePath, permanentFilePath);
           
            convertAudio(`file://${permanentFilePath}`, `file://${m4a}`);
            // setFile(`file://${permanentFilePath}`)
            // Use the permanentFilePath for audio processing with your library
          } catch (error) {
            console.error('Error moving file:', error);
          }
        } else{
          // console.log("Hurrah");
          
        }
        })
        .catch(error => {
          console.log('KBV Error Downloading the audio file', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      // try {
      //   await RNFetchBlob.downloadFile({
      //     fromUrl: url,
      //     toFile: filePath,
      //   });
      // } catch (error) {
      //   console.error('Download error:', error);
      // }
    };
    async function convertAudio(inputFile: any, outputFile: any) {
      const command = `-i ${inputFile} -acodec aac -b:a 192k ${outputFile}`;
      FFmpegKit.execute(command)
        .then(async session => {
          let state = await session.getState();
          const returnCode = await session.getReturnCode();

          if (ReturnCode.isSuccess(returnCode)) {
            setFile(outputFile);
            // SUCCESS
          } else if (ReturnCode.isCancel(returnCode)) {
            // console.log('Cancel');

            // CANCEL
          } else {
            // console.log('Error');

            // ERROR
          }
        })
        .catch(error => {
          Alert.alert('Error', 'Error Converting file' + error);
        });
    }
    useEffect(() => {
      if(!item?.path){
        return
      }
      let path = '';
      // console.log("Item path", item.path);
      
      if (item?.path?.startsWith('https://')) {
        path = nameFile(item.path);
      } else {
        path = item.path;
      }
      fs.exists(`${filePath}/${path}`)
        .then(res => {
          if (res) {
            setFile(`${filePath}/${path}`);
          } else {
            setFile(null);
          }
        })
        .catch(err => {
          console.log('Could not download it', err);
        });
    }, []);
    function nameFile(u: any) {
      const url = u;
      const encodedFileName = url.substring(url.lastIndexOf('/') + 1);
      const fileName = decodeURIComponent(encodedFileName);
      const fileName1 = fileName.split('?')[0];
      const name = fileName1.split('/')[1];
      setUriName(name);
      return `${name}.m4a`;
    }
    useEffect(() => {
      if (currentPlaying !== item.path) {
        ref.current?.stopPlayer();
      } else {
        ref.current?.startPlayer({finishMode: FinishMode.stop});
      }
    }, [currentPlaying]);
    useEffect(() => {
      // Trigger auto-download when the component mounts if file is not present
      if (!file) {
        // downloadFile();
      }
    }, []);
    return (
      <View key={item.path} style={[styles.listItemContainer]}>
        <View style={styles.listItemWidth}>
          {file ? (
            <>
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleButtonAction}
                style={styles.playBackControlPressable}>
                {isLoading ? (
                  <ActivityIndicator color={current?colors.black:colors.myChatbg} />
                ) : (
                  <Image
                    source={
                      playerState === PlayerState.stopped
                        ? Icons.play
                        : Icons.stop
                    }
                    style={styles.buttonImage}
                    resizeMode="contain"
                    tintColor={current?colors.black:colors.myChatbg}
                  />
                )}
              </TouchableOpacity>
              <Waveform
                containerStyle={styles.staticWaveformView}
                mode="static"
                key={item.path}
                ref={ref}
                path={file}
                candleSpace={2}
                candleWidth={2}
                scrubColor={current?colors.black:colors.myChatbg}
                waveColor={Colors.gray}
                candleHeightScale={8}
                onPlayerStateChange={state => {
                  setPlayerState(state);
                  if (
                    state === PlayerState.stopped &&
                    currentPlaying === item.path
                  ) {
                    setCurrentPlaying('');
                  }
                }}
                onPanStateChange={onPanStateChange}
                onError={error => {}}
                onCurrentProgressChange={(currentProgress, songDuration) => {duration===0&&setDuration(songDuration)}}
                onChangeWaveformLoadState={state => {
                  setIsLoading(state);
                }}
              />
              <Icon
                name={'microphone'}
                iconFamily={'fontAwesome'}
                size={20}
                color={current?colors.black:colors.myChatbg}
              />
            </>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '63%',
              }}>
              <TouchableOpacity
                disabled={isLoading}
                onPress={downloadFile}
                style={[
                  styles.playBackControlPressable,
                  {flexDirection: 'row'},
                ]}>
                {!isLoading ? (
                  <Icon
                    name={'download'}
                    color={current?colors.black:colors.myChatbg}
                    size={15}
                    iconFamily={'antDesign'}
                  />
                ) : (
                  <AnimatedCircularProgress
                    size={20}
                    width={6}
                    fill={progress}
                    tintColor={'#00C000'}
                    onAnimationComplete={() => {}}
                    backgroundColor="#3d5875"
                  />
                )}
              </TouchableOpacity>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: current?colors.black:colors.myChatbg,
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 'bold',marginEnd:5
                }}>
                .....................................................................
              </Text>
              <Icon
                name={'microphone'}
                iconFamily={'fontAwesome'}
                size={20}
                color={current?colors.black:colors.myChatbg}
              />
            </View>
          )}
        </View>
        <Text
          style={{
            position: 'absolute',
            top: 30,
            fontSize: fontSize(11),
            color: current?colors.black:colors.myChatbg,
          }}>
          {formatDuration(duration)}
        </Text>
      </View>
    );
  },
);

const LivePlayerComponent = ({
  setList,
}: {
  setList: Dispatch<SetStateAction<ListItem[]>>;
}) => {
  const ref = useRef<IWaveformRef>(null);
  const [recorderState, setRecorderState] = useState(RecorderState.stopped);
  const styles = stylesheet();
  const {checkHasAudioRecorderPermission, getAudioRecorderPermission} =
    useAudioPermission();
  const startRecording = () => {
    ref.current
      ?.startRecord({
        updateFrequency: UpdateFrequency.high,
      })
      .then(() => {})
      .catch(() => {});
  };

  const handleRecorderAction = async () => {
    if (recorderState === RecorderState.stopped) {
      let hasPermission = await checkHasAudioRecorderPermission();

      if (hasPermission === PermissionStatus.granted) {
        startRecording();
      } else if (hasPermission === PermissionStatus.undetermined) {
        const permissionStatus = await getAudioRecorderPermission();
        if (permissionStatus === PermissionStatus.granted) {
          startRecording();
        }
      } else {
        Linking.openSettings();
      }
    } else {
      ref.current?.stopRecord().then(path => {
        setList(prev => [...prev, {fromCurrentUser: true, path}]);
      });
    }
  };

  return (
    <View style={styles.liveWaveformContainer}>
      <Waveform
        mode="live"
        containerStyle={styles.liveWaveformView}
        ref={ref}
        candleSpace={2}
        candleWidth={2}
        waveColor={Colors.pink}
        onRecorderStateChange={setRecorderState}
      />
      <Pressable
        onPress={handleRecorderAction}
        style={styles.recordAudioPressable}>
        <Image
          source={
            recorderState === RecorderState.stopped ? Icons.mic : Icons.stop
          }
          style={styles.buttonImageLive}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

const AppContainer = () => {
  const [shouldScroll, setShouldScroll] = useState<boolean>(true);
  const [currentPlaying, setCurrentPlaying] = useState<string>('');
  const [list, setList] = useState(audioListArray);

  const {top, bottom} = useSafeAreaInsets();
  const styles = stylesheet({top, bottom});

  return (
    <View style={styles.appContainer}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        animated
        translucent
      />
      <GestureHandlerRootView style={styles.appContainer}>
        <ImageBackground
          source={Gifs.appBackground}
          style={styles.screenBackground}>
          <View style={styles.container}>
            <View style={styles.simformImageContainer}>
              <Image
                source={Icons.simform}
                style={styles.simformImage}
                resizeMode="contain"
              />
            </View>
            <ScrollView scrollEnabled={shouldScroll}>
              {list.map(item => (
                <ListItem
                  key={item.path}
                  currentPlaying={currentPlaying}
                  setCurrentPlaying={setCurrentPlaying}
                  item={item}
                  onPanStateChange={(value:any) => setShouldScroll(!value)}
                />
              ))}
            </ScrollView>
          </View>
          <LivePlayerComponent setList={setList} />
        </ImageBackground>
      </GestureHandlerRootView>
    </View>
  );
};

export default function App1() {
  return (
    <SafeAreaProvider>
      <AppContainer />
    </SafeAreaProvider>
  );
}
