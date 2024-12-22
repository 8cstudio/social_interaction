import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Image,
} from 'react-native';
import Icon1 from '../../components/customIcon/CustomIcon';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { colors } from '../../assets/data/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../redux/ProfileSlice';
import Icon from '../../components/customIcon/CustomIcon';


export default function Home() {
  
  const navigation :any= useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const p = useSelector((state: any) => state.profile);
  const profilex = p.data;
  console.log(profilex);
  const friendRequestsLength = profilex.friendRequests
  ? Object.keys(profilex.friendRequests).length
  : 0;
  const dispatch = useDispatch();

  useEffect(() => {
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
          Alert.alert('Empty', 'User Profile data is Empty');
        }
      },
      error => {
        console.error('Error listening to user document:', error);
      },
    );
    return () => unsubscribe();
  }, []);
  // async function getFriends(friends: any) {
  //   firestore()
  //     .collection('users')
  //     .where('email', '!=', auth().currentUser?.email)
  //     .get()
  //     .then(querySnapshot => {
  //       if (querySnapshot.docs.length < 1) {
  //         return;
  //       }
  //       const filteredUsers: any = [];
  //       const nonFriends: any = [];
  //       const allUser: any = [];
  //       querySnapshot.docs.forEach((doc: any) => {
  //         if (
  //           friends?.hasOwnProperty(doc.id) &&
  //           doc?.data().lat &&
  //           doc?.data().lat !== ''
  //         ) {
  //           filteredUsers.push({
  //             id: doc.id,
  //             ...doc.data(),
  //           });
  //         } else if (doc?.data().lat && doc?.data().lat !== '') {
  //           nonFriends.push({
  //             id: doc.id,
  //             ...doc.data(),
  //           });
  //         }
  //         allUser.push({
  //           id: doc.id,
  //           ...doc.data(),
  //         });
  //       });
  //       setOtherUsers(nonFriends);
  //       dispatch(addFriend(filteredUsers));
  //       setAllUser(allUser);
  //       const unsubscribe = firestore()
  //         .collection('chats')
  //         .doc(auth().currentUser?.uid)
  //         .collection('chat')
  //         .onSnapshot(doc => {
  //           if (doc.docs.length > 0) {
  //             const arr: any = [];
  //             doc.docs.forEach(doc => {
  //               arr.push(doc.id);
  //             });
  //             const chatUser: any = allUser.filter(item =>
  //               arr.includes(item.id),
  //             );
  //             dispatch(addChatFriend(chatUser));
  //           } else {
  //             dispatch(removeChatFriend('chat'));
  //           }
  //         });
  //       // Cleanup the listener on unmount or dependency change
  //       return () => unsubscribe();
  //     });
  // }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row',
          gap:10,
          alignItems:'center',
        }}>
           <TouchableOpacity
            onPress={()=>navigation.navigate('AddFriendsScreen')}
           style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                gap:5,
                // marginLeft:10,
              }}>
                <Icon
                  name="adduser"
                  iconFamily="antDesign"
                  size={24}
                  color={colors.white}
                />
                {friendRequestsLength!==0 &&<View style={{height:15,width:15, backgroundColor:colors.red, borderRadius:40,
                  justifyContent:'center',
                  alignItems:'center',
                  marginLeft:-10,
                  marginTop:-10
                }}>

                <Text style={{color:colors.white, fontSize:8}}>{Object.keys(profilex.friendRequests).length}</Text>
                </View>}
              </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddFriendsScreen',{from:'search'})} >
        <Icon1 name="search1" iconFamily='antDesign' size={24} color="white" />
        </TouchableOpacity>
        </View>
        <TouchableOpacity  onPress={()=>navigation.navigate('Profile')}>
          <View style={styles.avatar} >
            {
              profilex?.profilePic ? <Image style={{
                width: 40,
                height: 40,borderRadius:20}} source={{uri:profilex?.profilePic}}/> :<Icon1 name="person" size={24} iconFamily='ionic' color="white" />
            }
          
          </View>
        </TouchableOpacity>
      </View>
      {/* FAB Menu */}
      <View style={[styles.fabContainer, isMenuOpen && styles.menuOpen]}>
        {isMenuOpen && (
          <>
            <TouchableOpacity style={styles.fabItem}>
              <Icon iconFamily={'material'} name="refresh" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabItem}>
              <Icon iconFamily={'material'} name="people" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabItem}>
              <Icon iconFamily={'material'} name="emoji-people" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabItem}>
              <Icon iconFamily={'material'} name="widgets" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={styles.fabToggle}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon iconFamily={'material'} name={isMenuOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="white" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

      // {/* Bottom Navigation */}
      // <View style={styles.bottomNav}>
      //   <TouchableOpacity style={{borderWidth:1, borderColor:colors.white, borderRadius:50, padding:5,
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}  onPress={()=>navigation.replace('Home',{id:0})}>
      //     <Icon1 name="play-outline" size={18} iconFamily='ionic' color="white" />
      //   </TouchableOpacity>
      //   <TouchableOpacity onPress={()=>navigation.navigate('CapturedData')}>
      //     <View style={styles.cameraButton} />
      //   </TouchableOpacity>
      //   {/* <View style={{width:28}}></View> */}
      //   <TouchableOpacity onPress={()=>navigation.replace('Home',{id:2})}>
      //     <Icon1 name="chat-bubble" size={28} iconFamily='material' color="white" />
      //   </TouchableOpacity>
      // </View>