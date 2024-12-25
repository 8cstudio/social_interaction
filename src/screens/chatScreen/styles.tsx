import {StyleSheet} from 'react-native';
import {colors} from '../../assets/data/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroungColor
  },
  buttonText: {
    flex:1,
    color: 'black',
    fontSize: 20,
    textAlign:'center'
  },
  messageText: {
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginVertical:20
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: 35,
    height: 35,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  input: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 22.5,
    paddingHorizontal: 10, 
    backgroundColor: colors.white
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.black,
    width: '100%',
  },
  msgContainer: {
    marginVertical: 5,
    width: '80%',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  profileSection: {
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  currentUserMsg: {
    // width:'30%',
    marginRight: 11,
    padding: 10,
    // borderRightWidth:2,
    backgroundColor: 'rgba(255, 192, 203, 0.5)',
    // borderColor:'rgba(255, 192, 203)',
    width: '80%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    // borderRadius:10,
    alignSelf:'flex-end',
  },
  otherUserMsg: {
    alignSelf:'flex-end',
    marginLeft: 5,
    padding: 10,
    width: '80%',
    // borderColor: '#00008B',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    // borderRadius:5
  },
});
