import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import { colors } from '../../assets/data/colors';
import Icon from '../customIcon/CustomIcon';
import CheckBox from '../checkBox/CheckBox';

export default function SettingsOption({
  title,
  iconRight,
  iconCheck,
  iconSwitch,
  onSwitchPress,
  onPress,
  checkBox,
  check,
  setCheck,
  marginTop,
  marginBottom,
}: any) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={[
        {
          marginTop: marginTop ? marginTop : 15,
          marginBottom: marginBottom ? marginBottom : 0,
          height: 60,
          borderRadius: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
          borderColor: colors.inputBorder,
          borderWidth: 1,
          // marginVertical: 5,
        },
      ]}>
      <Text
        style={{
          color: colors.black,
          fontSize: 13,
        //   fontFamily: fontsInter.f500,
        }}>
        {title}
      </Text>
      {iconRight && (
        <TouchableOpacity onPress={onPress}>
          <Icon
            name={'chevron-right'}
            color={colors.black}
            iconFamily={'feather'}
            size={20}
          />
        </TouchableOpacity>
      )}
      {iconCheck && (
        <Icon
          name={'checkmark-circle'}
          iconFamily={'ionic'}
          color={colors.lightBlue}
          size={20}
        />
      )}
      {iconSwitch && (
        <Switch
          trackColor={{false: '#D9D9D9', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={onSwitchPress}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}
      {checkBox && <CheckBox newq check={check} onCheck={setCheck} />}
    </View>
  );
}
const styles = StyleSheet.create({
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
