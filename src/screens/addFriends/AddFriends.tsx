import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import Icon from '../../components/customIcon/CustomIcon';
import {fontSize} from '../../assets/data/TypeScript';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import CustomAlert from '../../components/modals/CustomAlert';

const AddFriendsScreen = ({navigation, route}: any) => {
  const from = route?.params?.from ?? null;
  const [searchText, setSearchText] = useState('');
  const [isQuickAddSelected, setIsQuickAddSelected] = useState(true); // Initially set to true for 'Added' users
  const p = useSelector((state: any) => state.profile);
  const profile: any = p.data;

  const uid = auth().currentUser?.uid;
  const [loading, setLoading] = useState(false);
  const [initialUsers, setInitialUsers]: any = useState([]);
  const [users, setUsers]: any = useState([]);
  const [alertData, setAlertData] = useState({
    title: 'Are You Sure To Remove',
    message: '',
    onPress: () => {},
  });
  const [search, setSearch]: any = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  useEffect(() => {
    setInitialUsers([]);
    setUsers([]);
    fetchUsersData();
  }, [p, isQuickAddSelected]);
  console.log('Users: ', isQuickAddSelected);
  console.log(profile);
  

  const fetchUsersData = async () => {
    setLoading(true);
    const usersCollection = await firestore().collection('users').get();
    if (usersCollection.docs.length < 1) {
      return;
    }
    if (!isQuickAddSelected) {
      const filteredUsers = usersCollection.docs.filter(
        doc =>
          doc.id !== uid && profile?.friendRequests?.hasOwnProperty(doc.id),
      );
      console.log("Friend filtered: ",filteredUsers);
      const data = filteredUsers.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Friend Requests: ",data);
      
      setInitialUsers(data);
      setUsers(data);
    } else {
      const filteredUsers = usersCollection.docs.filter(
        doc =>
          doc.id !== uid &&
          !profile?.friendRequests?.hasOwnProperty(doc.id) &&
          !profile?.friends?.hasOwnProperty(doc.id) &&
          !profile?.sentRequests?.hasOwnProperty(doc.id),
      );
      const data = filteredUsers.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log("Friend Requests: ",data);
      setInitialUsers(data);
      setUsers(data);
    }
    try {
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  function handleAccept(item: any, type: any) {
    if (type === 'accept') {
      setIsAlertVisible(true);
      setAlertData({
        title: `Are You sure you want to accept request from ${item?.name}`,
        message: '',
        onPress: () => {
          setIsAlertVisible(false);
          accept(item);
        },
      });
    } else if (type === 'remove') {
      setIsAlertVisible(true);
      setAlertData({
        title: `Are You sure you want to delete request from ${item?.name}`,
        message: '',
        onPress: () => {
          setIsAlertVisible(false);
          remove(item);
        },
      });
    } else if (type === 'add') {
      setIsAlertVisible(true);
      setAlertData({
        title: `Are You sure you want to Add ${item?.name} as a friend`,
        message: '',
        onPress: () => {
          setIsAlertVisible(false);
          add(item);
        },
      });
    }
  }
  async function accept(item: any) {
    try {
      const batch = firestore().batch();
      const userRef = firestore().collection('users').doc(uid);
      const senderRef = firestore().collection('users').doc(item.id);

      // Update user document for friend acceptance
      batch.update(userRef, {
        [`friends.${item.id}`]: true,
        [`friendRequests.${item.id}`]: firestore.FieldValue.delete(),
      });

      // Update sender document for friend acceptance
      batch.update(senderRef, {
        [`friends.${uid}`]: true,
        [`sentRequests.${uid}`]: firestore.FieldValue.delete(),
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
    } catch (error) {
      console.error(error);
    }
  }

  async function remove(item: any) {
    try {
      const batch = firestore().batch();
      const userRef = firestore().collection('users').doc(uid);
      const senderRef = firestore().collection('users').doc(item.id);

      // Update user document for friend acceptance
      batch.update(userRef, {
        [`friendRequests.${item.id}`]: firestore.FieldValue.delete(),
      });

      // Update sender document for friend acceptance
      batch.update(senderRef, {
        [`sentRequests.${uid}`]: firestore.FieldValue.delete(),
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
    } catch (error) {
      console.error(error);
    }
  }

  async function add(item: any) {
    try {
      const batch = firestore().batch();
      const receiverRef = firestore().collection('users').doc(item.id);
      const userRef = firestore().collection('users').doc(uid);
      console.log('here');

      // Update receiver document
      batch.update(receiverRef, {
        [`friendRequests.${uid}`]: {
          from: uid,
          status: 'pending',
        },
      });

      console.log('here1');
      // Update user document
      batch.update(userRef, {
        [`sentRequests.${item.id}`]: {
          to: item.id,
          status: 'pending',
        },
      });

      console.log('here3');
      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  }
  function handleSearch(e: any) {
    // setSearch(e.nativeEvent.text);
    // setUsers(initialUsers?.filter((user: any) => user?.name?.toLowerCase().startsWith(e.nativeEvent.text.toLowerCase())))
  }
  const handleAddMePress = () => {
    setIsQuickAddSelected(false);
    // setUsersToShow(allFriendsAndOtherUsers.addUsers);
  };
  const handleQuickAddPress = () => {
    setIsQuickAddSelected(true);
    // setUsersToShow(allFriendsAndOtherUsers.quickAddUsers);
  };
  const renderItem = ({item}: any) => (
    <View style={styles.suggestionItem}>
      {item.profilePic ? (
        <Image style={styles.avatarStyle} source={{uri: item?.profilePic}} />
      ) : (
        <Icon
          name="person-circle-outline"
          size={fontSize(70)}
          iconFamily="ionic"
          color={colors.grey}
        />
      )}
      <View style={styles.suggestionText}>
        <Text style={styles.name}>
          {item.name ? item.name : 'Unknown name'}
        </Text>
        <Text style={styles.username}>
          {item.userName ? item.userName : 'Unknown user name'}
        </Text>
      </View>
      {isQuickAddSelected ? (
        <TouchableOpacity
          onPress={() =>
            handleAccept(item, isQuickAddSelected ? 'add' : 'accept')
          }
          // onPress={()=>navigation.navigate('ChatScreen')}
        >
          <Icon name="account-plus" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginLeft: 10,
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => handleAccept(item, 'accept')}>
            <Icon name="check-circle" size={24} color={colors.green2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAccept(item, 'remove')}>
            <Icon name="close-circle" size={24} color={colors.red} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={fontSize(25)}
              name={'arrow-back-outline'}
              color={'#000'}
              iconFamily={'ionic'}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            {from === 'search' ? 'Search' : 'Add Friends'}
          </Text>
        </View>
        {from === 'search' && (
          <View style={{width: '100%', height: 60, marginTop: 15}}>
            <CustomTextInput
              // keyboardType={'email-address'}
              bg={colors.iconBackground}
              backgroundColor
              placeholder={'Search'}
              iconName={'magnify'}
              iconSize={24}
              border
              //   iconFamily={'fontAwesome6'}
              iconColor={colors.inputPlaceholder}
              // prefixIcon={require('../../assets/icons/lock.png')}
              //   isSecure={true}
              suffixIcon
              value={searchText}
              onChangeText={(text: any) => setSearchText(text)}
              //   isSecureTextEntry={true}
            />
          </View>
        )}
        <View
          style={{
            height: fontSize(48),
            borderRadius: 10,
            gap: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 8,
          }}>
          <TouchableOpacity
            onPress={handleAddMePress}
            style={{
              flex: 1,
              height: fontSize(48),
              width: '50%',
              backgroundColor: isQuickAddSelected ? colors.white : colors.black,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: isQuickAddSelected ? 1 : 0,
              borderColor: colors.black,
            }}>
            <Text
              style={{
                fontSize: fontSize(18),
                color: isQuickAddSelected ? colors.black : colors.white,
                // fontFamily: fontsInter.f500,
              }}>
              Requests{profile?.friendRequests?.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleQuickAddPress}
            style={{
              flex: 1,
              height: fontSize(48),
              width: '50%',
              backgroundColor: !isQuickAddSelected
                ? colors.white
                : colors.black,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: isQuickAddSelected ? 0 : 1,
              borderColor: colors.black,
            }}>
            <Text
              style={{
                fontSize: fontSize(18),
                color: !isQuickAddSelected ? colors.black : colors.white,
                // fontFamily: fonts.f500,
              }}>
              Quick Add
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        /> */}
        {isQuickAddSelected && (
          <Text style={styles.suggestionsTitle}>Suggestions</Text>
        )}
        {loading || users.length > 0 ? (
          <FlatList
            data={users}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        ) : (
          <View
            style={{
              height: 200,
              width: '100%',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.black}}>No Users to show</Text>
          </View>
        )}
        <CustomAlert
          message={alertData.message}
          title={alertData.title}
          visible={isAlertVisible}
          onPress={alertData.onPress}
          onRequestClose={() => {}}
          Cancel={true}
          onCancel={() => setIsAlertVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    gap: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,

    color: colors.black,
  },
  suggestionsTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flexGrow: 1,
    gap: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  suggestionText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',

    color: colors.black,
  },
  username: {
    fontSize: 14,
    color: '#777',
  },
});

export default AddFriendsScreen;
// import { View, Text } from 'react-native'
// import React from 'react'

// const AddFriendsScreen = () => {
//   return (
//     <View>
//       <Text>AddFriendsScreen</Text>
//     </View>
//   )
// }

// export default AddFriendsScreen