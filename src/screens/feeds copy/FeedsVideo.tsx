import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TextInput,
  Keyboard,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import firestore from '@react-native-firebase/firestore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import auth from '@react-native-firebase/auth';
import { colors } from '../../assets/data/colors';
import { 
  handleAddComment,
  handleAddReply,
  handleLikePress,
} from './FeedsHandlers';
// import {
//   uploadMedia,
//   uploadMediaToFirestore,} from '../../assets/data/TypeScript';
// import { 
//   checkPermission,
//   onStopRecord,
//  } from '../chatScreen/functions';
 import Share from 'react-native-share';
 import {useIsFocused, useNavigation} from '@react-navigation/native';
// import { svg } from '../../assets/data/svg';
import { svg, svg2, svgobj1, svgobj2 } from '../../assets/data/svgobj';
import Icon from '../../components/customIcon/CustomIcon';
// import { svg2 } from '../../assets/data/svg1';
import RenderCommentItem from './RenderCommentItem';
// import { shareUrl } from '../../assets/data/ApiKeys';
import { uploadMedia, uploadMediaToFirestore } from '../../components/functions/GlobalFunctions';
import { SVG, SVG2, SvgObjPath1, SvgObjPath2 } from '../../components/svgs/SVG';
const {width, height} = Dimensions.get('window');

export const VideoList = ({navigation, route}: any) => {
  const uid = auth()?.currentUser?.uid;
  const profile = useSelector((state: any) => state.profile).data;
  // const profile: any = p.data; // Define your grouped categories
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
  const {profileFeedsData, selectedProfileFeedIndex} = route?.params || {};
  const insets = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef: any = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [vis, stVis] = useState(false);
  const flatListRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [allFeedsCollection, setAllFeedsCollection] = useState([]);
  const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(0); // Horizontal index
  const [videoIndex, setVideoIndex]: any = useState([
    {horizontal: 0, vertical: 0},
  ]); // Horizontal index
  const [pausedAll, setPausedAll] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const currentRef = useRef(0);
  const horizontalRef = useRef(0);

  useEffect(() => {
    getAllFeedsData();
  }, []);

  const getAllFeedsData = async () => {
    // Define your grouped categories
    const categoryGroups = [
      [],
      ['Football', 'Athletic', 'Fitness', 'CrossFit', 'Running'],
      ['Dately', 'Friends', 'Groups'],
      ['Streaming', 'Gaming', 'Podcast', 'E-Gaming', 'Music'],
      ['Network', 'Job Listing', 'Alerts', 'Career Advice'],
      ['Sight seeing', 'Art', 'Literature', 'Movie', 'Language'],
    ]; // Initialize the categorized feeds
    const categorizedFeeds: any = Array.from(
      {length: categoryGroups.length},
      () => [],
    );

    try {
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
                  (video: any) =>
                    video.id === doc.id && video.index === index && video.liked,
                )
              : false;
            const updatedComments = feed.comments.map(
              (comment: any, commentIndex: any) => {
                const commentLiked = profile?.likedVideos
                  ? profile?.likedVideos.some((video: any) =>
                      video.id === doc.id &&
                      video.index === index &&
                      video?.likedComments
                        ? video?.likedComments.some(
                            (likedComment: any) =>
                              likedComment.commentIndex === commentIndex &&
                              likedComment.commentLiked,
                          )
                        : false,
                    )
                  : false;
                const updatedReplies = comment.reply.map(
                  (reply: any, replyIndex: any) => {
                    const replyLiked = profile?.likedVideos
                      ? profile?.likedVideos.some((video: any) =>
                          video.id === doc.id &&
                          video.index === index &&
                          video?.likedComments
                            ? video?.likedComments.some((likedComment: any) =>
                                likedComment.commentIndex === commentIndex &&
                                likedComment?.likedReplies
                                  ? likedComment.likedReplies.some(
                                      (likedReply: any) =>
                                        likedReply.replyIndex === replyIndex &&
                                        likedReply.replyLiked,
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
      allData.forEach((feed: any) => {
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
    } catch (error) {
      console.log('Error fetching feeds:', error);
    }
  };
  // Handle viewable items changed
  const onViewableItemsChanged = useCallback(
    ({viewableItems}: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== null && newIndex !== currentVideoIndex) {
          setCurrentVideoIndex(newIndex);
          currentRef.current = newIndex;
        }
      }
    },
    [currentVideoIndex],
  );
  const onViewableHorizontalItemsChanged = useCallback(
    ({viewableItems}: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== null && newIndex !== currentHorizontalIndex) {
          const cvi = currentRef.current;
          let pvi = -1;
          // console.log(
          //   'Current Horizontal Index:',
          //   currentHorizontalIndex,
          //   'Current video Index:',
          //   currentVideoIndex,
          //   'The New Horizontal index',
          //   newIndex,
          // );
          const updatedIndexArray = videoIndex.map(
            (item: {horizontal: number; vertical: number}) => {
              // console.log(item.horizontal, currentHorizontalIndex);

              if (item.horizontal === currentHorizontalIndex) {
                // console.log('Hurrah Matched', cvi);
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
          // console.log("Updated Idnex Array",updatedIndexArray);
          if (!indexExists) {
            setVideoIndex([
              ...updatedIndexArray,
              {horizontal: newIndex, vertical: 0},
            ]); // Update the horizontal index
            currentRef.current = 0;
          } else {
            // Set the updated array if the index exists
            setVideoIndex(updatedIndexArray);
            if (pvi !== -1) {
              currentRef.current = pvi;
            } else {
              currentRef.current = 0;
            }
          }
          setCurrentHorizontalIndex(newIndex); // Update the horizontal index
          horizontalRef.current = newIndex;
        }
      }
    },
    [currentHorizontalIndex],
  );
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Adjust this if needed
  };
  useEffect(() => {
    // console.log("The Video Index",videoIndex);
  }, [videoIndex]);

  function sendReply(
    replyMessage: any,
    item: any,
    replyCommentIndex: any,
    uid: any,
    setComments: any,
    setReplyMessage: any,
    uri: any,
    isRecordings: any,
    currentIndex: any,
    currentHorizontalIndex: any,
  ) {
    console.log(replyMessage, item, replyCommentIndex, uid, uri, isRecording, currentIndex, currentHorizontalIndex);
    
    // handleAddReply(
    //   replyMessage,
    //   allFeedsCollection,
    //   item,
    //   replyCommentIndex,
    //   uid,
    //   setAllFeedsCollection,
    //   setComments,
    //   setReplyMessage,
    //   true,
    //   uri,
    //   isRecording,
    //   currentIndex,
    //   currentHorizontalIndex,
    // );
  }
  function sendComment(
    commentMessage: any,
    uid: any,
    item: any,
    setComments: any,
    setCommentMessage: any,
    isRecordings: any,
    uri: any,
    currentIndex: any,
    currentHorizontalIndex: any,
    indexOfF: any,
  ) {
    console.log(allFeedsCollection.length);
    
    // console.log(commentMessage, uid, item, isRecordings, uri, currentIndex, currentHorizontalIndex, indexOfF);
    // handleAddComment(
    //   commentMessage,
    //   uid,
    //   item,
    //   allFeedsCollection,
    //   setAllFeedsCollection,
    //   setComments,
    //   setCommentMessage,
    //   true,
    //   isRecordings,
    //   uri,
    //   currentIndex,
    //   currentHorizontalIndex,
    //   indexOfF,
    // );
  }

  // const renderItem = (item: any, index: any, i: any) => {
  //   const isCurrentVideo = index === currentRef.current && i === horizontalRef.current
  //   console.log(currentRef.current, horizontalRef.current);
  //   return (
  //     <View
  //       style={{
  //         width: width,
  //         height: height-StatusBar?.currentHeight??0 - insets.top - insets.bottom,
  //         backgroundColor: 'red',
  //       }}>
  //       <VideoPlayer
  //         source={{uri: item?.uri}}
  //         resizeMode={'cover'}
  //         style={{
  //           width: width,
  //           height: height-StatusBar?.currentHeight??0 - insets.top - insets.bottom,
  //           backgroundColor: 'red',
  //         }}
  //         repeat={true}
  //         paused={!isCurrentVideo}
  //         onError={error => console.error('Video error:', error)}
  //         controls
  //         bufferConfig={{
  //           // minBufferMs: 15000,
  //           // maxBufferMs: 30000,
  //           // bufferForPlaybackMs: 1500,
  //           // bufferForPlaybackAfterRebufferMs: 3000,
  //           minBufferMs: 5000,
  //           maxBufferMs: 10000,
  //           bufferForPlaybackMs: 500,
  //           bufferForPlaybackAfterRebufferMs: 1000,
  //           cacheSizeMB:20,
  //         }}

  //       />
  //     </View>
  //   );
  // };
  const renderItem = useCallback(
    (item: any, index: any, i: any) => {
      const isCurrentVideo =
        index === currentRef.current && i === horizontalRef.current;
      return (
        <RenderItem
          item={item}
          indexOfF={index}
          i={i}
          currentRef={currentRef}
          horizontalRef={horizontalRef}
          insets={insets}
          isCurrentVideo={isCurrentVideo}
          allFeedsCollection={allFeedsCollection}
          setAllFeedsCollection={setAllFeedsCollection}
          currentHorizontalIndex={currentHorizontalIndex}
          currentIndex={isCurrentVideo}
          sendReply={sendReply}
          sendComment={sendComment}
        />
      );
    },
    [currentRef, horizontalRef, insets, allFeedsCollection],
  );
  console.log(allFeedsCollection.length);
  
  // useEffect(() => {
  //   if (allFeedsCollection.length > 0) {
  //     console.log(allFeedsCollection);

  //     // console.log(allFeedsCollection[0]);
  //     // console.log(allFeedsCollection[0][6]);
  //     // console.log(allFeedsCollection[0][7]);
  //     // console.log(allFeedsCollection[0][8]);
  //     // console.log(allFeedsCollection[0][9]);
  //     // console.log(allFeedsCollection[0][10]);
  //     // console.log(allFeedsCollection[0][11]);
  //     // console.log(allFeedsCollection[0][12]);
  //   }
  // }, [allFeedsCollection]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: colors.darkGreay}}>
        <FlatList
          horizontal
          pagingEnabled
          data={allFeedsCollection}
          renderItem={({item, index}) => {
            const i = index;
            return (
              <FlatList
                key={index.toString()}
                data={item}
                renderItem={({item, index}) =>
                  // <RenderItem item={item} index={index} i={i} currentRef={currentRef} horizontalRef={horizontalRef} insets={insets}/>
                  renderItem(item, index, i)
                }
                keyExtractor={item => item?.uri + item?.index}
                scrollEventThrottle={16}
                ref={flatListRef}
                pagingEnabled={true} // Adjust this if you want smooth scrolling
                // initialScrollIndex={currentVideoIndex}
                initialNumToRender={3} // Increase the number of items rendered initially
                maxToRenderPerBatch={5} // Increase this if needed
                windowSize={5} // Increase window size for better scrolling
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                removeClippedSubviews={true} // Disable this for better scroll performance
                legacyImplementation={false}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true} // Disable this for better scroll performance
          onViewableItemsChanged={onViewableHorizontalItemsChanged} // Detect horizontal scroll
          viewabilityConfig={viewabilityConfig}
        />
      </View>
      <TouchableOpacity
        onPress={() => setShowCamera(!showCamera)}
        style={[
          styles.cameraButton,
          {
            bottom: insets.bottom + 80,
            zIndex: 1000,
            right: -20,
            backgroundColor: colors.white,
            borderRadius: 100,
            paddingRight: 10,
          },
        ]}>
        <Icon
          name={showCamera ? 'chevron-forward' : 'chevron-back'}
          iconFamily="ionic"
          color={colors.black}
          size={20}
        />
      </TouchableOpacity>
      {showCamera && (
        <TouchableOpacity
          onPress={() => {
            // videoRefs?.current[currentIndex]?.pause();
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
            {bottom: insets.bottom + 80, zIndex: 1000, right: 50},
          ]}>
          <SvgObjPath2
            icon={svgobj2.camera}
            stroke1={colors.black}
            stroke2={colors.black}
          />
        </TouchableOpacity>
      )}
      {/*<MyCustomTabBar top={0.00001} activeTab={3} />*/}
    </SafeAreaView>
  );
};

export const RenderItem = React.memo(
  ({
    item,
    indexOfF,
    i,
    currentRef,
    horizontalRef,
    insets,
    isCurrentVideo,
    setAllFeedsCollection,
    allFeedsCollection,
    currentHorizontalIndex,
    currentIndex,
    sendReply,
    sendComment,
  }: any) => {

    const uid = auth()?.currentUser?.uid;
    const navigation: any = useNavigation();
    const [recordedFile, setRecordedFile] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const isRecordings: any = useRef(false);
    const [liked, setLiked] = useState(item?.liked ?? false);
    const [stop, setStop] = useState(false);
    const [replyCommentIndex, setReplyCommentIndex] = useState(null);
    const commentCount = item.comments ? item.comments.length : 0;
    //When We click reply button on a comments section
    const [vis, stVis] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [commentMessage, setCommentMessage] = useState('');
    const [isReply, setIsReply] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(false);
    const [showCam, setShowCam] = useState(false);
    const cameraRef: any = useRef(null);
    const opacity = useRef(new Animated.Value(1)).current;
    const commentInputRef = useRef<TextInput>(null);
    const [progress, setProgress] = useState(0);
    const [comments, setComments] = useState([]);
    const handleReplyPress = (commentIndex: any) => {
      console.log(commentIndex);

      setReplyCommentIndex(commentIndex);
    };
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
                item,
                replyCommentIndex,
                uid,
                setAllFeedsCollection,
                setComments,
                setReplyMessage,
                true,
                result?.uri,
                isRecordings.current,
                currentIndex,
                currentHorizontalIndex, 
              )
            : handleAddComment(
                commentMessage,
                uid,
                item,
                allFeedsCollection,
                setAllFeedsCollection,
                setComments,
                setCommentMessage,
                true,
                result?.uri,
                isRecordings.current,
                currentIndex,
                currentHorizontalIndex,
                indexOfF
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
    useEffect(() => {
      if (replyCommentIndex !== null) {
        setIsReply(true);
        commentInputRef.current?.focus();
      }
    }, [replyCommentIndex]);
    return (
      <View
        style={{
          width: width,
          height: height - insets.top - insets.bottom - 70,
        }}>
        <VideoPlayer
          source={{uri: item?.uri}}
          resizeMode={'cover'}
          style={{
            width: width,
            height: height - insets.top - insets.bottom - 70,
            // backgroundColor: 'red',
          }}
          repeat={true}
          paused={!isCurrentVideo}
          onError={error => console.error('Video error:', error)}
          controls
          bufferConfig={{
            // minBufferMs: 15000,
            // maxBufferMs: 30000,
            // bufferForPlaybackMs: 1500,
            // bufferForPlaybackAfterRebufferMs: 3000,
            minBufferMs: 5000,
            maxBufferMs: 10000,
            bufferForPlaybackMs: 500,
            bufferForPlaybackAfterRebufferMs: 1000,
            // cacheSizeMB:20,
          }}
        />
        {/* {loading && index === currentIndex && (
          <ActivityIndicator
            size="large"
            color={colors.red}
            style={styles.loadingIndicator}
          />
        )} */}
        {
          <View style={styles.rightContent}>
            <View />
            <View style={styles.likeCommentContainer}>
              {i !== 0 && (
                <View
                  style={{
                    backgroundColor: colors.white,
                    height: 40,
                    width: 40,
                    marginBottom: 20,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: colors.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {i === 1 ? (
                    <SvgObjPath1 icon={svgobj1.sports} stroke={colors.black} />
                  ) : i === 2 ? (
                    <SvgObjPath1
                      icon={svgobj1.connections}
                      stroke={colors.black}
                    />
                  ) : i === 3 ? (
                    <SvgObjPath1
                      icon={svgobj1.creative}
                      stroke={colors.black}
                    />
                  ) : i === 4 ? (
                    <SvgObjPath1
                      icon={svgobj1.workspace1}
                      stroke={colors.black}
                    />
                  ) : (
                    i === 5 && (
                      <SvgObjPath1
                        icon={svgobj1.culture1}
                        stroke={colors.black}
                      />
                    )
                  )}
                </View>
              )}
              <View style={styles.profileIconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    // videoRefs?.current[currentIndex]?.pause();
                    navigation.navigate('FeedsUserProfile');
                  }}
                  style={styles.profileIconWrapper}>
                  <Image
                    style={styles.profileIcon}
                    source={require('../../assets/images/Vprofile.png')}
                  />
                </TouchableOpacity>
                <View style={styles.badge}>
                  <Icon name={'plus'} color={colors.white} size={10} />
                </View>
                <Text style={styles.addText}>Add</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.iconContainer}>
                <Icon
                  name={'message-processing'}
                  color={colors.white}
                  size={30}
                />
                <Text style={styles.commentText}>{commentCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleLikePress(
                    item,
                    allFeedsCollection,
                    setAllFeedsCollection,
                    uid,
                    true,
                    currentHorizontalIndex,
                    setLiked,
                  )
                }
                style={[
                  styles.iconContainer,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                {[
                  'Football',
                  'Athletic',
                  'Fitness',
                  'CrossFit',
                  'Running',
                ].includes(item?.cat) ? (
                  <SVG
                    icon={svg.dumbell}
                    color={liked ? colors.red : colors.white}
                    height={24}
                    width={36}
                  />
                ) : [
                    'Streaming',
                    'Gaming',
                    'Podcast',
                    'E-Gaming',
                    'Music',
                  ].includes(item?.cat) ? (
                  <SvgObjPath1
                    icon={svgobj1.sports}
                    stroke={liked ? colors.red : colors.white}
                  />
                ) : ['Dately', 'Friends', 'Groups'].includes(item?.cat) ? (
                  <SvgObjPath1
                    icon={svgobj1.culture1}
                    stroke={liked ? colors.red : colors.white}
                  />
                ) : [
                    'Network',
                    'Job Listing',
                    'Alerts',
                    'Career Advice',
                  ].includes(item?.cat) ? (
                  <SvgObjPath1
                    icon={svgobj1.creative1}
                    stroke={liked ? colors.red : colors.white}
                  />
                ) : [
                    'Sight seeing',
                    'Art',
                    'Literature',
                    'Movie',
                    'Language',
                  ].includes(item?.cat) ? (
                  <SvgObjPath1
                    icon={svgobj1.workspace1}
                    stroke={liked ? colors.red : colors.white}
                  />
                ) : (
                  <SVG2
                    icon={svg2.broken}
                    height={35}
                    width={36}
                    col={liked ? colors.red : colors.white}
                  />
                )}
                <Text style={styles.likeText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  // try {
                  //   await Share.open({
                  //     title: 'Share this video',
                  //     message: `${shareUrl}video?uid=${item?.id}&index=${item.index}`,
                  //     // Optionally, add other parameters like `subject` or `social`
                  //   });
                  // } catch (error) {
                  //   console.log('Error', error);
                  // }
                }}
                style={styles.iconContainer}>
                <Icon
                  name={'share'}
                  iconFamily={'entypo'}
                  color={colors.white}
                  size={30}
                />
                <Text style={styles.shareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 50, width: 50}}></View>
          </View>
        }

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            stVis(false);
            {
              isReply ? setReplyMessage('') : setCommentMessage('');
            }
            // if (isRecordings.current) {
            //   onStopRecord(setIsRecording, setRecordedFile);
            //   setIsRecording(false);
            //   setRecordedFile('');
            //   isRecordings.current = false;
            // }
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
                    // if (isRecordings.current) {
                    //   onStopRecord(setIsRecording, setRecordedFile);
                    //   setIsRecording(false);
                    //   setRecordedFile('');
                    //   isRecordings.current = false;
                    // }
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
                {item?.comments.length > 0 ? (
                  <FlatList
                    data={item?.comments}
                    style={{padding: 10}}
                    windowSize={3}
                    maxToRenderPerBatch={2}
                    initialNumToRender={2}
                    removeClippedSubviews={true}
                    legacyImplementation={false}
                    
                    renderItem={({item: comment, index}) => (
                      <RenderCommentItem
                        comment={comment}
                        commentIndex={index}
                        userID={item?.id}
                        internetState={true}
                        setAllFeedsCollection={setAllFeedsCollection}
                        allFeedsCollection={allFeedsCollection}
                        handleReplyPress={handleReplyPress}
                        selectedItem={item}
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
                            // onStopRecord(setIsRecording, setRecordedFile);
                            // setIsRecording(false);
                            // setRecordedFile('');
                            // isRecordings.current = false;
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
                        // if (isRecordings.current) {
                        //   isRecordings.current = false;
                        //   const file = await onStopRecord(
                        //     setIsRecording,
                        //     setRecordedFile,
                        //   );
                        //   const url = await uploadMedia(file, time);
                        //   mediaUrl = url.downloadUrl;
                        // }
                        console.log("Is Reply is", allFeedsCollection.length);
                        
                        isReply
                          ? 
                          handleAddReply(
                                replyMessage,
                                allFeedsCollection,
                                item,
                                replyCommentIndex,
                                uid,
                                setAllFeedsCollection,
                                setComments,
                                setReplyMessage,
                                true,
                                mediaUrl,
                                isRecordings.current,
                                currentIndex,
                                currentHorizontalIndex,
                              )
                          // sendReply(
                          //     replyMessage,
                          //     item,
                          //     replyCommentIndex,
                          //     uid,
                          //     setComments,
                          //     setReplyMessage,
                          //     mediaUrl,
                          //     isRecordings.current,
                          //     currentIndex,
                          //     currentHorizontalIndex,
                          //   )
                          : 
                            // sendComment(
                            //   commentMessage,
                            //   uid,
                            //   item,
                            //   setComments,
                            //   setCommentMessage,
                            //   isRecordings.current,
                            //   mediaUrl,
                            //   currentIndex,
                            //   currentHorizontalIndex,
                            //   indexOfF,
                            // );
                        handleAddComment(
                          commentMessage,
                          uid,
                          item,
                          allFeedsCollection,
                          setAllFeedsCollection,
                          setComments,
                          setCommentMessage,
                          true,
                          mediaUrl,
                          isRecordings.current,
                          currentIndex,
                          currentHorizontalIndex,
                          indexOfF,
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
                        // isRecordings.current = true;
                        // checkPermission(setIsRecording);
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
      </View>
    );
  },
);
