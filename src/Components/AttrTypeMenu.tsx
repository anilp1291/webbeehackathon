import {
    Menu, MenuOption, MenuOptions, MenuTrigger
} from 'react-native-popup-menu';
import { AttrType } from '../Domain/interfaces';
import { Colors } from '../Utils/Colors';
import { Size, SizeVertical } from '../Utils/Size';

interface AttrTypeMenuProps {
    selected?: AttrType,
    label?: string,
    onChange: (atrr: AttrType) => void,
    open?: boolean
}

export const AttrTypeMenu = (props: AttrTypeMenuProps) => <Menu>
    <MenuTrigger customStyles={{ triggerText: { color: Colors.blue } }} text={props.selected ? props.selected.toString().toUpperCase() : props.label} />
    <MenuOptions>
        {Object.entries(AttrType).map(item => <MenuOption customStyles={{
            optionText: {
                paddingHorizontal: Size._12,
                paddingVertical: SizeVertical._12
            }
        }} onSelect={() => props.onChange(item[1])} text={item[1].toString()} />
        )}
    </MenuOptions>
</Menu>