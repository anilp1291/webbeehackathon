import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { DrawerMenu } from '../Domain/interfaces';
import { RouteNames } from '../Navigation/RouteNames';
import { selectCategory } from '../Redux/Store';
import { Size } from '../Utils/Size';
import { Strings } from '../Utils/Strings';

export function DrawerPage() {
    const navigation = useNavigation()
    const [drawerList, setDrawerList] = React.useState<DrawerMenu[]>([])
    const list = useSelector(selectCategory)
    React.useEffect(() => {
        const itemList: DrawerMenu[] = []
        itemList.push({
            id: uniqueId('menu_'),
            title: 'Dashboard',
            routeName: RouteNames.DASHBOARD
        })
        list.forEach(item => {
            itemList.push({
                id: uniqueId('menu_'),
                title: !!item.title ? item.title : Strings.unnamedCategory,
                routeName: RouteNames.DASHBOARD,
                params: { selected: item }
            })
        })
        itemList.push({
            id: uniqueId('menu_'),
            title: Strings.manageCategories,
            routeName: RouteNames.CATEGORY
        })
        setDrawerList(itemList)
    }, [list])
    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingVertical: Size._10 }}>
            <FlatList
                style={{ flex: 1 }}
                data={drawerList}
                renderItem={({ item, index }) => <List.Item key={item.id} title={item.title} onPress={() => {
                    navigation.navigate(item.routeName, item.params)
                }} />}
            />
        </View>
    );

}