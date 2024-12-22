import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from '../../components/customIcon/CustomIcon';
import {colors} from '../../assets/data/colors';
import { fontSize } from '../../assets/data/TypeScript';

const SettingsScreen = ({navigation, route}:any) => {
//   const profilex = route?.params?.profilex?.data ?? null;
//   console.log(profilex);
  
//   // const user = {
//   //   name: 'Ashley',
//   //   username: '@ashley_666',
//   //   profileImage: require('../../assets/images/profile.png'), // Replace with actual image URL
//   // };

//   const options = [
//     {
//       id: '1',
//       title: 'Account',
//       description: 'Privacy, security, change email or number',
//       icon: 'account-circle-outline',
//       screenName:'ProfileSetup'
//     },
//     {
//       id: '2',
//       title: 'Chats',
//       description: 'Theme & wallpapers',
//       icon: 'chat-outline',
//       screenName:'ChatsSettings'
      
//     },
//     {
//       id: '3',
//       title: 'Notifications',
//       description: 'Message, group & call tones',
//       icon: 'bell-outline',
//       screenName:'NotificationsSettings'
//     },
//     {
//       id: '4',
//       title: 'Storage and data',
//       description: 'Network usage, auto-download',
//       icon: 'folder-outline',
//       screenName:'StorageAndData'
//     },
//     {
//       id: '5',
//       title: 'Help',
//       description: 'Help centre, contact us, privacy policy',
//       icon: 'help-circle-outline',
//       screenName:'HelpScreen'
//     },
//   ];

//   const renderItem = ({item}: any) => (
//     <TouchableOpacity
//     onPress={()=>navigation.navigate(item.screenName)}
//     style={styles.option}>
//       <Icon name={item.icon} size={24} color="#000" />
//       <View style={styles.optionText}>
//         <Text style={styles.optionTitle}>{item.title}</Text>
//         <Text style={styles.optionDescription}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity  onPress={()=>navigation.goBack()}>
//           <Icon name="arrow-left" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Settings</Text>
//       </View>

//       <View style={styles.profile}>
//         <View style={{flexDirection:'row', alignItems:'center'}}>


//         {profilex.profilePic?
//         <Image source={{uri:profilex.profilePic}} style={styles.profileImage} />
//       :<Icon name="person-circle-outline" size={fontSize(80)} iconFamily='ionic' color={colors.grey}/>
//       }
//         <View>
//           <Text style={styles.name}>{profilex.name}</Text>
//           <Text style={styles.username}>{profilex?.userName? '@'+profilex?.userName:'Set your user name'}</Text>
//         </View>
//         </View>
//         <View>
//         <TouchableOpacity>
//           <Icon name="pencil" size={24} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="qrcode" size={24} color="#000" />
//         </TouchableOpacity>
//         </View>
//       </View>
//       <View>

//       <FlatList
//         data={options}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//       </View>
//       <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')} style={styles.logoutButton}>
//         <Icon name="logout" size={24} color="red" />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     // paddingTop: 40,
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.black,
//     marginLeft: 10,
//   },
//   profile: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:'space-between',
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: fontSize(60),
//     height: fontSize(60),
//     borderRadius: 30,
//     marginRight: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.black,
//   },
//   username: {
//     fontSize: 14,
//     color: '#777',
//   },
//   list: {
//     flexGrow: 1,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   optionText: {
//     marginLeft: 10,
//   },
//   optionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color:colors.black,
//   },
//   optionDescription: {
//     fontSize: 14,
//     color: '#777',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   logoutText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: 'red',
//   },
// });
}

export default SettingsScreen
