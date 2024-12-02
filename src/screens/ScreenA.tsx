import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const ScreenA = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
  
    }}>
      <Text style={{color:'#000'}}>ScreenA</Text>
    </SafeAreaView>
  )
}

export default ScreenA