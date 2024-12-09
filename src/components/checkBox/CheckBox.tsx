import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CheckBox = ({
  newq,
  initialState = false,
  onCheck,
  selected,
  index,
}: any) => {
  const [checked, setChecked] = useState(selected);
  // const [newq, setNew] = useState(newDesign);
  const handleCheck = () => {
    const newState = !checked;
    setChecked(newState);
    onCheck&&onCheck(newState);
  };
  return (
    <TouchableOpacity
      disabled={index === -1}
      hitSlop={{left: 150, right: 100, top: 20, bottom: 20}}
      // disabled={!==1}
      activeOpacity={0.6}
      onPress={handleCheck}
      style={[
        {
          width: newq ? 25 : 17,
          height: newq ? 25 : 17,
          borderRadius: newq ? 4 : 2,
          borderWidth: 2,
          borderColor: newq ? '#CED2DA' : '#000',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 4,
        },
        checked || selected ? {backgroundColor: '#000', borderWidth: 0} : null,
      ]}>
      {checked || selected ? (
        <AntDesign name="check" size={14} color={'#fff'} />
      ) : null}
    </TouchableOpacity>
  );
};
export default CheckBox;
const styles = StyleSheet.create({
  checkbox: {
    // width: newq? 30 : 17,
    height: 17,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
