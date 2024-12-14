import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../assets/data/colors';

const CustomAlert = ({
  visible,
  message,
  onPress,
  backgroundColor,
  onRequestClose,
  onCancel,
  title,
  Cancel,
  resend,onResend
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
          {title && (
            <Text
              style={{
                color: colors.textColor,
                alignSelf: 'flex-start',
                fontWeight: '500',
                fontSize: 18,
                marginBottom: 5,
              }}>
              {title}
            </Text>
          )}
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, marginBottom: 10}}>{message}</Text>
          </View>
          {resend &&<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
            <TouchableOpacity disabled>
              <Text style={{fontSize: 12, color: colors.textColor}}>
                Resend Verification link
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onResend}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                backgroundColor: colors.black,
                borderRadius: 50,
              }}>
              <Text style={{fontSize: 12, color: colors.white}}>Resend</Text>
            </TouchableOpacity>
          </View>}
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {Cancel && (
              <TouchableOpacity onPress={onCancel} style={{padding: 10}}>
                <Text style={{fontSize: 16, color: colors.black}}>Cancel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onPress} style={{padding: 10}}>
              <Text style={{fontSize: 16, color: colors.black}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
