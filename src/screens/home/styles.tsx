import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    left: 16,
    top: 60,
    // backgroundColor:'red',
    justifyContent:'center',
    alignItems: 'center',
    // alignSelf: 'flex-start',
  },
  fabItem: {
    // backgroundColor: 'gray',
    // width: 48,
    // height: 48,
    // borderRadius: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: 16,
    // marginBottom: 8,
  },
  fabToggle: {
    // marginLeft: 16,
    // marginBottom: 8,
    // backgroundColor: 'gray',
    // width: 48,
    // height: 48,
    // borderRadius: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  menuOpen: { 
    position: 'absolute',
     left: 0,
    marginLeft:16,

    top: 60,backgroundColor: 'rgba(128, 128, 128, 0.5)',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical:10,
    paddingHorizontal:5,
    borderRadius:100,
    gap:10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  cameraButton: {
    width: 64,
    height: 64,
    borderWidth:2,
    borderRadius: 32,
    borderColor: 'white',
  },
});
