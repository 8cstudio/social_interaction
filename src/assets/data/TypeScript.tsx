import { Dimensions } from "react-native";

export const {height, width} = Dimensions.get('screen');
export function fontSize(font: number) {
    return font / (430 / width);
  }


  export const elevation3 = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 3.62,
  
    elevation: 9,
  };