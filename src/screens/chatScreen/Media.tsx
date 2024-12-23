import React, { useState } from 'react';
import {Image, Linking, Text, View} from 'react-native';
import PDF from 'react-native-pdf'; // Import your PDF component
import Video from 'react-native-video'; // Import your Video component
import { fontSize, formatSecondsToMinutes, width } from '../../assets/data/TypeScript';
import { colors } from '../../assets/data/colors';
import { SvgObjPath1 } from '../../components/svg/SVG';
import { svgobj1 } from '../../assets/data/svgobj';

const Media = React.memo(({uri, type, video, createdAt}: any) => {
  console.log(createdAt);
  
 const [time, setTime]: any = useState('')
  async function open(url: any) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      // Handle the case where no browser is installed
      console.warn('No browser app found to open the link');
    }
  }
  function handleLoad(meta: any){
    setTime(formatSecondsToMinutes(meta.duration));
    console.log(formatSecondsToMinutes(meta.duration));
    
  }
  switch (type) {
    case 'image':
      return (
        <>
        <Image
          source={{uri}}
          style={{height: 200, width: width/2.5, borderRadius: 20}}
        />
         <View style={{ position:'absolute', bottom:5,left:5, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
        
        <Text
              style={{
                flex:1,
                color: colors.white,
                fontSize: fontSize(11),
                textAlign: 'right',
                marginEnd:13
              }}>
              {createdAt}
            </Text>
        </View>
        </>
      );
    case 'pdf':
      return (
        <Image
          source={{uri}}
          resizeMode="cover"
          style={{width: 150, height: 200, borderRadius: 5}}
          // controls={false}
          // paused={true}
        />
        
      );
    case 'video':
      return (
        <>
          <Image
            source={{uri}}
            resizeMode="cover"
            style={{width: width/2.5, height: 200, borderRadius: 20}}
            // controls={false}
            // paused={true}
          />
          <Video
          source={{ uri: video }}
          onLoad={handleLoad}
        />
        <View style={{ position:'absolute', bottom:5,left:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={{gap:5, flexDirection:'row', alignItems:'center'}}>
        <SvgObjPath1 icon={svgobj1.video} stroke={colors.white}/>
        <Text style={{fontSize:fontSize(11), color:colors.white, }}>{time}</Text>
        </View>
        <Text
              style={{
                flex:1,
                color: colors.white,
                fontSize: fontSize(11),
                textAlign: 'right',
                marginEnd:13
              }}>
              {createdAt}
            </Text>
        </View>
        </>
      );
    default:
      return null;
  }
});

export default Media;
