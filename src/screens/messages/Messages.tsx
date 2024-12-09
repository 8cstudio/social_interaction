import React from 'react';
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

const mockData = [
  {id: 1, name: 'Sara', status: 'New Footage', time: '11:40 pm', icon: '🔥'},
  {id: 2, name: 'Muhammad', status: 'New chat', time: '9:30 am', icon: '🔥'},
  // {id: 3, name: 'Shahed', status: 'Opened', time: 'Yesterday', icon: '✌️'},
  // {id: 4, name: 'Yasser', status: 'Delivered', time: 'Sunday', icon: ''},
  // {id: 5, name: 'SA.', status: 'Received', time: '11 / 9', icon: '💛'},
];

const Messages = () => {
  const navigation: any = useNavigation();
  const renderChatItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen')}
      style={styles.chatItem}>
      <Image
        source={{uri: 'https://via.placeholder.com/50'}} // Replace with actual profile image URLs
        style={styles.profileImage}
      />
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Text style={styles.chatName}>
          {item.name} {item.icon}
        </Text>
        <Text
          style={[
            styles.chatStatus,
            {
              color:
                item.status === 'New Footage' || item.status === 'New chat'
                  ? colors.pink
                  : item.status === 'Opened'
                  ? colors.green
                  : item.status === 'Delivered'
                  ? colors.blueText
                  : colors.lightBlue,
            },
          ]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, width: '100%', backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Chat</Text>
          <View style={styles.headerIcons}>
            {/* Replace with actual icons */}
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Icon
                  name="adduser"
                  iconFamily="antDesign"
                  size={24}
                  color={colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="search1"
                  iconFamily="antDesign"
                  size={24}
                  color={colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity>
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
          <Text style={styles.sectionTitle}>Chat (2)</Text>
        </View>
        {/* Chat List */}
        <View style={{}}>
          <FlatList
            data={mockData}
            renderItem={renderChatItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        {/* Friends Section */}
        <TouchableOpacity disabled style={styles.section}>
          <Text style={styles.sectionTitle}>Friends</Text>
        </TouchableOpacity>
      </View>
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
    marginVertical: 10,
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
});

export default Messages;
