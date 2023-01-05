import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../Assets/Icons';
import { Size, SizeVertical } from '../Utils/Size';

interface RemoveIconProps {
    onPress: () => void,
}

export const RemoveIcon = (props: RemoveIconProps) => (
    <TouchableOpacity onPress={props.onPress} style={Styles.container}>
        <Image source={Icons.remove} style={Styles.image} />
    </TouchableOpacity>
)
const Styles = StyleSheet.create({
    container: { marginTop: Size._10, marginLeft: Size._14 },
    image: { height: SizeVertical._24, width: Size._24 }
})