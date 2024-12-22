import { Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../assets/data/colors';
import { fontSize } from '../../assets/data/TypeScript';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
      position: 'absolute',
      // width: '50%',
      // height: '45%',
      // backgroundColor:'red',
      // alignItems: 'flex-end',
      // justifyContent: 'space-between',
      // top:55,
      right: 20,
      // backgroundColor:'red',
  },
  backgroundVideo: {
    // height: Dimensions.get('window').height-70,
    // width: Dimensions.get('window').width,
    flex: 1,
    // resizeMode:'cover',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileButton: {
    height: 32,
    width: 32,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  rightIcons: {
    width: 35,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
  },
  icon: {
    height: 20,
    width: 20,
  },
  icon1: {
    height: 25,
    width: 25,
    marginVertical: 10,
  },
  shareText: {
    color: colors.white,
    fontSize: 10,
  },
  shareOptions: {
    height: 110,
    width: 35,
    backgroundColor: '#FFFFFF66',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    position: 'absolute',
    bottom: -110,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  shareOptionIcon: {
    height: 30,
    width: 30,
  },
  bottomLenses: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  capturedBottom: {
    height: 80,
    width: 80,
    backgroundColor: colors.black,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: colors.white,
    position: 'absolute',
  },
  playButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  playButton: {
    width: 50, // Adjust size as necessary
    height: 50, // Adjust size as necessary
  },
  shareView: {
    height: 110,
    width: 35,
    backgroundColor: '#FFFFFF66',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    position: 'absolute',
    bottom: -100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  shareIcon: {
    height: 30,
    width: 30,
  },
  sliderContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal:20,
    backgroundColor:colors.black
  },
  slider: {
    width: '100%',
    height: 40,
  },
  colorPicker: {
    width: 200,
    marginBottom: 20,
  },
  input: {
    height: fontSize(94),
    borderColor: colors.white,
    borderWidth: 2,
    width: fontSize(252),
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
