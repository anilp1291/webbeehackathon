import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Icons } from '../Assets/Icons';
import { Size, SizeVertical } from '../Utils/Size';
import { Strings } from '../Utils/Strings';

interface RemoveButtonProps {
    onPress: () => void,
}

export const RemoveButton = (props: RemoveButtonProps) => (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Image source={Icons.remove} style={{ height: SizeVertical._20, width: Size._20 }} />
        <Text style={{marginLeft:10}} variant='labelMedium'>{Strings.remove}</Text>
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    container: {
        marginTop: Size._10,
        flexDirection:'row',alignItems:'center'
    },
})