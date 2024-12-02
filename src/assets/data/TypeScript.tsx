import { Dimensions } from "react-native";

export const {height, width} = Dimensions.get('screen');
export function fontSize(font: number) {
    return font / (430 / width);
  }