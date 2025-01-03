import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  InteractionManager,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import Icon from '../../components/customIcon/CustomIcon';
import {handleLikeReply, handleLikeComment} from './FeedsHandlers';
import Video from 'react-native-video';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSize} from '../../assets/data/TypeScript';
import {formatTimeStamp} from '../../components/functions/GlobalFunctions';
import {fontsInter} from '../../assets/fonts/Fonts';

const renderCommentItem = ({
  comment,
  commentIndex,
  userID,
  internetState,
  setAllFeedsCollection,
  allFeedsCollection,
  handleReplyPress,
  selectedItem,
  modalVisible,
  currentIndex,
  currentHorizontalIndex,
}: any) => {
  const [userData, setUserData] = useState({name: '', pic: '', penguin: false});
  const [shouldScroll, setShouldScroll] = useState<boolean>(true);
  const [currentPlaying, setCurrentPlaying] = useState<string>('');
  const [playComment, setPlayComment] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(comment?.userID);
      if (data) {
        setUserData({
          name: data.name,
          pic: data.avatar ? data.avatar : data.profilePic,
          penguin: data?.penguin === 'Approved' ? true : false,
        });
      }
    };
    fetchUserData();
  }, [comment?.userID]);
  const getUserData = async (userID: any) => {
    try {
      const userDoc = await firestore().collection('users').doc(userID).get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  };
  let seconds;
  if (comment?.createdAt) {
    if (comment?.createdAt?._seconds) {
      seconds = comment?.createdAt?._seconds;
    } else {
      const dateString = comment?.createdAt;
      const dateObject = new Date(dateString);
      seconds = Math.floor(dateObject.getTime() / 1000);
    }
  }
  const formattedTime = formatTimeStamp(seconds);
  return (
    <View key={commentIndex} style={{flexDirection: 'row'}}>
      {userData.pic ? (
        <Image
          style={{height: 35, width: 35, borderRadius: 17.5}}
          source={{uri: userData.pic}}
          resizeMode="cover"
        />
      ) : (
        <Ionicons name={'person'} size={35} color={colors.lightGrey} />
      )}
      <View
        style={{
          marginLeft: 5,
          marginBottom: 10,
          justifyContent: 'flex-start',
          // width: '80%',
          flex: 1,
        }}>
        {/* <Text
          style={{
            fontSize: 15,
            color: colors.grey,
            fontFamily: fontsInter.f400,
          }}>
          {userData.name}
        </Text> */}
        <View style={{flexDirection: 'row', gap: 3}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              flexShrink: 1,
              fontSize: fontSize(15),
              color: colors.grey,
              fontFamily: fontsInter.f400,
            }}>
            {userData.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'flex-start'}}>
          <Text
            style={{
              fontSize: 15,
              color: colors.black,
              textAlign: 'left',
              // fontFamily: fonts.f400,
              flex: 1,
            }}>
            {comment.message}{'  '}<Text  style={{
              fontSize: 13,
              color: colors.grey,
              fontFamily: fontsInter.f400,
            }}>{formattedTime}
              </Text>
          </Text>
          {/* i commented taimoor */}
          {/* <Text
            style={{
              fontSize: 13,
              color: colors.grey,
              fontFamily: fontsInter.f400,
            }}>
            {formattedTime}
          </Text> */}
          <View>
            {/* <TouchableOpacity
              hitSlop={10}
              onPress={() => {
                // handleReplyPress(commentIndex);
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.grey,
                  fontFamily: fontsInter.f600,
                }}>
                {' '}
                Reply
              </Text>
            </TouchableOpacity> */}
            {comment?.reply && comment?.reply?.length > 0 ? (
              <FlatList
                data={comment?.reply || []}
                style={{padding: 10}}
                renderItem={({item: reply, index: replyIndex}) => (
                  <RenderReplyComment
                    reply={reply}
                    index={replyIndex}
                    userData={userData}
                    commentIndex={commentIndex}
                    allFeedsCollection={allFeedsCollection}
                    selectedItem={selectedItem}
                    internetState={internetState}
                    userID={userID}
                    setAllFeedsCollection={setAllFeedsCollection}
                    currentIndex={currentIndex}
                    currentHorizontalIndex={currentHorizontalIndex}
                  />
                )}
                keyExtractor={(reply, index) => index.toString()}
              />
            ) : (
              <>
              </>
            )}
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          hitSlop={10}
          onPress={() =>
            handleLikeComment(
              comment,
              allFeedsCollection,
              setAllFeedsCollection,
              selectedItem,
              userID,
              internetState,
              currentIndex,
              currentHorizontalIndex,
            )
          }>
          <Icon
            name={comment.commentLiked ? 'heart' : 'hearto'}
            iconFamily={'antDesign'}
            size={15}
            color={comment.commentLiked ? colors.red : colors.grey}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            color: colors.grey,
            fontFamily: fontsInter.f400,
          }}>
          {comment.likes}
        </Text>
      </View>
    </View>
  );
};
export default renderCommentItem;

//   export default memo(renderCommentItem, (prevProps, nextProps) => {
//     return (
//       prevProps.comment === nextProps.comment &&
//       prevProps.commentIndex === nextProps.commentIndex &&
//       prevProps.selectedItem === nextProps.selectedItem
//     );
//   });

export function RenderReplyComment({
  reply,
  index,
  userData,
  commentIndex,
  allFeedsCollection,
  selectedItem,
  internetState,
  userID,
  setAllFeedsCollection,
  currentIndex,
  currentHorizontalIndex,
}: any) {
  const [shouldScroll, setShouldScroll] = useState<boolean>(true);
  const [currentPlaying, setCurrentPlaying] = useState<string>('');
  let seconds;
  const [playReplyComment, setPlayReplyComment] = useState(true);
  const [replyUserData, setReplyUserData] = useState({
    name: '',
    pic: '',
    penguin: false,
  });
  useEffect(() => {
    const fetchReplyUserData = async () => {
      const data = await getUserData(reply?.userID);
      if (data) {
        setReplyUserData({
          name: data.name,
          pic: data.avatar ? data.avatar : data.profilePic,
          penguin: data?.penguin === 'Approved' ? true : false,
        });
      }
    };
    fetchReplyUserData();
  }, [reply?.userID]);
  const getUserData = async (userID: any) => {
    try {
      const userDoc = await firestore().collection('users').doc(userID).get();
      if (userDoc.exists) {
        return userDoc.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  };
  if (reply?.createdAt) {
    if (reply?.createdAt?._seconds) {
      seconds = reply?.createdAt?._seconds;
    } else {
      const dateString = reply?.createdAt;
      const dateObject = new Date(dateString);
      seconds = Math.floor(dateObject.getTime() / 1000);
    }
  }
  const formattedTime = formatTimeStamp(seconds);
  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      {replyUserData.pic ? (
        <Image
          style={{height: 35, width: 35, borderRadius: 17.5}}
          source={{uri: replyUserData?.pic}}
          resizeMode="cover"
        />
      ) : (
        <Ionicons name={'person'} size={35} color={colors.lightGrey} />
      )}
      <View
        style={{
          marginLeft: 5,
          justifyContent: 'flex-start',
          width: '75%',
        }}>
        {/* <Text
          style={{
            fontSize: 15,
            color: colors.grey,
            fontFamily: fontsInter.f400,
          }}>
          {replyUserData.name}
        </Text> */}

        <View style={{flexDirection: 'row', flex: 1, gap: 3}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              flexShrink: 1,
              fontSize: fontSize(15),
              color: colors.grey,
              fontFamily: fontsInter.f400,
            }}>
            {replyUserData?.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 13,
              color: colors.grey,
              fontFamily: fontsInter.f400,
            }}>
            {formattedTime}
          </Text>
          {/* <Text
            style={{
              fontSize: 13,
              color: colors.grey,
              fontFamily: fontsInter.f600,
            }}>
            {' '}
            Reply
          </Text> */}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          hitSlop={10}
          onPress={() =>
            handleLikeReply(
              reply,
              commentIndex,
              allFeedsCollection,
              selectedItem,
              internetState,
              userID,
              setAllFeedsCollection,
              currentIndex,
              currentHorizontalIndex,
            )
          }>
          <Icon
            name={reply.replyLiked ? 'heart' : 'hearto'}
            iconFamily={'antDesign'}
            size={15}
            color={reply.replyLiked ? colors.red : colors.grey}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            color: colors.grey,
            fontFamily: fontsInter.f400,
          }}>
          {reply.likes}
        </Text>
      </View>
    </View>
  );
}
