import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../assets/data/colors';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import Icon from '../../components/customIcon/CustomIcon';
import { fontSize } from '../../assets/data/TypeScript';

const AddFriendsScreen = ({navigation, route}:any) => {
  const from  = route?.params?.from?? null;
  const [searchText, setSearchText] = useState('');
  const suggestions = [
    {
      id: '1',
      name: 'Saeed',
      username: '@Saeedxii',
      avatar:  require('../../assets/images/profile.png'), // Replace with actual avatar URL
    },
    {
      id: '2',
      name: 'Nasser',
      username: '@NasserSaud',
      avatar:  require('../../assets/images/profile.png'),
    },
    {
      id: '3',
      name: 'Asmaa',
      username: '@Asmaa2005',
      avatar:  require('../../assets/images/profile.png'),
    },
    {
      id: '4',
      name: 'Maram',
      username: '@Maramii9',
      avatar:  require('../../assets/images/profile.png'),
    },
  ];

  const renderItem = ({ item }:any) => (
    <View style={styles.suggestionItem}>
      <Image source={item.avatar } style={styles.avatar} />
      <View style={styles.suggestionText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <TouchableOpacity 
      // onPress={()=>navigation.navigate('ChatScreen')}
        >
        <Icon name="account-plus" size={24} color="#000" /> 
      </TouchableOpacity>
    </View>
  );

  return (
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
        <Text style={styles.title}>{from==='search'?'Search':'Add Friends'}</Text>
        {/* <TouchableOpacity 
        onPress={()=>navigation.navigate('Messages')}
        >
          <Icon name='facebook-messenger' color= {colors.black} size={25}
          />
        </TouchableOpacity> */}
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
              value={searchText}
              onChangeText={(text:any) => setSearchText(text)}
            //   isSecureTextEntry={true}
            />
      </View>
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        /> */}
      <Text style={styles.suggestionsTitle}>Suggestions</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
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
    gap:20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:colors.black,
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
    
    color:colors.black,
  },
  suggestionsTitle: {
    
    color:colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flexGrow: 1,
    gap:10
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderWidth:1,
    borderColor:colors.gray,
    borderRadius:12,
    paddingHorizontal:10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  suggestionText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    
    color:colors.black,
  },
  username: {
    fontSize: 14,
    color: '#777',
  },
});

export default AddFriendsScreen;
