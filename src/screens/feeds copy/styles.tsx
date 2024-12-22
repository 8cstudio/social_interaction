import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../assets/data/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts } from '../../assets/data/fonts';
// const insects = useSafeAreaInsets();

export const styles = StyleSheet.create({
  preview: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: 'red',
    overflow: 'hidden',
    justifyContent:'center',
    alignItems:'center',
    // alignSelf: 'center',
    // margin: 40,
  },
  backgroundVideo: {
  },
  container: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContent: {
    top:40,bottom:80,right:20,
    position:'absolute',
    // width: '20%',
    // paddingVertical: 10,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  profileIconContainer: {
    alignItems: 'center',
  },
  profileIconWrapper: {
    height: 35,
    width: 35,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    height: 35,
    width: 35,
  },
  badge: {
    height: 18,
    width: 18,
    backgroundColor: colors.pink,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
  },
  addText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 5,
  },
  likeCommentContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 10,
  },
  commentText: {
    color: colors.white,
    textAlign: 'center',
  },
  likeText: {
    color: colors.white,
    textAlign: 'center',
  },
  shareText: {
    color: colors.white,
    textAlign: 'center',
  },
  cameraButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    backgroundColor: colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    height: 35,
    width: 35,
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
  modal:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContentContainer:{
    backgroundColor: 'white',
    height: '70%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeModal:{
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 5,
    top: 5,
  },
  divider:{
    height: 2,
    width: '100%',
    backgroundColor: colors.lightGrey,
  },
  writeCommentContainer:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  commentElements:{
    height: 40,
    marginVertical: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex:1
  },
  buttonText: {
    flex:1,
    color: 'black',
    fontSize: 20,
    fontFamily: fonts.f700,
    textAlign:'center'
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes the overlay cover the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: semi-transparent background
    pointerEvents:'none'
  },
});
