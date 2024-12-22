import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Modal,
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StatusBar,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import Icon from '../../components/customIcon/CustomIcon';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {
  height,
  width,
} from '../../components/functions/GlobalFunctions';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video';
import {SVG, SVG2, SvgObjPath1} from '../../components/svgs/SVG';
import {svg, svg2, svgobj1} from '../../assets/data/svgobj';
import {
  handleAddComment,
  handleAddReply,
  handleLikePress,
} from './FeedsHandlers';
import RenderCommentItem from './RenderCommentItem';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';

const Feeds = ({navigation}: any) => {
  const images = [
    {
      id: '1',
      uri: require('../../assets/images/reel1.jpg'),
      isFav: true,
      userName: 'john_doe',
      description: 'Exploring the beauty of nature 🌿🌄',
    },
    {
      id: '2',
      uri: require('../../assets/images/reel2.png'),
      isFav: false,
      userName: 'jane_smith',
      description: 'A moment from the weekend vibes ✨',
    },
    {
      id: '3',
      uri: require('../../assets/images/reelsBg.jpg'),
      isFav: true,
      userName: 'alex_travels',
      description: 'Sunset views from my recent trip 🏝️🌅',
    },
  ];

  const profile = useSelector((state: any) => state.profile).data;
  // State to manage modal visibility and selected comments
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [allFeedsCollection, setAllFeedsCollection] = useState([]);
  const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(0); // Horizontal index
  const [videoIndex, setVideoIndex]: any = useState([
    {horizontal: 0, vertical: 0},
  ]); // Horizontal index
  const currentRef = useRef(0);
  const horizontalRef = useRef(0);

  useEffect(() => {
    getAllFeedsData();
  }, []);
  const getAllFeedsData = async () => {
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
      setAllFeedsCollection(allData);
    } catch (error) {
      console.log('Error fetching feeds:', error);
    }
  };
  console.log(insets);

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
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Adjust this if needed
  };
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
        />
      );
    },
    [currentRef, horizontalRef, insets, allFeedsCollection],
  );

  // Sample comments data
  const commentsData: any = {
    '1': [
      {id: '1', text: 'Awesome reel!', name: 'Sara'},
      {
        id: '2',
        name: 'Ashley',
        text: 'Great picture!',
        reply: [{id: '1', text: 'Awesome reel!', name: 'Sara'}],
      },
    ],
    '2': [{id: '1', text: 'Great picture!', name: 'Sara'}],
    '3': [
      {id: '1', text: 'Wow, this is amazing!', name: 'Billie'},
      {id: '2', text: 'So cool!', name: 'Rishi'},
    ],
  };

  const openComments = (id: string) => {
    setCurrentComments(commentsData[id] || []);
    setCommentsVisible(true);
  };

  const closeComments = () => {
    setCommentsVisible(false);
    setCurrentComments([]);
  };

  // const renderItem = ({item}: any) => (
  //   <View style={[styles.imageContainer,{bottom: insect.bottom,}]}>
  //     <ImageBackground
  //       source={item.uri}
  //       style={styles.image}
  //       resizeMode="cover">
  //       <View
  //         style={{
  //           // padding: 10,
  //           alignSelf: 'flex-end',
  //           gap: 10,
  //         }}>
  //         <Image
  //           style={{
  //             height: 28,
  //             width: 28,
  //             borderRadius: 20,
  //             borderWidth: 2,
  //             borderColor: colors.white,
  //           }}
  //           source={require('../../assets/images/profile.png')}
  //         />
  // <View>
  //   <Icon
  //     iconFamily="ionic"
  //     name="shuffle-outline"
  //     size={24}
  //     color={colors.white}
  //   />
  // </View>
  // <View>
  //   <Icon
  //     iconFamily="SimpleLineIcons"
  //     name="heart"
  //     size={24}
  //     color={colors.white}
  //   />

  //   <Text style={{color: colors.white}}>34k</Text>
  // </View>
  // <TouchableOpacity onPress={() => openComments(item.id)}>
  //   <Icon
  //     iconFamily="feather"
  //     name="message-circle"
  //     size={24}
  //     color={colors.white}
  //   />
  //   <Text style={{color: colors.white}}>102</Text>
  // </TouchableOpacity>
  //   <View>
  //     {item.isFav ? (
  //       <Image
  //         style={{height: 24, width: 24}}
  //         tintColor={colors.white}
  //         source={require('../../assets/icons/fav.png')}
  //       />
  //     ) : (
  //       <Image
  //         style={{height: 24, width: 24}}
  //         tintColor={colors.white}
  //         source={require('../../assets/icons/fav1.png')}
  //       />
  //     )}
  //   </View>
  // </View>
  // <View style={{position:'absolute', bottom:100, left:20,flexDirection:"row", alignItems:'center'}}>
  // <Image source={require('../../assets/images/profile.png')} style={{height:35, width:35, borderRadius:35, borderWidth:2, borderColor: colors.darkBlue}}/>
  // <View style={{ marginLeft:10, marginTop:20, width:'80%'}}>
  //   <Text style={{color:colors.white}}>@{item.userName}</Text>
  //   <Text numberOfLines={2} style={{color:colors.white}}>{item.description} #reels #myvideo #fun #sports #goals etc </Text>
  // </View>
  // </View>
  //     </ImageBackground>
  //   </View>
  // );

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <FlatList
        data={images}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={styles.list}
      /> */}
      <View style={{flex: 1, backgroundColor: colors.darkGreay}}>
        <FlatList
          data={allFeedsCollection}
          renderItem={({item, index}: any) =>
            // <RenderItem item={item} index={index} i={i} currentRef={currentRef} horizontalRef={horizontalRef} insets={insets}/>
            renderItem(item, index, 0)
          }
          keyExtractor={(item: any) => item?.uri + item?.index}
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
      </View>

      {/* Comments Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentsVisible}
        onRequestClose={closeComments}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeComments}>
                <Icon
                  name={'close'}
                  iconFamily="antDesign"
                  size={15}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              contentContainerStyle={{gap: 10}}
              data={currentComments}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}: any) => (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Profile')}>
                      <Image
                        style={{height: 40, width: 40, borderRadius: 40}}
                        source={require('../../assets/images/profile.png')}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        marginLeft: 10,
                      }}>
                      <Text style={styles.commentText}>{item.name}</Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  </View>
                  {item.reply && (
                    <>
                      <View
                        style={{
                          marginTop: 10,
                          marginLeft: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{height: 30, width: 30, borderRadius: 40}}
                          source={require('../../assets/images/profile.png')}
                        />
                        {/* FlatList main reolies aany thy  */}
                        <View style={{marginLeft: 10}}>
                          <Text style={styles.commentText}>
                            {item.reply[0]?.name}
                          </Text>
                          <Text style={styles.commentText}>
                            {item.reply[0]?.text}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.commentText,
                          {marginLeft: 110, color: colors.blueText},
                        ]}>
                        see more replies
                      </Text>
                    </>
                  )}
                </>
              )}
            />
          </View>
        </View>
      </Modal>
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
  }: any) => {
    const uid = auth()?.currentUser?.uid;
    const navigation: any = useNavigation();
    const [recordedFile, setRecordedFile] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const isRecordings: any = useRef(false);
    const [liked, setLiked] = useState(item?.liked ?? false);
    const [fav, setfav] = useState(item?.fav ?? false);
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
          height: height - insets.top - insets.bottom,
        }}>
        <VideoPlayer
          controlsStyles={{}}
          source={{uri: item?.uri}}
          resizeMode={'cover'}
          style={{
            width: width,
            height: height - insets.top - insets.bottom,
            // backgroundColor: 'red',
          }}
          repeat={false}
          paused={!isCurrentVideo}
          onError={error => console.error('Video error:', error)}
          controls={false}
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
        <View style={styles.rightContent}>
          <View />
          <View style={styles.likeCommentContainer}>
            <TouchableOpacity
              disabled
              onPress={() => {
                // videoRefs?.current[currentIndex]?.pause();
                // navigation.navigate('FeedsUserProfile');
              }}
              style={styles.profileIconWrapper}>
              <Image
                style={{
                  height: 28,
                  width: 28,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
                source={
                  item?.pic
                    ? {uri: item.pic}
                    : require('../../assets/images/profile.png')
                }
              />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon
                iconFamily="ionic"
                name="shuffle-outline"
                size={24}
                color={colors.white}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleLikePress(
                  item,
                  allFeedsCollection,
                  setAllFeedsCollection,
                  uid,
                  true,
                  currentHorizontalIndex,
                  setLiked,
                );
              }}
              style={styles.iconContainer}>
              <Icon
                iconFamily="SimpleLineIcons"
                name="heart"
                size={24}
                color={item?.liked ? colors.red : colors.white}
              />
              <Text style={{color: colors.white}}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                // openComments(item.id)
              }}
              style={styles.iconContainer}>
              <Icon
                iconFamily="feather"
                name="message-circle"
                size={24}
                color={colors.white}
              />
              <Text style={{color: colors.white}}>{commentCount}</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              {item.isFav ? (
                <Image
                  style={{height: 24, width: 24}}
                  tintColor={colors.white}
                  source={require('../../assets/icons/fav.png')}
                />
              ) : (
                <Image
                  style={{height: 24, width: 24}}
                  tintColor={colors.white}
                  source={require('../../assets/icons/fav1.png')}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await Share.open({
                    title: 'Share this video',
                    message: `${item?.uri}`,
                    // Optionally, add other parameters like `subject` or `social`
                  });
                } catch (error) {
                  console.log('Error', error);
                }
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
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={
              item?.pic
                ? {uri: item.pic}
                : require('../../assets/images/profile.png')
            }
            style={{
              height: 35,
              width: 35,
              borderRadius: 35,
              borderWidth: 2,
              borderColor: colors.darkBlue,
            }}
          />
          <View style={{marginLeft: 10, marginTop: 20, width: '80%'}}>
            <Text style={{color: colors.white}}>@{item?.name ?? ''}</Text>
            <Text numberOfLines={2} style={{color: colors.white}}>
              {item?.tittle ?? ''} #reels #myvideo #fun #sports #goals etc{' '}
            </Text>
          </View>
        </View>
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
                            source={require('../../assets/images/upload.png')}
                          />
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
                        console.log('Is Reply is', allFeedsCollection.length);

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
                              mediaUrl,
                              isRecordings.current,
                              currentIndex,
                              currentHorizontalIndex,
                            )
                          : // sendReply(
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

export default Feeds;
