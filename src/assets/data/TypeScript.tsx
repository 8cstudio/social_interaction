import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  export  const insect = useSafeAreaInsets();

  export const formatTime = (timestamp: any) => {
    if (!timestamp?.seconds) {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  export function formatSecondsToMinutes(seconds: any) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    // Add leading zeros if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }