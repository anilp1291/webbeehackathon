import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { uniqueId } from 'lodash';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, SectionList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AttributeValue, CategoryMachines, MachineItem } from '../Domain/interfaces';
import { DrawerParamList } from '../Navigation/AppNavigator';
import { RouteNames } from '../Navigation/RouteNames';
import { addNewMachine } from '../Redux/MainReducer';
import { selectCategory, selectMachines } from '../Redux/Store';
import { Size } from '../Utils/Size';
import { Strings } from '../Utils/Strings';
import { MachineItemComponent } from './Components/MachineItemComponent';

type Props = NativeStackScreenProps<DrawerParamList, RouteNames.DASHBOARD>;


export function Dashboard({ route, navigation }: Props) {
    const isFocused = useIsFocused()
    const selected = route?.params?.selected
    const [machines, setMachines] = React.useState<CategoryMachines[]>([])
    const dispatch = useDispatch()
    const machineList = useSelector(selectMachines)
    const categoryList = useSelector(selectCategory)
    React.useEffect(() => {
        if (isFocused)
            reloadData()
    }, [isFocused])
    React.useEffect(() => {
        reloadData()
    }, [selected, machineList])


    const reloadData = () => {
        if (selected) {
            navigation.setOptions({ title: selected.title })
            setMachines([
                {
                    id: selected.id,
                    title: !!selected.title ? selected.title :Strings.unnamedCategory,
                    data: machineList.filter(item => item.category_id === selected.id),
                }
            ])
        } else {
            navigation.setOptions({ title: 'Dashboard' })
            const machineItems: CategoryMachines[] = []
            categoryList.forEach(category => {
                const machines = machineList.filter(item => item.category_id === category.id)
                machineItems.push({
                    id: category.id,
                    title: !!category.title ? category.title : Strings.unnamedCategory,
                    data: machines
                })
            })
            setMachines(machineItems)
        }
    }

    const categoryInfo = (id: string) => {
        return categoryList.find(item => item.id === id)
    }
    const ListEmptyComponent = () => {
        return <View style={{ alignItems: 'center', justifyContent: 'center', height: 100, width: '100%' }}>
            <Text variant='titleSmall'>{Strings.noItems}</Text>
        </View>
    }
    const ListSectionEmptyComponent = () => {
        return <View style={{ alignItems: 'center', justifyContent: 'center', height: 400, width: '100%' }}>
            <Text style={{ textAlign: 'center', marginBottom: Size._20 }} variant='titleLarge'>{Strings.noCategory}</Text>
            <Button mode='contained' onPress={() => navigation.navigate(RouteNames.CATEGORY)}>
                {Strings.addCategory}
            </Button>
        </View>
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <SectionList
                    style={{ flex: 1 }}
                    sections={machines}
                    ListEmptyComponent={ListSectionEmptyComponent}
                    renderItem={({ item, index }) => <MachineItemComponent key={item.id} item={item} index={index} />}
                    renderSectionHeader={({ section }) => (
                        <>
                            <View style={{ backgroundColor: 'white', padding: Size._10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text variant='headlineSmall'>{section.title}</Text>
                                <Button mode='text' onPress={() => {
                                    const category = categoryInfo(section.id)
                                    const blankMachine: MachineItem = {
                                        id: uniqueId('machine_'),
                                        category_id: section.id,
                                        title: 'Unnamed Field',
                                        attrFields: category?.attrs.map(item => {
                                            const attrValue: AttributeValue = {
                                                ...item,
                                                value: '',
                                                isTitleField: item.title === category.titleField
                                            }
                                            return attrValue
                                        }) ?? []
                                    }
                                    dispatch(addNewMachine(blankMachine))

                                }} >
                                    {Strings.addNew}
                                </Button>
                            </View>
                            {section.data.length === 0 ? <ListEmptyComponent /> : null}
                        </>
                    )}
                />
            </View>
        </KeyboardAvoidingView>

    );

}
