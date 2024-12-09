import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import SettingsOption from '../../components/settingOption/SettingsOption'
import Header2 from '../../components/header2/Header2'

const ChatsSettings = () => {
  return (


    <SafeAreaView style={{flex:1}}>

    <View style={{flex:1, paddingHorizontal:20}}>
        
      <Header2 newBackIcon title='Chats Settings'/>
        
      <SettingsOption marginBottom={15} marginTop={5} title={'Dark Theme'} iconSwitch={true}/>
      <SettingsOption marginBottom={15} marginTop={5} title={'Change Wallpaper'}  iconRight/>
    </View>
    </SafeAreaView>
  )
}

export default ChatsSettings