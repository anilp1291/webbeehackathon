import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Category } from '../Domain/interfaces';
import { CategoryPage } from '../Pages/Category';
import { Dashboard } from '../Pages/Dashboard';
import { DrawerPage } from '../Pages/DrawerPage';
import { RouteNames } from './RouteNames';

export type DrawerParamList = {
    [RouteNames.DASHBOARD]: { selected: Category } | undefined,
    [RouteNames.CATEGORY]:  undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerPage {...props} />} initialRouteName={RouteNames.DASHBOARD}>
                <Drawer.Screen name={RouteNames.DASHBOARD} component={Dashboard} />
                <Drawer.Screen name={RouteNames.CATEGORY} component={CategoryPage} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}