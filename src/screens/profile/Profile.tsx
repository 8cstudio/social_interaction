import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from '../../components/customIcon/CustomIcon';
import {fontSize} from '../../assets/data/TypeScript';
import {colors} from '../../assets/data/colors';

const Profile = ({navigation}: any) => {
  return (
    <SafeAreaView style={{flex: 1, padding:20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',gap:10,
        }}>
        <View  style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',gap:10,
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              size={fontSize(25)}
              name={'arrow-back-outline'}
              color={'#000'}
              iconFamily={'ionic'}
            />
          </TouchableOpacity>

          <TouchableOpacity>
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
          justifyContent: 'space-between',gap:10,
        }}>
          <TouchableOpacity>
            <Icon
              name="bell"
              iconFamily="octicons"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="setting"
              iconFamily="antDesign"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;
