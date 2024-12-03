import {StyleSheet} from 'react-native';
import { colors } from '../../assets/data/colors';

export const styles = StyleSheet.create({
  error: {
    alignSelf:'flex-start',
    color: colors.red,
    fontSize:10,
    // marginBottom: 10,
    marginLeft:4,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: '700',
    color: colors.headingColor,
  },
  description: {
    marginBottom: 15,
    textAlign: 'center',
    
    color:colors.lightGray1,
  },
  textInput: {
    margin: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    borderColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  orText: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialBox: {
    height: 65,
    width: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
