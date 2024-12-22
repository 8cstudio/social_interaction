import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../assets/data/colors';
import Icon from '../customIcon/CustomIcon';
import {useNavigation} from '@react-navigation/native';
// import {fonts, fontsInter} from '../../assets/data/fonts';
// import {SvgObjPath1, SvgObjPath2} from '../svg/SVG';
// import {svgobj1, svgobj2} from '../../assets/data/svgobj';
// import {elevation2, fontSize, uid} from '../../assets/data/TypeScript';
import CustomTextInput from '../textInput/CustomTextInput';
import { elevation3, fontSize } from '../../assets/data/TypeScript';
import { SvgObjPath1 } from '../svgs/SVG';
import { svgobj1 } from '../../assets/data/svgobj';
// import {svgobj} from '../../assets/data/svg1';

const Header2 = ({
  rigtText,
  centerSearch,
  title,
  backIcon,
  fontFamily,
  paddingHorizontal,
  newBackIcon,
  onbackPress,
  rightIcon,
  name,
  iconFamily,
  size,
  color,
  rightIconPress,
  paddingBottom,
  onPress,
  backIconcolor,
  tick,
  save,
  edit,
  setEdit,
  person,
  endText,
  onDelete,
  groupId,
  fs,
  editItems,
  pressEdit,
  noset,
  setSearch,
  handleSearch
}: any) => {
  const navigation: any = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        //  backgroundColor: colors.white,
        paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
      }}>
      {backIcon ? (
        <TouchableOpacity
          onPress={() =>
            onPress
              ? onPress()
              : edit && edit !== ''
              ? setEdit('')
              : navigation.goBack()
          }>
          <Icon
            size={fontSize(25)}
            name={'chevron-back-outline'}
            color={!backIconcolor ? backIconcolor : '#000'}
            iconFamily={'ionic'}
          />
        </TouchableOpacity>
      ) : backIconcolor ? (
        <TouchableOpacity
          onPress={() =>
            onPress
              ? onPress()
              : edit !== ''
              ? setEdit('')
              : navigation.goBack()
          }>
          <Icon
            size={fontSize(25)}
            name={'chevron-back-outline'}
            color={'#FFF'}
            iconFamily={'ionic'}
          />
        </TouchableOpacity>
      ) : newBackIcon ? (
        <TouchableOpacity
          onPress={() =>
            onPress
              ? onPress()
              : edit && edit !== ''
              ? setEdit('')
              : navigation.goBack()
          }>
          <Icon
            size={25}
            name={'arrow-back-outline'}
            color={'#000'}
            iconFamily={'ionic'}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: title === 'Cart' ? 75 : 0}}></View>
      )}

      {centerSearch && (
        <View
          style={{
            width: '60%',
            backgroundColor: colors.white,
            ...elevation3,
            borderRadius: 15,
          }}>
          <CustomTextInput
          onChangeText={handleSearch}
            height={50}
            placeholder="Search"
            // svg={svgobj.search}
          />
        </View>
      )}
      {title && (
        <Text
          style={{
            // marginRight: 20,
            color: colors.black,
            fontSize: fs ? fontSize(fs) : fontSize(25),
            // fontFamily: fontsInter.f700,
          }}>
          {title}
        </Text>
      )}
      {title === 'Notifications Settings' &&!noset ?  (
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationsSettings')}
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.black,
            borderRadius: 18,
          }}>
          {/* <SvgObjPath2
            icon={svgobj2.setting}
            stroke1={colors.white}
            stroke2={colors.white}
          /> */}
        </TouchableOpacity>
      ) : tick ? (
        <TouchableOpacity
          onPress={() => save()}
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.blueText,
            borderRadius: 18,
          }}>
          <SvgObjPath1 icon={svgobj1.tick} stroke={colors.white} />
        </TouchableOpacity>
      ) : person ? (
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            borderRadius: 18,
            backgroundColor: colors.black,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <SvgObjPath1 icon={svgobj1.personIcon} stroke={colors.white} /> */}
        </TouchableOpacity>
      ) : 
      
    //   endText && uid === groupId ? (
    //     <TouchableOpacity onPress={onDelete}>
    //       <Text
    //         style={{
    //           fontSize: fontSize(15),
    //           color: colors.black,
    //         //   fontFamily: fontsInter.f500,
    //         }}>
    //         Ends
    //       </Text>
    //     </TouchableOpacity>
    //   ) :
      
      rigtText ? (
        <Text
          style={{
            fontSize: 15,
            color: colors.black,
            // fontFamily: fontsInter.f600,
          }}>
          Done
        </Text>
      ) : rightIcon ? (
        <TouchableOpacity onPress={rightIconPress}>
          <Icon name={name} iconFamily={iconFamily} size={size} color={color} />
        </TouchableOpacity>
      ) : editItems && editItems.length > 1 ? (
        <TouchableOpacity onPress={pressEdit}>
          <Text
            style={{
              // marginRight: 20,
              color: editItems === 'DONE' ? colors.black : colors.orange,
              fontSize: fontSize(14),
            //   fontFamily: fontsInter.f500,
              textDecorationLine: 'underline',
              width: 75,
              textAlign: 'right',
            }}>
            {editItems}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{width: backIcon || newBackIcon ? 25 : 0}}></View>
      )}
    </View>
  );
};

export default Header2;
