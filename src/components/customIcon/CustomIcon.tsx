import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const Icon = ({name, color, size, iconFamily}: any) => {
  return (
    <View style={{padding: 0}}>
      {iconFamily === 'fontAwesome5' ? (
        <FontAwesome5Icon name={name} size={size} color={color} />
      ) : iconFamily === 'antDesign' ? (
        <AntDesign name={name} size={size} color={color} />
      ) : iconFamily === 'ionic' ? (
        <Ionicons name={name} size={size} color={color} />
      ) : iconFamily === 'fontAwesome' ? (
        <FontAwesome name={name} size={size} color={color} />
      ) : iconFamily === 'Fontisto' ? (
        <Fontisto name={name} size={size} color={color} />
      ) : iconFamily === 'feather' ? (
        <Feather name={name} size={size} color={color} />
      ) : iconFamily === 'material' ? (
        <MaterialIcons name={name} size={size} color={color} />
      ) : iconFamily === 'fontAwesome6' ? (
        <FontAwesome6 name={name} size={size} color={color} />
      ) : iconFamily === 'entypo' ? (
        <Entypo name={name} size={size} color={color} />
      ) : iconFamily === 'octicons' ? (
        <Octicons name={name} size={size} color={color} />
      ) 
      : iconFamily === 'EvilIcons' ? (
        <Octicons name={name} size={size} color={color} />
      )
      : iconFamily === 'SimpleLineIcons' ? (
        <SimpleLineIcons name={name} size={size} color={color} />
      )
       : (
        <MaterialCommunityIcons name={name} size={size} color={color} />
      )}
    </View>
  );
};
export default Icon;
