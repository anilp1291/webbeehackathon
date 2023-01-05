import { uniqueId } from "lodash"

export enum AttrType {
    TEXT = "Text",
    DATE = "Date",
    NUMBER = "Number",
    CHECKBOX = "Checkbox"
}

export interface Attribute {
    id: string,
    title: string,
    type: AttrType
}
export interface AttributeValue extends Attribute {
    value: string,
    isTitleField?: boolean
}

export interface Category {
    id: string,
    title: string,
    titleField?: string,
    attrs: Attribute[]
}

export interface DrawerMenu {
    id: string,
    title: string,
    routeName: string,
    params?: any
}

export interface MachineItem {
    id: string,
    category_id: string,
    title: string,
    attrFields: AttributeValue[]
}

export interface CategoryMachines {
    id: string,
    title: string,
    data: MachineItem[]
}

export const NewCategory = (id: string): Category => {
    return {
        id,
        title: '',
        attrs: [
            {
                id: id + "_" + uniqueId('attrType_'),
                title: '',
                type: AttrType.TEXT
            }
        ],
        titleField: 'UNNAMED FIELD'
    }
}
