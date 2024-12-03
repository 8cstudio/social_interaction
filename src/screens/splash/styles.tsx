import { StyleSheet } from "react-native";
import { fontSize } from "../../assets/data/TypeScript";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    bgImage: {
        flex:1,
        width:'100%',
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems: "center",
    },
    logo: {
        height: 82,
        width: fontSize(253),
    }
})