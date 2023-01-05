import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { uniqueId } from 'lodash';
import * as React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Components';
import { NewCategory } from '../Domain/interfaces';
import { DrawerParamList } from '../Navigation/AppNavigator';
import { RouteNames } from '../Navigation/RouteNames';
import { addCategory } from '../Redux/MainReducer';
import { selectCategory } from '../Redux/Store';
import { Size } from '../Utils/Size';
import { CategoryItem } from './Components/CategoryItem';


type Props = NativeStackScreenProps<DrawerParamList, RouteNames.CATEGORY>;

export function CategoryPage({ navigation }: Props) {
    const dispatch = useDispatch()
    const list = useSelector(selectCategory)
    const flatListRef = React.useRef<FlatList>()
    React.useEffect(() => {
        navigation.setOptions({ title: 'Manage Categories' })
    }, [])
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <View style={{ flex: 1, justifyContent: 'center', paddingVertical: Size._10 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={list}
                    numColumns={Size.isTablet?2:1}
                    ref={flatListRef}
                    renderItem={({ item, index }) => <CategoryItem key={item.id} item={item} index={index} />}
                />
                <Button style={{ marginHorizontal: Size._10 }} title='ADD NEW CATEGORY' onPress={() => {
                    dispatch(addCategory(NewCategory(uniqueId('category_'))))
                    setTimeout(() => {
                        flatListRef.current?.scrollToEnd()
                    }, 500)
                }}
                />
            </View>
        </KeyboardAvoidingView>
    );

}