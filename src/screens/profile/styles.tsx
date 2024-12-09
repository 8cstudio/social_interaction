import {StyleSheet} from 'react-native';
import { width } from '../../assets/data/TypeScript';

export const styles = StyleSheet.create({
  likesView: {justifyContent: 'center', alignItems: 'center'},
  btnsView:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    paddingTop:20,
    paddingBottom:20,
    width:'100%',
  },
  videoItem: {
    // backgroundColor: colors.red,
    width: width / 3 - 17,
    height: width / 3 - 17,
    marginVertical: 3,
    borderRadius: 10,
    padding: 5,
  },
  viewsText: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
