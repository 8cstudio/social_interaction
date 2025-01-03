import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from '../../components/customIcon/CustomIcon';
import {elevation3, fontSize, width} from '../../assets/data/TypeScript';
import {colors} from '../../assets/data/colors';
import ProfileHeader from './ProfileHeader';
import CustomButton from '../../components/customButton/CustomButton';
import {styles} from './styles';
import {categoriesTabs, feedsFilter} from '../../assets/data/arrays';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore, {serverTimestamp} from '@react-native-firebase/firestore';
import {addData} from '../../redux/ProfileSlice';

const Profile = ({navigation, route}: any) => {
  const id = route?.params?.id ?? null;
  const p = useSelector((state: any) => state.profile);
  const profilex = p.data;
  const friend = profilex?.friends?.hasOwnProperty(route?.params?.id);
  const sent = profilex?.sentRequests?.hasOwnProperty(route?.params?.id);
  const recieve = profilex?.friendRequests?.hasOwnProperty(route?.params?.id);
  const [tab, setTab] = useState(0);
  const myId = auth().currentUser?.uid;
  const [profile, setProfile] = useState(id === null && profilex);
  const myProfile = id === null ? true : false;
  console.log(myProfile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function getData() {
    const userDocRef = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid);
    const unsubscribe = userDocRef.onSnapshot(
      doc => {
        if (doc.exists) {
          const userData: any = doc.data();
          // const name = getCityName()
          dispatch(addData(userData));

          // getFriends(userData.friends);
        } else {
          console.log('No such document!');
        }
      },
      error => {
        console.error('Error listening to user document:', error);
      },
    );
    return () => unsubscribe();
  }
  console.log('other id: ', id);
  console.log('my id: ', myId);
  // console.log("other user data: ",profile);

  useEffect(() => {
    if (id !== myId && id !== null) {
      fetchUserData();
      getData();
    }
  }, [loading]);
  const fetchUserData = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(id).get();

      if (userDoc.exists) {
        setProfile({
          id: userDoc.id,
          ...userDoc.data(),
        });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
    }
  };

  const [allFeedsCollection, setAllFeedsCollection]: any = useState(null);
  const [tabLabel, setTabLabel] = useState('All');

  const handleTab = (id: number, label: string) => {
    setTab(id);
    setTabLabel(label);
    console.log(label);
  };
  async function handleAdd() {
    if (recieve) {
      accept(id);
    } else {
      add(id);
    }
  }
  async function accept(item: any) {
    try {
      setLoading(true);

      const batch = firestore().batch();
      const userRef = firestore().collection('users').doc(myId);
      const senderRef = firestore().collection('users').doc(item);

      // Update user document for friend acceptance
      batch.update(userRef, {
        [`friends.${item}`]: true,
        [`friendRequests.${item}`]: firestore.FieldValue.delete(),
      });

      // Update sender document for friend acceptance
      batch.update(senderRef, {
        [`friends.${myId}`]: true,
        [`sentRequests.${myId}`]: firestore.FieldValue.delete(),
      });
      // Commit the batch
      await batch.commit();

      // setFriendRequests(prevRequests => {
      //   const updatedRequests = { ...prevRequests };
      //   delete updatedRequests[senderId];
      //   return updatedRequests;
      // });
      // setFriends(prevFriends => ({
      //   ...prevFriends,
      //   [senderId]: true
      // }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  async function add(item: any) {
    try {
      setLoading(true);
      const batch = firestore().batch();
      const receiverRef = firestore().collection('users').doc(item);
      const userRef = firestore().collection('users').doc(myId);
      console.log('here');

      // Update receiver document
      batch.update(receiverRef, {
        [`friendRequests.${myId}`]: {
          from: myId,
          status: 'pending',
        },
      });

      console.log('here1');
      // Update user document
      batch.update(userRef, {
        [`sentRequests.${item}`]: {
          to: item,
          status: 'pending',
        },
      });

      console.log('here3');
      // Commit the batch
      await batch.commit();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }
  useEffect(() => {
    getAllFeedsData();
  }, []);
  const getAllFeedsData = async () => {
    try {
      const feeds = firestore()
        .collection('feeds')
        .doc(auth().currentUser?.uid);
      const doc = await feeds.get();
      let allData: any = [];
      if (!doc.exists) {
        console.log('No doc found');
        setAllFeedsCollection([]);
        return;
      }

      setAllFeedsCollection(doc.data()?.feeds);
    } catch (error) {
      console.log('Error fetching feeds:', error);
      setAllFeedsCollection([]);
    }
  };
  console.log(allFeedsCollection);

  return (
    <SafeAreaView style={{flex: 1, padding: 0}}>
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <ProfileHeader data={profilex} />
        {/*************************** Profile View ****************************/}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          {profile?.profilePic ? (
            <Image
              style={{
                height: fontSize(100),
                width: fontSize(100),
                borderRadius: 100,
                borderWidth: 3,
                borderColor: colors.gray,
              }}
              source={{uri: profile?.profilePic}}
            />
          ) : (
            <Icon
              name="person-circle-outline"
              size={fontSize(100)}
              iconFamily="ionic"
              color={colors.grey}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              // backgroundColor: colors.read,
              flex: 1,
            }}>
            <View style={styles.likesView}>
              <Text style={{color: colors.black}}>25</Text>
              <Text style={{color: colors.black}}>Likes</Text>
            </View>

            <View style={styles.likesView}>
              <Text style={{color: colors.black}}>25</Text>
              <Text style={{color: colors.black}}>Likes</Text>
            </View>

            <View style={styles.likesView}>
              <Text style={{color: colors.black}}>25</Text>
              <Text style={{color: colors.black}}>Likes</Text>
            </View>
          </View>
        </View>
        <Text style={{color: colors.black, fontSize: 16, fontWeight: 'bold'}}>
          {profile?.name ? profile?.name : 'No name'}
        </Text>
        <Text style={{color: colors.grey}}>
          {profile?.userName ? '@' + profile?.userName : 'Set your user name'}
        </Text>
        <Text style={{color: colors.black}}>
          {profile?.description
            ? profile?.description
            : 'no description added yet'}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="location"
            iconFamily="EvilIcons"
            color={colors.grey}
            size={20}
          />
          <Text style={{color: colors.grey, marginLeft: 5, marginTop: 5}}>
            {profile?.location ? profile?.location : 'Location'}
          </Text>
        </View>
        {/********************* Buttons View **********************/}
        <View style={styles.btnsView}>
          {myProfile ? (
            <CustomButton
              height={35}
              flex={1.1}
              onPress={() => navigation.navigate('ProfileSetup')}
              title={'Edit Profile'}
              fontSize={fontSize(11)}
              width={'35%'}
              btnTextColor={colors.white}
              btnColor={colors.black}
              borderRadius={50}
            />
          ) : (
            <CustomButton
              height={35}
              flex={1.1}
              onPress={() => navigation.navigate('ChatScreen', {user: profile})}
              title={'Message'}
              fontSize={fontSize(11)}
              width={'35%'}
              btnTextColor={colors.white}
              btnColor={colors.black}
              borderRadius={50}
            />
          )}
          {myProfile ? (
            <CustomButton
              disabled
              height={35}
              flex={1.1}
              title={'Share Profile'}
              fontSize={fontSize(11)}
              width={'35%'}
              btnTextColor={colors.white}
              btnColor={colors.grey}
              borderRadius={50}
            />
          ) : (
            <CustomButton
              marginHorizontal={5}
              flex={1.1}
              width={'35%'}
              onPress={() => handleAdd()}
              height={35}
              disabled={friend || sent}
              fontSize={fontSize(11)}
              title={
                friend ? 'Friend' : sent ? 'Sent' : recieve ? 'Accept' : 'Add'
              }
              btnColor={friend ? colors.viewBorder : colors.black}
              btnTextColor={friend ? colors.black : colors.white}
              borderRadius={50}
            />
          )}
        </View>
      </View>
      {/********************* Reels View **********************/}
      <View
        style={{
          ...elevation3,
          backgroundColor: colors.white,
          width: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flex: 1,
        }}>
        {allFeedsCollection && allFeedsCollection.length > 0 ? (
          <FlatList
            ListHeaderComponent={
              <>
                <FlatList
                  horizontal
                  contentContainerStyle={{
                    gap: 20,
                    justifyContent: 'center',
                    height: fontSize(40),
                    width: '100%',
                    marginVertical: 15,
                  }}
                  data={categoriesTabs}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleTab(item.id, item.label)}
                      key={item.id}
                      style={{
                        paddingVertical: 5,
                        borderBottomWidth: item.id === tab ? 2 : 0,
                        borderColor: colors.black,
                      }}>
                      <Text
                        style={{
                          // fontFamily: fontsInter.f500,
                          fontSize: fontSize(15),
                          color: colors.black,
                        }}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              </>
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item?.uri.toString() + index}
            nestedScrollEnabled
            numColumns={3}
            data={allFeedsCollection}
            style={{marginHorizontal: 20}}
            renderItem={({item, index}: any) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: width / 3 - 12,
                  height: width / 3 - 12,
                }}
                // onPress={() =>
                //   navigation.replace('Feeds', {
                //     profileFeedsData: allFeedsCollection,
                //     selectedProfileFeedIndex: index,
                //   })
                // }
              >
                <Image
                  style={styles.videoItem}
                  resizeMode="cover"
                  source={{uri: item?.thumbnail}}
                />
                <View style={styles.viewsText}>
                  <Icon
                    name={'caretright'}
                    iconFamily={'antDesign'}
                    color={colors.white}
                  />
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 12,
                      // fontFamily: fonts.f500,
                    }}>
                    {item?.views}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : allFeedsCollection === null ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : (
          <Text style={{fontSize: 18, color: colors.black,textAlign:'center', fontWeight:'700', marginVertical:30}}>
            No Data Available
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
