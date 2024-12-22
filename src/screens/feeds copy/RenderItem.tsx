import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {colors} from '../../assets/data/colors';
import Icon from '../../components/customIcon/CustomIcon';
import {handleLikePress} from './FeedsHandlers';
import {styles} from './styles';
import { SVG, SVG2, SvgObjPath1 } from '../../components/svg/SVG';
import { svg } from '../../assets/data/svg';
import { svg2 } from '../../assets/data/svg1';
import Share from 'react-native-share';
import { svgobj1 } from '../../assets/data/svgobj';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import { shareUrl } from '../../assets/data/ApiKeys';

const RenderItem = ({
  item,
  index,
  videoRefs,
  currentIndex,
  paused,
  insect,
  handleBuffer,
  handleError,
  handleReadyForDisplay,
  handleProgress,
  handleSeek,
  loading,
  navigation,
  handleCommentPress,
  userID,
  internetState,
  setAllFeedsCollection,
  allFeedsCollection,
  clicked,
  setClicked,
  setViewCounted,
  setCurrentPosition,
  onEnd,isCurrentVideo,currentHorizontalIndex,i,pausedAll,highLight
}: any) => {
  const uid = auth().currentUser?.uid
  // const [user, setUser] = useState(null);
  // const [loading1, setLoading] = useState(false);
  const ref = useRef(false)
  const [liked, setLiked] = useState(item?.liked ?? false)
  const [stop, setStop] = useState(false);
  const commentCount = item.comments ? item.comments.length : 0;
  // useEffect(() => {
  //   if (index === currentIndex) {
  //     setViewCounted(false);
  //     setCurrentPosition(0);
  //   }
  // }, [currentIndex, index]);
  //If video is downloading then it will buffer
  // const handleBuffer1 = useCallback(({ isBuffering }: any) => {
  //   ref.current = isBuffering;
  //   setLoading(isBuffering);
  // }, []);
  // useEffect(()=>{
  //   if(user === null && isCurrentVideo){
  //     console.log("Called");
      
  //     firestore().collection('users').doc(item?.id).get()
  //     .then((docSnapshot: any) => {
  //       if(docSnapshot.exists){
  //         if(isCurrentVideo){
  //           console.log(docSnapshot.data());
  //         }
  //        setUser(docSnapshot.data());
  //       }
  //     })
  //   }
  // },[])
  return (
    <View key={item.id} 
    style={{
      height:
        Dimensions.get('window').height - 70 - insect.bottom - insect.top,
      width: Dimensions.get('window').width,
      backgroundColor: colors.black,
    }}>
      <Video
        ref={ref => {
          videoRefs.current[index] = ref;
        }}
        source={{uri: item.uri}} 
        resizeMode="cover"
        style={{
          height:
            Dimensions.get('window').height - 70 - insect.bottom - insect.top,
          width: Dimensions.get('window').width,
          backgroundColor: colors.black,
        }}
        key={item.id}
        controls={true}
        paused={!isCurrentVideo || pausedAll || stop}
        // paused={index !== currentIndex || paused || stop}
        onBuffer={(isCurrentVideo || !pausedAll) ? handleBuffer : undefined}
        onReadyForDisplay={
          index === currentIndex ? handleReadyForDisplay : null
        }
        onError={index === currentIndex ? handleError : null}
        onProgress={index === currentIndex ? handleProgress : null}
        onSeek={index === currentIndex ? handleSeek : null}
        repeat={true}
        useTextureView={false}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 30000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
          cacheSizeMB:20,
        }}
        playInBackground={false}
        playWhenInactive={false}
        // onEnd={onEnd}
      />
      {ref.current && (isCurrentVideo || !pausedAll) && (
        // <ActivityIndicator
        //   size="large"
        //   color={colors.red}
        //   style={styles.loadingIndicator}
        // />
        <View style={styles.overlay} pointerEvents="none">
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      )}
      {!highLight&&<View style={styles.rightContent}>
        <View />
        <View style={styles.likeCommentContainer}>
         {i!==0 && <View style={{backgroundColor: colors.white, height: 40, width: 40, marginBottom:20, borderRadius:20,borderWidth: 2, borderColor: colors.black, justifyContent:'center', alignItems: 'center'}}>
            {
              i === 1 ?
              <SvgObjPath1 icon={svgobj1.sports} stroke={colors.black} />:
              i === 2 ? 
              <SvgObjPath1 icon={svgobj1.connections} stroke={colors.black} />:
              i === 3 ? 
              <SvgObjPath1 icon={svgobj1.creative} stroke={colors.black} />:
              i === 4 ? 
              <SvgObjPath1 icon={svgobj1.workspace1} stroke={colors.black} />:
              i === 5 && 
              <SvgObjPath1 icon={svgobj1.culture1} stroke={colors.black} />
            }
          </View>}
          <View style={styles.profileIconContainer}>
            <TouchableOpacity
              onPress={() => {
                videoRefs?.current[currentIndex]?.pause();
                setStop(true)
                navigation.navigate('Profile',{uid:item?.id,myProfile:item?.id === uid});
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
            onPress={() => handleCommentPress(item)}
            style={styles.iconContainer}>
            <Icon name={'message-processing'} color={colors.white} size={30} />
            <Text style={styles.commentText}>{commentCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleLikePress(
                item,
                allFeedsCollection,
                setAllFeedsCollection,
                userID,
                internetState,
                currentHorizontalIndex,
                setLiked
              )
            }
            style={[styles.iconContainer,{justifyContent:'center', alignItems:'center'}]}>
            { ["Football", "Athletic", "Fitness", "CrossFit", "Running"].includes(item?.cat)?
            <SVG
              icon={svg.dumbell}
              color={liked ? colors.red : colors.white}
              height={24}
              width={36}
            />:["Streaming", "Gaming", "Podcast", "E-Gaming", "Music"].includes(item?.cat)?
            <SvgObjPath1 icon={svgobj1.sports} stroke={liked ? colors.red : colors.white}  />
            :["Dately", "Friends", "Groups"].includes(item?.cat)?
            <SvgObjPath1 icon={svgobj1.culture1} stroke={liked ? colors.red : colors.white}  />
            :["Network", "Job Listing", "Alerts", "Career Advice"].includes(item?.cat)?
            <SvgObjPath1 icon={svgobj1.creative1} stroke={liked ? colors.red : colors.white}  />
            : ["Sight seeing", "Art", "Literature", "Movie", "Language"].includes(item?.cat)?
            <SvgObjPath1 icon={svgobj1.workspace1} stroke={liked ? colors.red : colors.white}  />:
            <SVG2 icon={svg2.broken} height={35} width={36} col={liked?colors.red:colors.white}/>}
            <Text style={styles.likeText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Share.open({
                  title: 'Share this video',
                  message: `${shareUrl}video?uid=${item?.id}&index=${item.index}`,
                  // Optionally, add other parameters like `subject` or `social`
                });
              } catch (error) {
                console.log("Error", error);
                
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
          {clicked && (
            <View style={styles.shareView}>
              <Image
                style={styles.shareIcon}
                source={require('../../assets/icons/snapchat.png')}
              />
              <Image
                style={styles.shareIcon}
                source={require('../../assets/icons/insta.png')}
              />
              <Image
                style={styles.shareIcon}
                source={require('../../assets/icons/tiktok.png')}
              />
            </View>
          )}
        </View>
        <View
          style={{height:50,width:50}}>
        </View>
      </View>}
    </View>
  );
};

export default React.memo(RenderItem);

// export default memo(RenderItem, (prevProps, nextProps) => {
//   return (
//     prevProps.item === nextProps.item &&
//     prevProps.index === nextProps.index &&
//     prevProps.currentIndex === nextProps.currentIndex &&
//     prevProps.paused === nextProps.paused &&
//     prevProps.loading === nextProps.loading
//   );
// });
