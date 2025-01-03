import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../assets/data/colors';
import CustomTextInput from '../../components/textInput/CustomTextInput';

import auth from '@react-native-firebase/auth';
import Icon from '../../components/customIcon/CustomIcon';
import { fontSize } from '../../assets/data/TypeScript';
const SearchUser = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch users when the searchQuery changes
    const fetchUsers = async () => {
      if (searchQuery.trim() === '') {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const snapshot = await firestore()
          .collection('users')
          .where('name', '>=', searchQuery)
          .where('name', '<=', searchQuery + '\uf8ff')
          .get();

        const fetchedUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [searchQuery]);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile', {id: item.id})}
      style={styles.itemContainer}>
      <Image source={{uri: item.profilePic}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
                      {'Search'}
                    </Text>
          </View>
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
          value={searchQuery}
          onChangeText={setSearchQuery}
          //   isSecureTextEntry={true}
        />
      </View>
      {/* <TextInput
        style={styles.input}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      /> */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={users.filter(user => user.id !== auth().currentUser?.uid)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchQuery ? 'No users found' : 'Start typing to search'}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  header: {
    gap: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default SearchUser;
