import React from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import Header2 from '../header2/Header2';
import { elevation2, fontSize } from '../functions/GlobalFunctions';
import { fontsInter } from '../../assets/fonts/Fonts';
import { SvgObjPath1 } from '../svgs/SVG';
import { svgobj1 } from '../../assets/data/svgobj';

const Percentage = ({
  visible,
  message,
  onPress,
  backgroundColor,
  onRequestClose,
  onCancel,
  title,
  Cancel,
  progress,
  size,
  type,
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.backgroungColor,
        }}>
        <Header2 newBackIcon onPress={onCancel} paddingHorizontal={40} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              gap: 35,
              marginBottom: 35,
            }}>
            <Text
              style={{
                fontSize: fontSize(25),
                color: colors.black,
                fontFamily: fontsInter.f700,
              }}>
              Upload Content
            </Text>
            <Text
              style={{
                color: colors.textPlaceholder,
                fontFamily: fontsInter.f500,
                fontSize: fontSize(16),
                width: '100%',
                textAlign: 'center',
              }}>
              Chose your Fav Content to upload on kenna logo
            </Text>
          </View>
          <TouchableOpacity
            //  onPress={uploadPdf}
            disabled
            style={[
              {
                backgroundColor: backgroundColor || colors.white, // Default background color is white
                padding: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.viewBorder,
                gap: 10,
                alignItems: 'center',
                width: '100%',
              },
              elevation2,
            ]}>
            <SvgObjPath1
              icon={svgobj1.fileType}
              stroke={colors.viewBorder}
              fill={colors.white}
              text={'.MP4'}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: fontSize(14),
                  fontFamily: fontsInter.f500,
                  textAlign: 'center',
                }}>
                Uploading...
              </Text>
              <View style={{flexDirection: 'row', gap: 4}}>
              <Text style={{color: colors.black, fontSize: fontSize(15), fontFamily: fontsInter.f500}}>{progress}%</Text>
                <ActivityIndicator size={'small'} color={colors.viewBorder} />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  {
                    backgroundColor: colors.lightBlue,
                    width: `${progress}%`,
                    height: 6,
                    borderRadius: 3,
                  },
                ]}
              />
              <View
                style={[
                  {
                    backgroundColor: colors.backgroungColor,
                    width: `${100 - progress}%`,
                    height: 6,
                    borderRadius: 3,
                  },
                ]}
              />
            </View>
            <Text
              style={{
                color: colors.gray,
                fontSize: fontSize(12),
                fontFamily: fontsInter.f400,
                textAlign: 'center',
                alignSelf: 'flex-start',
              }}>{`${Math.round((progress / 100) * size)}MB of ${Math.round(
              size,
            )}MB `}</Text>
          </TouchableOpacity>
        </View>
        {/* <MyCustomTabBar top={undefined} activeTab={2} /> */}
      </SafeAreaView>
      {/* <Percentage title={"Uploading"} message={`Upload Progress $}%`} visible={modalVisible} onPress={()=>setModalVisible(false)} /> */}
    </Modal>
  );
};

export default Percentage;
