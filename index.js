/**
 * @format
 */

import { AppRegistry, SafeAreaView,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import AppNavigator from './src/Navigation/AppNavigator';
import { persistor, store } from './src/Redux/Store';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react';

const AppContainer = () => <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <MenuProvider>
                    <AppNavigator />
                </MenuProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    </PersistGate>
</Provider>

AppRegistry.registerComponent(appName, () => AppContainer);
