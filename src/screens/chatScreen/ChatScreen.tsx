import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/data/colors';

const ChatScreen = () => {
  const messages = [
    { id: '1', text: 'Hi', time: '2:00 PM', isSender: false },
    { id: '2', text: 'Hi Sara 👋', time: '2:01 PM', isSender: true },
    { id: '3', text: 'How are you ?', time: '2:02 PM', isSender: true },
    { id: '4', text: "I'm fine, you ?", time: '2:03 PM', isSender: false },
    {
      id: '5',
      text: "I'm doing well, thanks for asking! How's your day going so far?",
      time: '2:04 PM',
      isSender: true,
    },
  ];

  const renderMessage = ({ item }:any) => (
    <View style={[styles.messageContainer, item.isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={ require('../../assets/images/profile.png')} // Replace with actual user image
          style={styles.avatar}
        />
        <Text style={styles.userName}>Sara 🌟</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput placeholder="Message" style={styles.input} />
        <TouchableOpacity>
          <Icon name="emoji-emotions" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="attach-file" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
    // width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcon: {
    padding: 5,
  },
  chatList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#f0f0f5',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timeText: {
    fontSize: 8,
    color: '#888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    color: colors.black
  },
});

export default ChatScreen;
