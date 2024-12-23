import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { svg1 } from "../../assets/data/svg1";

export const SVG1 = ({icon, width, height, black, text ,color}: any) => {
    return (
      <View style={styles.container}>

            <Svg
              width={width}
              height={height}
              //   viewBox="0,0,50,50"
            >
              {/* <LinearGradient id="gradi" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.textColor} />
                <Stop offset="0.5" stopColor={colors.textColor} />
                <Stop offset="1" stopColor={colors.textColor} />
              </LinearGradient> */}
              <Path d={svg1.custom.path1} fill="black" stroke="black" stroke-width="2.28049" />
              <Path d={svg1.custom.path2} stroke="black" stroke-width="2.28049"/>
              <Path d={svg1.custom.path3} stroke="black" stroke-width="2.28049" />
            </Svg>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 2, // backgroundColor: 'yellow', // Set the background color of the container
    },
  });