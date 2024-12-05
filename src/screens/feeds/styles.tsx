import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../assets/data/colors";

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    // marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color:colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 12,
    color: colors.black,
  },
  closeButton: {
    // marginTop: 20,
    padding: 5,
    backgroundColor: colors.red,
    borderRadius: 50,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

