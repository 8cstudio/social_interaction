import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header2 from '../../components/header2/Header2'
import SettingsOption from '../../components/settingOption/SettingsOption'

const StorageAndData = () => {
  return (
    <SafeAreaView style={{flex:1}}>

    <View style={{flex:1, paddingHorizontal:20}}>
        
      <Header2 newBackIcon title='Storage & Data'/>
        
      <SettingsOption marginBottom={15} marginTop={5} title={'Enable Download Option'} iconSwitch={true}/>
      {/* <SettingsOption marginBottom={15} marginTop={5} title={'Change Wallpaper'}  iconRight/> */}
    </View>
    </SafeAreaView>
  )
}

export default StorageAndData