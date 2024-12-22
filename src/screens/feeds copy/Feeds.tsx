import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
} from 'react-native';
import {VideoRef} from 'react-native-video';
import NetInfo from '@react-native-community/netinfo';
import {colors} from '../../assets/data/colors';
import Icon from '../../components/customIcon/CustomIcon';
import {styles} from './styles';
import MyCustomTabBar from '../../components/bottomTab/BottomTab';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {SVG, SvgObjPath2} from '../../components/svg/SVG';
import {svg} from '../../assets/data/svg';
import {
  handleAddComment,
  handleAddReply,
  updateViewStatusAndCount,
} from './FeedsHandlers';
import RenderItem from './RenderItem';
import RenderCommentItem from './RenderCommentItem';
import Video from 'react-native-video';

import {RNCamera} from 'react-native-camera';
import {
  height,
  uploadMedia,
  uploadMediaToFirestore,
  width,
} from '../../assets/data/TypeScript';
import {checkPermission, onStopRecord} from '../chatScreen/functions';
import {useIsFocused} from '@react-navigation/native';
import {svgobj2} from '../../assets/data/svgobj';
// const { height: screenHeight } = Dimensions.get('window');
// const THRESHOLD = 0.4 * screenHeight; // 40% of screen height
const Feeds = ({navigation, route}: any) => {
  const p = useSelector((state: any) => state.profile);
  const profile: any = p.data; // Define your grouped categories
  const categoryGroups = [
    [],
    ['Football', 'Athletic', 'Fitness', 'CrossFit', 'Running'],
    ['Dately', 'Friends', 'Groups'],
    ['Streaming', 'Gaming', 'Podcast', 'E-Gaming', 'Music'],
    ['Network', 'Job Listing', 'Alerts', 'Career Advice'],
    ['Sight seeing', 'Art', 'Literature', 'Movie', 'Language'],
  ]; // Initialize the categorized feeds
  const categorizedFeeds = Array.from(
    {length: categoryGroups.length},
    () => [],
  );
  const [highlight, setHighLight] = useState(route?.params?.highLight);
  const flatListRef: any = useRef();
  const {profileFeedsData, selectedProfileFeedIndex} = route?.params || {};
  const insect = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef: any = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [vis, stVis] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    selectedProfileFeedIndex || 0,
  );
  const [recordedFile, setRecordedFile] = useState('');
  const isRecordings: any = useRef(false);
  const [loading, setLoading] = useState(true);
  const [dataFetching, setDataFetching] = useState(true);
  const [shouldRetry, setShouldRetry] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [allFeedsCollection, setAllFeedsCollection] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedItem, setSelectedItem]: any = useState(null);
  const [commentMessage, setCommentMessage] = useState('');
  const [isConnected, setIsconnected] = useState(false);
  const [internetState, setInternetState] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [replyCommentIndex, setReplyCommentIndex] = useState(null);
  const userID = auth().currentUser?.uid;
  const videoRefs = useRef<VideoRef[]>([]);
  const commentInputRef = useRef<TextInput>(null);
  const [recording, setRecording] = useState(false);
  const [showCam, setShowCam] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const [pausedAll, setPausedAll] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [viewedVideos, setViewedVideos] = useState<
    {id: string; index: number}[]
  >([]);
  const currentRef = useRef(0);
  const horizontalRef = useRef(0);
  const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(0); // Horizontal index
  const [videoIndex, setVideoIndex]: any = useState([
    {horizontal: 0, vertical: 0},
  ]); // Horizontal index
  const [videoUri, setVideoUri]: any = useState(null);
  const [progress, setProgress] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const statusBar_Height = StatusBar?.currentHeight
    ? StatusBar?.currentHeight
    : 0;
  // Record a 5second reaction video
  useEffect(() => {
    if (isFocused) {
      if (pausedAll) {
        setPausedAll(false);
      }
    }
  }, [isFocused]);
  const startRecording = async () => {
    // cameraRef.current = true;
    setShowCam(true);
    if (cameraRef.current && !recording) {
      const options = {quality: RNCamera.Constants.VideoQuality['288p']};
      const promise = cameraRef.current.recordAsync(options);
      setRecording(true);
      if (promise) {
        setTimeout(() => {
          cameraRef.current.stopRecording();
          setRecording(false);
          setShowCam(false);
        }, 2000);
      }
      try {
        const data = await promise;
        // uploadVideo(data.uri);
        const result = await uploadMediaToFirestore(
          null,
          data.uri,
          setProgress,
        );
        isReply
          ? handleAddReply(
              replyMessage,
              allFeedsCollection,
              selectedItem,
              replyCommentIndex,
              userID,
              setAllFeedsCollection,
              setComments,
              setReplyMessage,
              internetState,
              result?.uri,
              isRecordings.current,
            )
          : handleAddComment(
              commentMessage,
              userID,
              selectedItem,
              allFeedsCollection,
              setAllFeedsCollection,
              setComments,
              setCommentMessage,
              internetState,
              result?.uri,
              isRecordings.current,
              // commentMessage,
              // userID,
              // selectedItem,
              // allFeedsCollection,
              // setAllFeedsCollection,
              // setComments,
              // setCommentMessage,
              // internetState,
            );
      } catch (e) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && shouldRetry) {
        retryPlayback();
      } else if (!state.isConnected && shouldRetry) {
        // const currentVideoRef = videoRefs.current[currentIndex];
        // if (currentVideoRef && typeof currentVideoRef.seek === 'function') {
        //   currentVideoRef.seek(currentPosition);
        // }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [shouldRetry]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setInternetState(state?.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [internetState]);
  // Check if the we have come from users profile or generic feeds
  useEffect(() => {
    if (route?.params?.highLight) {
      setDataFetching(false);
      setIsconnected(true);
      setAllFeedsCollection(route?.params?.feeds);
      setSelectedItem(route?.params?.feeds[0][0]);
    } else if (profileFeedsData && !route?.params?.link) {
      setDataFetching(false);
      setIsconnected(true);
      setAllFeedsCollection(profileFeedsData);
      setSelectedItem(profileFeedsData[0][0]);
    } else {
      getAllFeedsData();
    }
  }, [internetState]);
  //Get All Feeds
  const getAllFeedsData = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      setIsconnected(false);
    } else {
      setIsconnected(true);
      try {
        setDataFetching(true);
        const feeds = firestore().collection('feeds');
        const doc = await feeds.get();
        let allData: any = [];
        if (doc.empty) {
          console.log('No doc found');
          return;
        }
        doc.forEach(doc => {
          if (doc.data()?.feeds) {
            const feedsData = doc.data().feeds;
            const updatedFeedsData = feedsData.map((feed: any, index: any) => {
              const liked = profile?.likedVideos
                ? profile?.likedVideos.some(
                    video =>
                      video.id === doc.id &&
                      video.index === index &&
                      video.liked,
                  )
                : false;
              const updatedComments = feed.comments.map(
                (comment: any, commentIndex: any) => {
                  const commentLiked = profile?.likedVideos
                    ? profile?.likedVideos.some(video =>
                        video.id === doc.id &&
                        video.index === index &&
                        video?.likedComments
                          ? video?.likedComments.some(
                              likedComment =>
                                likedComment.commentIndex === commentIndex &&
                                likedComment.commentLiked,
                            )
                          : false,
                      )
                    : false;
                  const updatedReplies = comment.reply.map(
                    (reply: any, replyIndex: any) => {
                      const replyLiked = profile?.likedVideos
                        ? profile?.likedVideos.some(video =>
                            video.id === doc.id &&
                            video.index === index &&
                            video?.likedComments
                              ? video?.likedComments.some(likedComment =>
                                  likedComment.commentIndex === commentIndex &&
                                  likedComment?.likedReplies
                                    ? likedComment.likedReplies.some(
                                        likedReply =>
                                          likedReply.replyIndex ===
                                            replyIndex && likedReply.replyLiked,
                                      )
                                    : false,
                                )
                              : false,
                          )
                        : false;
                      return {
                        ...reply,
                        replyIndex: replyIndex,
                        replyLiked: replyLiked,
                      };
                    },
                  );
                  return {
                    ...comment,
                    commentIndex: commentIndex,
                    commentLiked: commentLiked,
                    reply: updatedReplies,
                  };
                },
              );
              return {
                ...feed,
                id: doc.id,
                index: index,
                liked: liked,
                comments: updatedComments,
              };
            });
            allData = [...allData, ...updatedFeedsData];
          }
        });
        // Group feeds by their corresponding category groups
        allData = allData.sort(() => Math.random() - 0.5);
        allData.forEach(feed => {
          // Check if the feed has a 'cat' property
          categorizedFeeds[0].push(feed);
          if (!feed.cat) {
            return; // Skip this feed
          }

          let found = false; // Flag to check if category is found
          categoryGroups.forEach((group, index) => {
            if (group.includes(feed.cat)) {
              categorizedFeeds[index].push(feed);
              found = true; // Mark that we found a category
            }
          });

          // Skip adding the feed if no category is found
          if (!found) {
          }
        });

        setAllFeedsCollection(categorizedFeeds);
        setSelectedItem(categorizedFeeds[0][0]);
        // if (route?.params?.link) {
        //   console.log('true');
        //   console.log('true',route?.params);
        //   console.log('true');

        //   const specificItem: any = allData.find(
        //     item =>
        //       item.id === route?.params?.id &&
        //       item.index === parseInt(route?.params?.index),
        //   );
        //   console.log('Specific Item:- ', specificItem);

        //   // Remove the specific item from the array
        //   const filteredData = allData.filter(
        //     item =>
        //       !(
        //         item.id === route?.params?.id &&
        //         item.index === parseInt(route?.params?.index)
        //       ),
        //   );

        //   // Shuffle the remaining items
        //   const shuffledData: any = filteredData.sort(
        //     () => Math.random() - 0.5,
        //   );
        //   // Combine the specific item with the shuffled data
        //   setAllFeedsCollection([specificItem, ...shuffledData]);
        // } else {
        //   console.log('Hahahahahahahahahahrahah false');
        //   allData = allData.sort(() => Math.random() - 0.5);
        //   setAllFeedsCollection(allData);
        // }
      } catch (error) {
        console.log('error', error);
      } finally {
        setDataFetching(false);
      }
    }
  };
  // Animation when recording start

  const onEnd = () => {
    // Move to the next video if available
    if (currentIndex < allFeedsCollection.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Scroll to the next item in the FlatList
      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
    }
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
  //End of animation
  const onViewableItemsChanged = useCallback(
    ({viewableItems}: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== null && newIndex !== currentIndex) {
          // setSelectedItem(allFeedsCollection[horizontalRef.current][newIndex]);
          setLoading(true);
          setPaused(false);
          setCurrentIndex(newIndex);
          currentRef.current = newIndex;
        }
      }
    },
    [currentIndex, allFeedsCollection],
  );
  const onViewableHorizontalItemsChanged = useCallback(
    ({viewableItems}: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== null && newIndex !== currentHorizontalIndex) {
          const cvi = currentRef.current;
          let pvi = -1;
          const updatedIndexArray = videoIndex.map(
            (item: {horizontal: number; vertical: number}) => {
              console.log(item.horizontal, currentHorizontalIndex);

              if (item.horizontal === currentHorizontalIndex) {
                console.log('Hurrah Matched', cvi);
                // Update the vertical value if the horizontal index already exists
                return {...item, vertical: cvi};
              } else if (item.horizontal === newIndex) {
                pvi = item.vertical;
              }
              return item;
            },
          );
          const indexExists = videoIndex.some(
            (item: {horizontal: number}) => item.horizontal === newIndex,
          );
          console.log('Updated Idnex Array', updatedIndexArray);
          if (!indexExists) {
            setVideoIndex([
              ...updatedIndexArray,
              {horizontal: newIndex, vertical: 0},
            ]); // Update the horizontal index
            currentRef.current = 0;

            // setSelectedItem(allFeedsCollection[newIndex][0]);
          } else {
            // Set the updated array if the index exists
            setVideoIndex(updatedIndexArray);
            if (pvi !== -1) {
              currentRef.current = pvi;
              // setSelectedItem(allFeedsCollection[newIndex][pvi]);
            } else {
              currentRef.current = 0;
              // setSelectedItem(allFeedsCollection[newIndex][0]);
            }
          }
          setCurrentHorizontalIndex(newIndex); // Update the horizontal index
          horizontalRef.current = newIndex;
        }
      }
    },
    [currentHorizontalIndex],
  );
  //If video is downloading then it will buffer
  const handleBuffer = ({isBuffering}: any) => {
    console.log('Is Buffering', isBuffering);

    if (isBuffering) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };
  //If video is loaded then the buffer corcle will be removed
  const handleReadyForDisplay = () => {
    setLoading(false);
  };
  const handleError = (error: any) => {
    if (
      error?.error?.errorCode == 22001 ||
      error?.error?.errorString ==
        'ExoPlaybackException: ERROR_CODE_IO_NETWORK_CONNECTION_FAILED'
    ) {
      setLoading(true);
      setPaused(true);
    } else {
      console.log('error', error);
    }
  };
  //Check If Video is watched for certain time and increment the view count
  const handleProgress = (data: any) => {
    // if (allFeedsCollection.length > 0) {
    //   const initialItem = allFeedsCollection[0][0];
    //   setSelectedItem(initialItem);
    // }
    const percentageWatched = (data.currentTime / data.seekableDuration) * 100;
    setCurrentPosition(data.currentTime);
    setShouldRetry(true);

    const hasViewed = viewedVideos.some(
      video =>
        video.id === selectedItem?.id && video.index === selectedItem?.index,
    );
    if (percentageWatched >= 50 && !viewCounted && !hasViewed) {
      updateViewStatusAndCount(userID, selectedItem, currentHorizontalIndex);
      setViewCounted(true);
      setViewedVideos(prev => [
        ...prev,
        {id: selectedItem?.id, index: selectedItem?.index},
      ]);
    }
  };
  const retryPlayback = async () => {
    setLoading(false);
    setShouldRetry(false);
    setPaused(false);
  };
  //Make a video start from specific time
  const handleSeek = (seekInfo: any) => {
    console.log('Seek info:', seekInfo);
  };
  //When We click comment button on screen a coments section is shown
  const handleCommentPress = (item: any) => {
    setSelectedItem(item);
    setComments(item.comments);
    stVis(true);
    setModalVisible(true);
  };
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80, // Consider an item visible if 80% is visible
  }).current;
  //When We click reply button on a comments section
  const handleReplyPress = (commentIndex: any) => {
    setReplyCommentIndex(commentIndex);
  };
  useEffect(() => {
    if (replyCommentIndex !== null) {
      setIsReply(true);
      commentInputRef.current?.focus();
    }
  }, [replyCommentIndex]);
  const renderItem = useCallback(
    (
      item: any,
      index: any,
      i: any,
      // videoRefs: any,
      // currentIndex: any,
      // paused: any,
      // insect: any,
      // handleBuffer: any,
      // handleError: any,
      // handleReadyForDisplay: any,
      // handleProgress: any,
      // handleSeek: any,
      // loading: any,
      // navigation: any,
      // handleCommentPress: any,
      // userID: any,
      // internetState: any,
      // setAllFeedsCollection: any,
      // allFeedsCollection: any,
      // clicked: any,
      // setClicked: any,
      // setViewCounted: any,
      // setCurrentPosition: any,
      // onEnd: any,
      // i: any,
      // currentRef: any,
      // horizontalRef: any
    ) => {
      const isCurrentVideo =
        index === currentRef.current && i === horizontalRef.current;
      return (
        <RenderItem
          item={item}
          index={index}
          videoRefs={videoRefs}
          currentIndex={isCurrentVideo}
          paused={paused}
          insect={insect}
          handleBuffer={handleBuffer}
          handleError={handleError}
          handleReadyForDisplay={handleReadyForDisplay}
          handleProgress={handleProgress}
          handleSeek={handleSeek}
          loading={loading}
          navigation={navigation}
          handleCommentPress={handleCommentPress}
          userID={userID}
          internetState={internetState}
          setAllFeedsCollection={setAllFeedsCollection}
          allFeedsCollection={allFeedsCollection}
          clicked={clicked}
          setClicked={setClicked}
          setViewCounted={setViewCounted}
          setCurrentPosition={setCurrentPosition}
          onEnd={onEnd}
          pausedAll={pausedAll}
          highLight={highlight}
          i={i}
          isCurrentVideo={isCurrentVideo}
          currentHorizontalIndex={currentHorizontalIndex}
        />
      );
    },
    [currentRef, horizontalRef, allFeedsCollection],
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: colors.darkGreay}}>
        {!isConnected ? (
          <ActivityIndicator
            size="large"
            color={colors.white}
            style={[styles.loadingIndicator, {flex: 1}]}
          />
        ) : (
          <>
            {dataFetching ? (
              <ActivityIndicator
                size="large"
                color={colors.white}
                style={[styles.loadingIndicator, {flex: 1}]}
              />
            ) : (
              <>
                {allFeedsCollection && allFeedsCollection.length > 0 ? (
                  <FlatList
                    horizontal
                    pagingEnabled
                    data={allFeedsCollection}
                    renderItem={({item, index}) => {
                      const i = index;
                      return (
                        <FlatList
                          ref={flatListRef}
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{flexGrow: 1}}
                          pagingEnabled
                          data={item}
                          windowSize={5}
                          maxToRenderPerBatch={5}
                          initialNumToRender={5}
                          removeClippedSubviews={true}
                          legacyImplementation={false}
                          renderItem={({item, index}) =>
                            renderItem(item, index, i)
                            // <RenderItem
                            //   item={item}
                            //   index={index}
                            //   videoRefs={videoRefs}
                            //   currentIndex={currentIndex}
                            //   paused={paused}
                            //   insect={insect}
                            //   handleBuffer={handleBuffer}
                            //   handleError={handleError}
                            //   handleReadyForDisplay={handleReadyForDisplay}
                            //   handleProgress={handleProgress}
                            //   handleSeek={handleSeek}
                            //   loading={loading}
                            //   navigation={navigation}
                            //   handleCommentPress={handleCommentPress}
                            //   userID={userID}
                            //   internetState={internetState}
                            //   setAllFeedsCollection={setAllFeedsCollection}
                            //   allFeedsCollection={allFeedsCollection}
                            //   clicked={clicked}
                            //   setClicked={setClicked}
                            //   setViewCounted={setViewCounted}
                            //   setCurrentPosition={setCurrentPosition}
                            //   onEnd={onEnd}
                            //   i={i}
                            //   currentRef={currentRef}
                            //   horizontalRef={horizontalRef}
                            // />
                          }
                          keyExtractor={(item, index) =>
                            item?.uri + item?.id + index.toString()
                          }
                          onViewableItemsChanged={onViewableItemsChanged}
                          extraData={allFeedsCollection}
                          viewabilityConfig={viewabilityConfig}
                          // initialScrollIndex={currentIndex}
                          // getItemLayout={getItemLayout}  // Provide layout data
                          onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve =>
                              setTimeout(resolve, 700),
                            );
                            wait.then(() => {
                              flatListRef.current?.scrollToIndex({
                                index: info.index,
                                animated: false,
                              });
                            });
                          }}
                        />
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewableHorizontalItemsChanged} // Detect horizontal scroll
                    viewabilityConfig={viewabilityConfig}
                  />
                ) : (
                  <Text>No Feeds</Text>
                )}
              </>
            )}
          </>
        )}
      </View>

      <TouchableOpacity
      onPress={()=>setShowCamera(!showCamera)}
        style={[
          styles.cameraButton,
          {bottom: insect.bottom + 80, zIndex: 1000, right: -20, backgroundColor:colors.white, borderRadius:100, paddingRight:10},
        ]}>
        <Icon
          name={showCamera?"chevron-forward":"chevron-back"}
          iconFamily="ionic"
          color={colors.black}
          size={20}
        />
      </TouchableOpacity>

    { showCamera&&  <TouchableOpacity
        onPress={() => {
          videoRefs?.current[currentIndex]?.pause();
          setPausedAll(true);
          // navigation.navigate('SnapCamera');
          navigation.reset({
            index: 1,
            routes: [{name: 'Drawer2'}, {name: 'SnapCamera'}],
          });
          // navigation.navigate('FeedsCamera');
          // navigation.replace('CapturedDataEdit', {thumbnail: "imageUrl", videoUrl: "file:///data/user/0/com.kenna/cache/e2f39e59-f580-4f75-815f-ec9700af4815/20240826_221120.mp4", result: "file", cat:"selectedData"});
        }}
        style={[
          styles.cameraButton,
          {bottom: insect.bottom + 80, zIndex: 1000, right: 50},
        ]}>
        <SvgObjPath2
          icon={svgobj2.camera}
          stroke1={colors.black}
          stroke2={colors.black}
        />
      </TouchableOpacity>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          stVis(false);
          {
            isReply ? setReplyMessage('') : setCommentMessage('');
          }
          if (isRecordings.current) {
            onStopRecord(setIsRecording, setRecordedFile);
            setIsRecording(false);
            setRecordedFile('');
            isRecordings.current = false;
          }
          setModalVisible(false);
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modal}>
            <View style={styles.modalContentContainer}>
              <TouchableOpacity
                hitSlop={10}
                onPress={() => {
                  stVis(false);
                  {
                    isReply ? setReplyMessage('') : setCommentMessage('');
                  }
                  if (isRecordings.current) {
                    onStopRecord(setIsRecording, setRecordedFile);
                    setIsRecording(false);
                    setRecordedFile('');
                    isRecordings.current = false;
                  }
                  setModalVisible(false);
                }}
                style={styles.closeModal}>
                <Icon
                  name={'close'}
                  iconFamily={'ionIcons'}
                  size={25}
                  color={colors.black}
                />
              </TouchableOpacity>
              {comments.length > 0 ? (
                <FlatList
                  data={comments}
                  style={{padding: 10}}
                  windowSize={3}
                  maxToRenderPerBatch={2}
                  initialNumToRender={2}
                  removeClippedSubviews={true}
                  legacyImplementation={false}
                  renderItem={({item, index}) => (
                    <RenderCommentItem
                      comment={item}
                      commentIndex={index}
                      userID={userID}
                      internetState={internetState}
                      setAllFeedsCollection={setAllFeedsCollection}
                      allFeedsCollection={allFeedsCollection}
                      handleReplyPress={handleReplyPress}
                      selectedItem={selectedItem}
                      modalVisible={vis}
                      currentIndex={currentIndex}
                      currentHorizontalIndex={currentHorizontalIndex}
                    />
                  )}
                  keyExtractor={(comment, index) => index.toString()}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: colors.black}}>No Comment Yet!</Text>
                </View>
              )}
              {showCam && (
                <View style={styles.preview}>
                  <RNCamera
                    ref={cameraRef}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    captureAudio={true}>
                    {!recording && <Text>Record Reaction</Text>}
                  </RNCamera>
                </View>
              )}
              <View style={styles.divider} />
              <View style={styles.writeCommentContainer}>
                <Image
                  style={{height: 40, width: 40, borderRadius: 20}}
                  source={require('../../assets/images/user1.png')}
                />

                <View style={styles.commentElements}>
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
                        ref={commentInputRef}
                        placeholder="Add comments..."
                        style={{color: colors.black, width: '80%', flex: 1}}
                        placeholderTextColor={colors.textPlaceholder}
                        onChangeText={
                          isReply
                            ? text => {
                                setReplyMessage(text);
                              }
                            : text => setCommentMessage(text)
                        }
                        onSubmitEditing={() => Keyboard.dismiss()}
                        value={isReply ? replyMessage : commentMessage}
                        onFocus={() => {
                          showCam ? setShowCam(false) : console.log('false');
                        }}
                      />
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name={'emoji-emotions'}
                          iconFamily={'material'}
                          size={30}
                          color={colors.black}
                        />
                        <Image
                          style={{height: 30, width: 30, marginHorizontal: 5}}
                          source={require('../../assets/icons/upload.png')}
                        />
                        {!recording && (
                          <TouchableOpacity
                            onPress={startRecording}
                            // hitSlop={20}
                          >
                            <Icon
                              name="play"
                              iconFamily="antDesign"
                              size={25}
                              color={colors.black}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  )}
                </View>
                {commentMessage || replyMessage || isRecordings.current ? (
                  <TouchableOpacity
                    hitSlop={10}
                    onPress={async () => {
                      let time = new Date().getTime();
                      let mediaUrl: any = null;
                      if (isRecordings.current) {
                        isRecordings.current = false;
                        const file = await onStopRecord(
                          setIsRecording,
                          setRecordedFile,
                        );
                        const url = await uploadMedia(file, time);
                        mediaUrl = url.downloadUrl;
                      }
                      isReply
                        ? handleAddReply(
                            replyMessage,
                            allFeedsCollection,
                            selectedItem,
                            replyCommentIndex,
                            userID,
                            setAllFeedsCollection,
                            setComments,
                            setReplyMessage,
                            internetState,
                            null,
                            mediaUrl,
                            currentIndex,
                            currentHorizontalIndex,
                          )
                        : handleAddComment(
                            commentMessage,
                            userID,
                            selectedItem,
                            allFeedsCollection,
                            setAllFeedsCollection,
                            setComments,
                            setCommentMessage,
                            internetState,
                            isRecordings.current,
                            mediaUrl,
                            currentIndex,
                            currentHorizontalIndex,
                          );
                    }}>
                    <SVG
                      icon={svg.send}
                      height={24}
                      width={24}
                      color={colors.black}
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
                      color={colors.black}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <MyCustomTabBar top={0.00001} activeTab={3} />
    </SafeAreaView>
  );
};

export default Feeds;
