import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../../components/customIcon/CustomIcon'
import { colors } from '../../assets/data/colors'
import { fontSize } from '../../assets/data/TypeScript'
import { useNavigation } from '@react-navigation/native'

const ProfileHeader = (data:any) => {
    const navigation:any = useNavigation();
    console.log(": ------------ ",data);
    
  return (
    <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',gap:10,
    }}>
    <View  style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',gap:20,
    }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          size={fontSize(25)}
          name={'arrow-back-outline'}
          color={'#000'}
          iconFamily={'ionic'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('AddFriendsScreen')} style={{}}>
        <Icon
          name="search1"
          iconFamily="antDesign"
          size={24}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>

    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',gap:20,
    }}>
      <TouchableOpacity>
        <Icon
          name="bell"
          iconFamily="octicons"
          size={24}
          color={colors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>navigation.navigate('SettingsScreen', {profilex:data})}
      >
        <Icon
          name="setting"
          iconFamily="antDesign"
          size={24}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default ProfileHeader