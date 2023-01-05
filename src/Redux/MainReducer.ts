import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { AttributeValue, AttrType, Category, MachineItem } from '../Domain/interfaces'

interface StateValue {
    categories: Category[]
    machines: MachineItem[]
}

const initialState: StateValue = {
    categories: [],
    machines: [],
}

export const inventorySlice: Slice<StateValue> = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        addNewMachine: (state, action: PayloadAction<MachineItem>) => {
            state.machines.push(action.payload)
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(item => item.id === action.payload.id)
            state.categories[index] = action.payload
            const updatedList = state.machines.map(item => {
                if (item.category_id === action.payload.id) {
                    let title = 'Unnamed Field'
                    const list = action.payload.attrs.map(attrItem => {
                        const existAttr = item.attrFields.find(existAttr => existAttr.id === attrItem.id)
                        const isTypeChanged = existAttr ? existAttr.type !== attrItem.type : true
                        const attrValue: AttributeValue = {
                            ...attrItem,
                            title: attrItem.title,
                            type: attrItem.type,
                            value: isTypeChanged ? (attrItem.type === AttrType.CHECKBOX ? "0" : "") : (existAttr?.value ?? (attrItem.type === AttrType.CHECKBOX ? "0" : "")),
                            isTitleField: attrItem.title === action.payload.titleField
                        }
                        if (attrValue.isTitleField) {
                            if (isTypeChanged && attrItem.type === AttrType.CHECKBOX)
                                title = "false"
                            else
                                title = attrValue.value
                        }
                        return attrValue
                    })

                    return { ...item, attrFields: list, title }
                } else {
                    return item
                }
            })
            state.machines = updatedList
        },
        updateMachine: (state, action: PayloadAction<MachineItem>) => {
            const index = state.machines.findIndex(item => item.id === action.payload.id)
            state.machines[index] = action.payload
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            state.categories.splice(action.payload, 1)
        },
        removeMachine: (state, action: PayloadAction<string>) => {
            const index = state.categories.findIndex(item => item.id === action.payload)
            state.machines.splice(index, 1)
        },

    },
})

export const { addCategory, updateCategory, removeCategory, updateMachine, addNewMachine, removeMachine } = inventorySlice.actions

export default inventorySlice.reducer
