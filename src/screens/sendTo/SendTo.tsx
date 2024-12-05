import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {colors} from '../../assets/data/colors';

const SendTo = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{color: colors.black}}>SendTo</Text>
    </SafeAreaView>
  );
};

export default SendTo;
