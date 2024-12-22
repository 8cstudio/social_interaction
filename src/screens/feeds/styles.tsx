import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../assets/data/colors";
import { fontsInter } from "../../assets/fonts/Fonts";

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    justifyContent: 'center',
    padding:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    // marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color:colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 12,
    color: colors.black,
  },
  closeButton: {
    // marginTop: 20,
    padding: 5,
    backgroundColor: colors.red,
    borderRadius: 50,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
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
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes the overlay cover the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: semi-transparent background
    pointerEvents:'none'
  },
  profileIconWrapper: {
    height: 28,
    width: 28,
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
    justifyContent:'center',
    alignItems: 'center'
  },
  likeText: {
    color: colors.white,
    textAlign: 'center',
  },
  shareText: {
    color: colors.white,
    textAlign: 'center',
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
      fontFamily: fontsInter.f700,
      textAlign:'center'
    },
});

