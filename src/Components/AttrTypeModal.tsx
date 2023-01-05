import { StyleSheet } from 'react-native';
import {
    Menu, MenuOption, MenuOptions, MenuTrigger
} from 'react-native-popup-menu';
import { Colors } from '../Utils/Colors';
import { Size, SizeVertical } from '../Utils/Size';

interface AttrTypeMenuProps {
    list: string[],
    onSelect: (text: string) => void,
    label: string
}

export const AttrTypeModal = (props: AttrTypeMenuProps) => {
    const { list, onSelect, label } = props
    return <Menu>
        <MenuTrigger style={styles.triggerButton} text={label} />
        <MenuOptions>
            {list.map(item => <MenuOption key={item} customStyles={{ optionText: { padding: Size._12 } }} onSelect={() => onSelect(item)} text={item} />)}
        </MenuOptions>
    </Menu>
}
const styles = StyleSheet.create({
    triggerButton: {
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: Size._20,
        alignItems: 'center',
        height: SizeVertical._32,
        justifyContent: 'center'
    }
})