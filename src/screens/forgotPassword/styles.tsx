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
  title: {
    marginVertical: 15,
    fontSize: 30,
    fontWeight: '700',
    color: colors.headingColor,
    
    marginTop:-60,
  },
  description: {
    marginBottom: 15,
    textAlign: 'center',

    color: colors.lightGray1,
  },
});
