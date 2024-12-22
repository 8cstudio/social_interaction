import {StyleSheet} from 'react-native';
import {fonts, fontsInter} from '../../assets/data/fonts';
import {colors} from '../../assets/data/colors';

export const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    fontFamily: fontsInter.f400,
    color: colors.grey,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  option: {fontSize: 15, fontFamily: fontsInter.f700, color: colors.black},
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
    alignItems: 'center',
    marginHorizontal: -30,
    marginTop: 30,
  },
  buttonbox: {
    height: 160,
    width: 160,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 18, fontFamily: fonts.f300, color: colors.black},
});
