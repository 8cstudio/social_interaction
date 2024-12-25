import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import Icon from '../../components/customIcon/CustomIcon';
import {useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const mockData = [
  {id: 1, name: 'Sara', status: 'New Footage', time: '11:40 pm', icon: '🔥'},
  {id: 2, name: 'Muhammad', status: 'New chat', time: '9:30 am', icon: '🔥'},
  // {id: 3, name: 'Shahed', status: 'Opened', time: 'Yesterday', icon: '✌️'},
  // {id: 4, name: 'Yasser', status: 'Delivered', time: 'Sunday', icon: ''},
  // {id: 5, name: 'SA.', status: 'Received', time: '11 / 9', icon: '💛'},
];

const Messages = () => {
  const [showMenu, setShowMenu]: any = useState(false);
  const [friends, setFriends]: any = useState([]);
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const p = useSelector((state: any) => state.profile);
  const profilex = p.data;
  const friendsCount = profilex?.friends
    ? Object.keys(profilex?.friends)?.length
    : 0;
  const myId = auth().currentUser?.uid;
  const [chatUserIds, setChatUserIds]: any = useState([]);
  // console.log(friends);
  useEffect(() => {
    if (profilex?.friends) {
      fetchUsersByIds(Object.keys(profilex?.friends));
    }
    loadData();
  }, [profilex]);

  const loadData = async () => {
    try {
      const fetchedChatUserIds = await fetchChatUsers();
      console.log('Fetched Chat User IDs:', fetchedChatUserIds);

      if (fetchedChatUserIds.length > 0) {
        await fetchChatUsersDetails(fetchedChatUserIds);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const fetchChatUsers = async (): Promise<string[]> => {
    try {
      const chats = await firestore()
        .collection('chats')
        .doc(myId)
        .collection('chat')
        .get();

      const chatUsers: string[] = [];
      chats.forEach((chat) => {
        chatUsers.push(chat.id);
      });

      setChatUserIds(chatUsers); // Update state
      return chatUsers; // Return the chat user IDs
    } catch (error) {
      console.error('Error fetching chat users:', error);
      return [];
    }
  };

  const fetchChatUsersDetails = async (userIds: string[]) => {
    console.log('Fetching user details for IDs:', userIds);

    try {
      const userDetailsList: any[] = [];

      for (const userId of userIds) {
        const userDoc = await firestore().collection('users').doc(userId).get();

        if (userDoc.exists) {
          const userData = {
            id: userDoc.id,
            ...userDoc.data(),
          };
          userDetailsList.push(userData); // Collect user details
          console.log('User details fetched:', userData);
        }
      }

      setUserDetails(userDetailsList); // Update state with user details
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  const fetchUsersByIds = async (userIds: any) => {
    try {
      const usersDetails = [];
      for (const userId of userIds) {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          usersDetails.push({
            id: userDoc.id,
            ...userDoc.data(),
          });
        } else {
          console.log(`User with ID ${userId} does not exist.`);
        }
      }

      // console.log('Users Details:', usersDetails); // Array of user details
      setFriends(usersDetails);
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  // console.log(friendsCount);
  const friendRequestsLength = profilex.friendRequests
    ? Object.keys(profilex.friendRequests).length
    : 0;
  const navigation: any = useNavigation();
  // const renderChatItem = ({item}: any) => (
  //   <TouchableOpacity
  //     onPress={() => navigation.navigate('ChatScreen')}
  //     style={styles.chatItem}>
  //     <Image
  //       source={{uri: 'https://via.placeholder.com/50'}} // Replace with actual profile image URLs
  //       style={styles.profileImage}
  //     />
  //     <View style={{flex: 1, marginHorizontal: 10}}>
  //       <Text style={styles.chatName}>
  //         {item.name} {item.icon}
  //       </Text>
  //       <Text
  //         style={[
  //           styles.chatStatus,
  //           {
  //             color:
  //               item.status === 'New Footage' || item.status === 'New chat'
  //                 ? colors.pink
  //                 : item.status === 'Opened'
  //                 ? colors.green
  //                 : item.status === 'Delivered'
  //                 ? colors.blueText
  //                 : colors.lightBlue,
  //           },
  //         ]}>
  //         {item.status}
  //       </Text>
  //     </View>
  //     <Text style={styles.chatTime}>{item.time}</Text>
  //   </TouchableOpacity>
  // );
  const renderFriends = ({item}: any) => (
    <View
      // onPress={() => navigation.navigate('ChatScreen')}
      style={styles.chatItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', {id: item.id})}>
        <Image
          source={{
            uri: item.profilePic
              ? item.profilePic
              : 'https://via.placeholder.com/50',
          }} // Replace with actual profile image URLs
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Text style={styles.chatName}>
          {item.name}
          {/* {item.icon} */}
        </Text>
        <Text
          style={[
            styles.chatStatus,
            {
              color:
                // item.status === 'New Footage' || item.status === 'New chat'
                //   ? colors.pink
                //   : item.status === 'Opened'
                //   ? colors.green
                //   : item.status === 'Delivered'
                //   ? colors.blueText
                //   :
                colors.lightBlue,
            },
          ]}>
          {item.status ? item.status : 'Opened'}
        </Text>
      </View>
      <Text style={styles.chatTime}>{item.time ? item.time : '09:43 pm'}</Text>
    </View>
  );
  const renderChatPeople = ({item}: any) => (
    <View
      // onPress={() => navigation.navigate('ChatScreen')}
      style={styles.chatItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', {id: item.id})}>
        <Image
          source={{
            uri: item.profilePic
              ? item.profilePic
              : 'https://via.placeholder.com/50',
          }} // Replace with actual profile image URLs
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('ChatScreen', {user: item})} style={{flex: 1, marginHorizontal: 10}}>
        <Text style={styles.chatName}>
          {item.name}
          {/* {item.icon} */}
        </Text>
        <Text
          style={[
            styles.chatStatus,
            {
              color:
                // item.status === 'New Footage' || item.status === 'New chat'
                //   ? colors.pink
                //   : item.status === 'Opened'
                //   ? colors.green
                //   : item.status === 'Delivered'
                //   ? colors.blueText
                //   :
                colors.lightBlue,
            },
          ]}>
          {item.status ? item.status : 'Opened'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.chatTime}>{item.time ? item.time : '09:43 pm'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, width: '100%', backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent:'space-between',
              alignItems: 'center',
              gap: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View style={styles.avatar}>
                {profilex?.profilePic ? (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    source={{uri: profilex?.profilePic}}
                  />
                ) : (
                  <Icon
                    name="person"
                    size={24}
                    iconFamily="ionic"
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>Chat</Text>
          </View>

          <View style={styles.headerIcons}>
            {/* Replace with actual icons */}
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddFriendsScreen')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 5,
                  marginLeft: 10,
                }}>
                <Icon
                  name="adduser"
                  iconFamily="antDesign"
                  size={24}
                  color={colors.black}
                />
                {friendRequestsLength !== 0 && (
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: colors.red,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: -10,
                      marginTop: -10,
                    }}>
                    <Text style={{color: colors.white, fontSize: 8}}>
                      {Object.keys(profilex.friendRequests).length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="search1"
                  iconFamily="antDesign"
                  size={24}
                  color={colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Icon
                  name="dots-three-vertical"
                  iconFamily="entypo"
                  size={20}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <TouchableOpacity disabled style={styles.notificationBar}>
          <Text style={styles.notificationText}>
            Notifications <Text style={styles.notificationDot}>●</Text>
          </Text>
        </TouchableOpacity>

        {/* Live Chat */}
        <TouchableOpacity disabled style={styles.section}>
          <Text style={styles.sectionTitle}>Live Chat</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat{userDetails.length>0 && `  (${userDetails.length})`}</Text>
        </View>
        {/* Chat List */}
        <View style={{}}>
          <FlatList
            data={userDetails}
            renderItem={renderChatPeople}
            keyExtractor={item => item.id.toString()}
          />
        </View> 

        {/* Friends Section */}
        <TouchableOpacity disabled style={styles.section}>
          <Text style={styles.sectionTitle}>Friends {`(${friendsCount})`}</Text>
        </TouchableOpacity>
        <View style={{}}>
          <FlatList
            data={friends}
            renderItem={renderFriends}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
      {/* Show Menu */}
      {showMenu && (
        <TouchableOpacity
          onPress={async () => {
            const jsonData = await AsyncStorage.getItem('userPreferences');
            if (jsonData !== null) {
              const data: any = JSON.parse(jsonData);
              console.log('Loaded data:', data);
              if (data.type === 'google') {
                const dataToSave = {
                  remember: false,
                  type: '',
                };
                await AsyncStorage.setItem(
                  'userPreferences',
                  JSON.stringify(dataToSave),
                );
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut().then(async () => {
                  // dispatch(removeChatFriend('chat'));
                  // dispatch(removeFriend('chat'));
                  // dispatch(removeProfile(''));
                  await auth().signOut();
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                  });
                });
                console.log('Google User signed out');
              } else if (data.type === 'email') {
                const dataToSave = {
                  remember: false,
                  type: '',
                };
                await AsyncStorage.setItem(
                  'userPreferences',
                  JSON.stringify(dataToSave),
                );
                auth()
                  .signOut()
                  .then(() => {
                    // dispatch(removeChatFriend('chat'));
                    // dispatch(removeFriend('chat'));
                    // dispatch(removeProfile(''));
                    console.log('Email User signed out!');
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'LoginScreen'}],
                    });
                  });
              } else {
                console.log('Sign In Provider is invalid: ', data.type);
              }
            }
            console.log('pressed');
          }}
          style={{
            backgroundColor: 'red',
            padding: 10,
            position: 'absolute',
            right: 20,
            top: 54,
            borderRadius: 12,
          }}>
          <Text style={{color: colors.white}}>Logout</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  notificationBar: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  notificationText: {
    color: colors.white,
    fontSize: 16,
  },
  notificationDot: {
    color: 'red',
    fontSize: 18,
  },
  section: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.greynew,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: colors.black,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: colors.lightBlue,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  chatStatus: {
    fontSize: 14,
    color: '#888',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Messages;
