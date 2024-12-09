import { StyleSheet } from "react-native";
import { colors } from "../../assets/data/colors";

 export const styles = StyleSheet.create({
  error: {
    alignSelf:'flex-start',
    color: colors.red,
    fontSize:10,
    // marginBottom: 10,
    marginLeft:4,
  },
  container:{
    flex:1,
    // backgroundColor:colors.backgroungColor,
  },
  innerContainer:{alignItems:'center', flex:1,},
    title: {
        fontSize: 25,
        // fontFamily: fontsInter.f700,
        textAlign:'center',
        color: colors.headingColor,
      },
      discription: {
        textAlign: 'center',
        marginTop:10,
        fontSize:18,
        // fontFamily: fontsInter.f300,
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
    // fontFamily: fontsInter.f500,
    color: colors.black,
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