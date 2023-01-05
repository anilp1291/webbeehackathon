import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Size } from "./Size";


export const CommonStyle= StyleSheet.create({
    h1:{
        fontSize:Size._28,
        fontWeight:'bold',
        color:Colors.black,
    },
    h2:{
        fontSize:Size._24,
        fontWeight:'bold',
        color:Colors.black,
    },
    h3:{
        fontSize:Size._20,
        fontWeight:'bold',
        color:Colors.black,
    },
    h4:{
        fontSize:Size._20,
        fontWeight:'bold',
        color:Colors.black,
    }
})