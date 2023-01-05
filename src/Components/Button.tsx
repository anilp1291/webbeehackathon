import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
    title: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
}

export const Button = (props: ButtonProps) => (
    <PaperButton style={props.style} labelStyle={props.labelStyle} mode='contained' onPress={props.onPress}>
        {props.title}
    </PaperButton>
)