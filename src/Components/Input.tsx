import moment from 'moment';
import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from 'react-native-paper';
import { Colors } from '../Utils/Colors';
import { Size } from '../Utils/Size';
import { Strings } from '../Utils/Strings';

interface InputProps {
    label: string,
    placeholder?: string,
    value: string,
    onChange: (text: string) => void,
    keyboardType?: KeyboardTypeOptions,
    isDatePicker?: boolean
}

export const Input = (props: InputProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        props.onChange(moment(date).format("DD MMM YYYY"))
        hideDatePicker();
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                mode="outlined"
                onPressOut={() => {
                    if (props.isDatePicker)
                        showDatePicker()
                }}
                editable={!props.isDatePicker}
                label={props.label}
                placeholder={props.placeholder ?? Strings.enter + props.label}
                value={props.value}
                onChangeText={props.onChange}
                placeholderTextColor={Colors.black_30}
                keyboardType={props.keyboardType ?? 'default'}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        marginTop: Size._10
    }
})