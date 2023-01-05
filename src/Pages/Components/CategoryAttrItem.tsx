import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Input } from '../../Components';
import { AttrTypeMenu } from '../../Components/AttrTypeMenu';
import { RemoveIcon } from '../../Components/RemoveIcon';
import { Attribute, Category } from '../../Domain/interfaces';
import { updateCategory } from '../../Redux/MainReducer';
import { Size } from '../../Utils/Size';
import { Strings } from '../../Utils/Strings';

interface CategoryItemProps {
    mainCategory: Category,
    item: Attribute,
    index: number
}

export const CategoryAttrItem = ({ mainCategory, item: attrItem, index: attrIndex }: CategoryItemProps) => {
    const dispatch = useDispatch()
    return (<View key={attrItem.type + "_" + attrIndex} style={Styles.container}>
        <View style={{ flex: 1 }}>
            <Input
                label={Strings.field}
                placeholder={Strings.fieldName}
                value={attrItem.title}
                onChange={(text) => {
                    const newList = [...mainCategory.attrs]
                    newList[attrIndex].title = text
                    dispatch(updateCategory({ ...mainCategory, attrs: newList }))
                }}
            />
        </View>
        <View style={Styles.changeButton}>
            <AttrTypeMenu selected={attrItem.type}
                onChange={(attr) => {
                    const newList = [...mainCategory.attrs]
                    newList[attrIndex].type = attr
                    dispatch(updateCategory({ ...mainCategory, attrs: newList }))
                }}
            />
        </View>
        <RemoveIcon onPress={() => {
            const newList = [...mainCategory.attrs]

            if (newList.length > 1) {
                let titleField = mainCategory.titleField === mainCategory.attrs[attrIndex].title ? 'UNNAMED FIELD' : mainCategory.titleField
                newList.splice(attrIndex, 1)
                dispatch(updateCategory({ ...mainCategory, attrs: newList, titleField }))
            }
        }} />
    </View>

    );
}

const Styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', width: '100%' },
    changeButton: { paddingHorizontal: Size._10, paddingTop: Size._10 }
})