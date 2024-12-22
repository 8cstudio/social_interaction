import {StyleSheet} from 'react-native';
import { width } from '../../assets/data/TypeScript';
import { colors } from '../../assets/data/colors';
import { fontsInter } from '../../assets/fonts/Fonts';

export const styles = StyleSheet.create({
  likesView: {justifyContent: 'center', alignItems: 'center'},
  btnsView:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    // paddingTop:20,
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
  error: {
    alignSelf:'flex-start',
    color: colors.red,
    fontSize:10,
    // marginBottom: 10,
    marginLeft:4,
  },
  container:{
    flex:1,
    backgroundColor:colors.backgroungColor,
  },
  innerContainer:{alignItems:'center', flex:1, marginTop:30},
    title: {
        fontSize: 25,
        fontFamily: fontsInter.f700,
        textAlign:'center',
        color: colors.headingColor,
      },
      discription: {
        textAlign: 'center',
        marginTop:10,
        fontSize:18,
        fontFamily: fontsInter.f300,
        color:colors.lightGray1,
      },
      profileIconBg:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        width: 130,
        borderRadius: 75,
        backgroundColor: '#E4E7EC',
        marginTop:30,
      },
      editIconBg:{
        position: 'absolute',
        bottom: 0,
        right: 15,
        height: 25,
        width: 25,
        backgroundColor: '#000',
        borderRadius: 5,
      },
      buttonsView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      },
      
  label:{
    fontSize: 15,
    fontFamily: fontsInter.f500,
    color: colors.labelText,
    alignSelf:'flex-start',
  },
  
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
