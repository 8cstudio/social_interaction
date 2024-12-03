import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Image} from 'react-native';
import {colors} from '../../assets/data/colors';
export default function CustomButton({
  iconName,
  iconSize,
  iconColor,
  iconFamily,
  suffixIcon,
  prefixIcon,
  title,
  marginHorizontal,
  btnColor,
  btnTextColor,fontFamily,
  icon,
  onPress,
  borderRadius,
  borderColor,
  isLoading,
  setISLoading,fontWeight,
  width,
  height,
  fontSize,
  marginTop,
  iconImage,
  imageSource,
  iconImageSize,
  disabled,
  elevation,
  paddingHorizontal,
  tintColor
}: any) {
  return (
    <TouchableOpacity
    disabled={disabled}
      onPress={onPress}
      style={[
        styles.btn,
        {
          elevation: elevation ? elevation : 0,
          marginHorizontal: marginHorizontal ? marginHorizontal : 0,
          width: width ,
          height: height ? height : 50,
          backgroundColor: btnColor ? btnColor : '#fafafa',
          borderRadius: borderRadius ? borderRadius : 10,
          borderColor: borderColor ? borderColor : '#f0f0',
          marginTop: marginTop ? marginTop : 10,
          paddingHorizontal: paddingHorizontal ? paddingHorizontal :0,
        },
      ]}>
        {
          iconImage&&<Image
          style={{height: iconImageSize? iconImageSize: 20, width: iconImageSize?iconImageSize:20, marginHorizontal: 2,}}
          tintColor={tintColor?tintColor:colors.white}
          resizeMode="contain"
          source={imageSource}
        />
        }
      {!isLoading && prefixIcon &&  (
       <View 
       style={styles.icon}>

         {/* <Icon
           name={iconName}
           size={iconSize}
           color={iconColor}
           iconFamily={iconFamily}
         /> */}
       </View>
      )}
      {!isLoading ? (
        <Text
          style={[
            styles.btnTextColor,
            {color: btnTextColor, fontSize: fontSize && fontSize,marginHorizontal:0,fontFamily:fontFamily&&fontFamily},
          ]}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator size={'small'} />
      )}
      {!isLoading && suffixIcon &&  (
        <View 
        style={styles.icon}>

          {/* <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
            iconFamily={iconFamily}
          /> */}
        </View>
      )}
    </TouchableOpacity>
  );
}
