import React from 'react';
import {ActivityIndicator, Modal, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../assets/data/colors';


const ActivityIndicatorAlert = ({
  visible,
  message,
  onPress,
  backgroundColor,
  onRequestClose,
  onCancel,
  title,
  Cancel,
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: backgroundColor || colors.white, // Default background color is white
            padding: 20,
            borderRadius: 10,
            width: '90%',
            // alignItems: 'center',
          }}>
            <Text
              style={{
                color: colors.textColor,
                alignSelf: 'flex-start',
                fontWeight: '500',
                fontSize: 18,
                marginBottom: 5,
              }}>
              {title?title:'Scanning The logo'}
            </Text>
          <View style={{alignItems: 'center',flexDirection:'row'}}>
            <Text style={{fontSize: 14, marginBottom: 10, color: colors.black}}>{title==="Creating Portal" || title === 'Loading'?'Loading...':title?'Converting ':'Loading...'}</Text>
            <ActivityIndicator color={colors.black}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActivityIndicatorAlert;