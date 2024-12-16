import { Platform } from "react-native";

export const fontsInter = Platform.OS === 'ios'?{
    f100:'Inter 18pt Thin',
    f200:'Inter 18pt ExtaLight',
    f300:'Inter 18pt Light',
    f400:'Inter 18pt Regular',
    f500:'Inter 18pt Medium',
    f600:'Inter 18pt SemiBold',
    f700:'Inter 18pt Bold',
    f800:'Inter 18pt ExtraBold',
    f900:'Inter 18pt Black',
} : {
    f100:'Inter_100',
    f200:'Inter_200',
    f300:'Inter_300',
    f400:'Inter_400',
    f500:'Inter_500',
    f600:'Inter_600',
    f700:'Inter_700',
    f800:'Inter_800',
    f900:'Inter_900',
}