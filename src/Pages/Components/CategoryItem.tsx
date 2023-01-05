import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Input } from '../../Components';
import { AttrTypeMenu } from '../../Components/AttrTypeMenu';
import { AttrTypeModal } from '../../Components/AttrTypeModal';
import { RemoveIcon } from '../../Components/RemoveIcon';
import { Category } from '../../Domain/interfaces';
import { removeCategory, updateCategory } from '../../Redux/MainReducer';
import { Size } from '../../Utils/Size';
import { Strings } from '../../Utils/Strings';
import { CategoryAttrItem } from './CategoryAttrItem';

interface CategoryItemProps {
    item: Category,
    index: number
}

export const CategoryItem = ({ item, index }: CategoryItemProps) => {
    const [name, setName] = useState(item.title)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateCategory({ ...item, title: name }))
    }, [name])
    return (
        <Card key={item.id} style={Styles.card}>
            <Text style={Styles.text} variant='headlineSmall'>{!!name ? name : 'New Category'}</Text>
            <Input
                label={Strings.catName}
                placeholder={Strings.enter}
                value={name}
                onChange={setName}
            />
            {item.attrs.map((attrItem, attrIndex) => {
                return <CategoryAttrItem
                    key={attrItem.type + "_" + attrIndex}
                    mainCategory={item}
                    item={attrItem}
                    index={attrIndex}
                />
            })}
            <View style={{ marginTop: Size._10 }}>
                <AttrTypeModal
                    label={`Title Field: ` + (item.titleField ?? item.attrs[0].title ?? 'UNNAMED FIELD')}
                    onSelect={(text) => {
                        dispatch(updateCategory({ ...item, titleField: text }))
                    }}
                    list={item.attrs.map(item => item.title)}
                />
                <View style={{ marginTop: Size._10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <AttrTypeMenu label='ADD NEW FIELD' onChange={(attr) => {
                        const newList = [...item.attrs]
                        newList.push({
                            id: item.id + "_" + uniqueId('attrType_'),
                            title: '',
                            type: attr
                        })
                        dispatch(updateCategory({ ...item, attrs: newList }))
                    }} />
                    <RemoveIcon onPress={() => {
                        dispatch(removeCategory(index))
                    }} />
                </View>
            </View>
        </Card>
    );
}

const Styles = StyleSheet.create({
    card: { margin: Size._10, padding: Size._10 },
    text: { height: 40 }
})