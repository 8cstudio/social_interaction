import { StyleSheet } from 'react-native';
import { Colors, scale } from './theme';

export type StyleSheetParams =
  | Partial<{
      currentUser: boolean;
      top: number;
      bottom: number;
    }>
  | undefined;

/**
 * A StyleSheet object that contains all of the application's styles.
 * @param {ThemeMode} theme - The theme of the application.
 * @returns {StyleSheet} - A StyleSheet object containing all of the application's styles.
 */
const styles = (params: StyleSheetParams = {}) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
    },
    screenBackground: {
      flex: 1,
      paddingBottom: params.bottom,
    },
    container: {
      flex: 1,
      paddingTop: params.top,
      paddingHorizontal: scale(16),
      marginBottom: scale(24),
    },
    buttonContainer: {
      flexDirection: 'row',
      borderRadius: scale(10),
      alignItems: 'center',
      overflow: 'hidden',
    },
    listItemContainer: {
      width:'100%'
    },
    listItemWidth: {
      // width: '100%',
      flexDirection:'row',
      // justifyContent:'center',
      alignItems:'center',
    },
    buttonImage: {
      height: '100%',
      width: '100%',
    },
    staticWaveformView: {
      // flex: 1,
      width:'63%',
      height: 30,
      paddingEnd: 5,
    },
    playBackControlPressable: {
      height: 24,
      width: 24,
      padding: 5,
    },
    recordAudioPressable: {
      height: scale(40),
      width: scale(40),
      padding: scale(8),
    },
    liveWaveformContainer: {
      flexDirection: 'row',
      marginBottom: scale(8),
      borderRadius: scale(8),
      alignItems: 'center',
      paddingHorizontal: scale(16),
    },
    simformImage: {
      height: scale(50),
      width: scale(200),
    },
    liveWaveformView: {
      flex: 1,
      borderWidth: scale(0.5),
      borderRadius: scale(8),
      paddingHorizontal: scale(10),
    },
    buttonImageLive: {
      height: '100%',
      width: '100%',
      tintColor: Colors.pink,
    },
    simformImageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      color: Colors.black,
    },
  });

export default styles;
