import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomButton from '../../components/customButton/CustomButton';
import { colors } from '../../assets/data/colors';

const CapturedData = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
      style={{flex:1, justifyContent: 'flex-end'}}
      imageStyle={{resizeMode:'cover'}}
        source={require('../../assets/images/captured.jpg')}>
            <View style={styles.btnsView}>
              
            <CustomButton
              width={'40%'}
              // isLoading={isLoading}
              title={'Send to'}
              btnColor={
                colors.black
              }
              btnTextColor={'#fff'}
            //   onPress={()=>navigation.navigate('Home')}
              borderRadius={50}
            />
            <CustomButton
              width={'40%'}
              // isLoading={isLoading}
              title={'Story'}
              btnColor={
                colors.white
              }
              btnTextColor={'#000'}
            //   onPress={()=>navigation.navigate('Home')}
              borderRadius={50}
            />
            </View>
        </ImageBackground>
    </SafeAreaView>
  );
};

export default CapturedData;
