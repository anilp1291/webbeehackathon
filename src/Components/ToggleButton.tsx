import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { Colors } from '../Utils/Colors';
import { Size } from '../Utils/Size';

interface ToggleButtonProps {
    label: string,
    value: boolean,
    onChange: (value: boolean) => void,
}

export const ToggleButton = (props: ToggleButtonProps) => (
    <View style={styles.container}>
        <Switch
            value={props.value}
            onValueChange={props.onChange}
        />
        <Text style={styles.text}>{props.label}</Text>
    </View>
)
const styles = StyleSheet.create({
    container: {
        marginTop: Size._10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: Size._14,
        color: Colors.black,
        marginLeft: Size._10
    }
})