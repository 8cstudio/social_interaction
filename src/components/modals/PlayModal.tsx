import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../assets/data/colors';
import {svg} from '../../assets/data/svg';
import {SVG} from '../svg/SVG';
import {
  onPausePlay,
  onResumePlay,
  onStartPlay,
  onStopPlay,
} from '../../screens/chatScreen/functions';
import Icon from '../customIcon/CustomIcon';

const PlayModal = ({
  visible,
  message,
  onPress,
  backgroundColor,
  onRequestClose,
  onCancel,
  title,
  Cancel,
  uri,
}: any) => {
  const [playback, setPlayBack] = useState({
    current: Dimensions.get('window').width - 110,
    total: 0,
    play: false,
    pause: true,
  });
  function close() {
    onRequestClose();
    playback.play && onStopPlay();
    setPlayBack({
      current: Dimensions.get('window').width - 110,
      total: 0,
      play: false,
      pause: true,
    });
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={close}>
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: backgroundColor || colors.white, // Default background color is white
            padding: 20,
            borderRadius: 10,
            width: Dimensions.get('window').width - 40,
            // alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              width: '100%',
              color: colors.textColor,
              alignSelf: 'flex-start',
              marginBottom: 5,
            }}>
            {title}
          </Text>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            {playback.pause ? (
              <TouchableOpacity
                hitSlop={15}
                style={{marginTop: 3}}
                onPress={() => {
                  playback.play
                    ? onResumePlay(setPlayBack)
                    : onStartPlay(uri, setPlayBack);
                }}>
                <SVG
                  icon={svg.play}
                  height={24}
                  width={24}
                  color={colors.grey}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                hitSlop={15}
                onPress={() => {
                  onPausePlay(setPlayBack);
                }}>
                <SVG
                  icon={svg.pause}
                  height={24}
                  width={24}
                  color={colors.grey}
                />
              </TouchableOpacity>
            )}
            <View
              style={{
                height: 2,
                width: playback.total,
                backgroundColor: colors.green,
              }}
            />
            <View
              style={{
                height: 2,
                width: playback.current,
                backgroundColor: colors.grey,
              }}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default PlayModal;
