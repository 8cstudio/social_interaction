import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    btnsView:{
        flexDirection:'row',
        paddingBottom:30,
        alignSelf:'center',
        gap:10,
    },
    fabContainer: {
      position: 'absolute',
      left: 16,
      top: 20,
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
    //   marginLeft: 16,
      // marginBottom: 8,
      
    //   paddingVertical:10,
    //   paddingHorizontal:5,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuOpen: { 
      position: 'absolute',
       left: 0,
      marginLeft:16,
  
      top: 20,backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingVertical:10,
      paddingHorizontal:5,
      borderRadius:100,
      gap:10,
    },
})