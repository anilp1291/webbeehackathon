import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Input, ToggleButton } from '../../Components';
import { RemoveButton } from '../../Components/RemoveButton';
import { AttributeValue, AttrType, MachineItem } from '../../Domain/interfaces';
import { removeMachine, updateMachine } from '../../Redux/MainReducer';
import { Size } from '../../Utils/Size';

interface GetAttrComponentProps {
    attrValue: AttributeValue,
    onChange: (text: string) => void
}
interface MachineItemComponentProps {
    item: MachineItem,
    index: number
}

const GetAttrComponent = ({ attrValue, onChange }: GetAttrComponentProps) => {

    if (attrValue.type === AttrType.CHECKBOX) {
        return <ToggleButton
            value={attrValue.value === '1'}
            onChange={(flag) => onChange(flag ? "1" : "0")}
            label={attrValue.title}
        />
    }
    if (attrValue.type === AttrType.NUMBER) {
        return <Input
            label={attrValue.title}
            value={attrValue.value}
            keyboardType='decimal-pad'
            onChange={onChange}
        />
    }
    if (attrValue.type === AttrType.DATE) {
        return <Input
            label={attrValue.title}
            value={attrValue.value}
            onChange={onChange}
            isDatePicker
        />
    }

    return <Input
        label={attrValue.title}
        value={attrValue.value}
        onChange={onChange}
    />
}

export const MachineItemComponent = ({ item, index }: MachineItemComponentProps) => {
    const dispatch = useDispatch()
    return (
        <Card key={item.id} style={{ margin: Size._14, padding: Size._10 }}>
            <Text variant='titleMedium'>{!!item.title ? item.title : 'Unnamed Field'}</Text>
            {item.attrFields.map((attrItem, attrIndex) => {
                return <View key={attrItem.id} style={{ width: '100%' }}>
                    <GetAttrComponent attrValue={attrItem} onChange={(value) => {
                        const newList = [...item.attrFields]
                        let title = item.title
                        if (attrItem.isTitleField) {
                            if (attrItem.type === AttrType.CHECKBOX) {
                                title = value === "1" ? 'true' : 'false'
                            } else {
                                title = value
                            }
                        }
                        newList[attrIndex].value = value

                        dispatch(updateMachine({ ...item, title, attrFields: newList }))
                    }} />
                </View>
            })}
            <RemoveButton onPress={() => {
                dispatch(removeMachine(item.id))
            }} />
        </Card>
    );
}
