import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import MainReducer from './MainReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, MainReducer)

export const store = configureStore({
    reducer: {
        inventory: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCategory = (state: RootState) => state.inventory.categories
export const selectMachines = (state: RootState) => state.inventory.machines