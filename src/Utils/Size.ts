import { Dimensions } from "react-native";
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size:number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size:number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size:number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

export const SizeVertical = {
    _18: verticalScale(18),
    _16: verticalScale(16),
    _14: verticalScale(14),
    _12: verticalScale(12),
    _10: verticalScale(10),

    // Other Sizes
    _15: verticalScale(15),
    _20: verticalScale(20),
    _24: verticalScale(24),
    _28: verticalScale(28),
    _32: verticalScale(32),
    _40: verticalScale(40),
    _50: verticalScale(50),
    verticalScale,
}

export const Size = {
    _18: horizontalScale(18),
    _16: horizontalScale(16),
    _14: horizontalScale(14),
    _12: horizontalScale(12),
    _10: horizontalScale(10),

    // Other Sizes
    _15: horizontalScale(15),
    _20: horizontalScale(20),
    _24: horizontalScale(24),
    _28: horizontalScale(28),
    _32: horizontalScale(32),
    _40: horizontalScale(40),
    _50: horizontalScale(50),
    horizontalScale,
    width,
    height,
    isLandscape:isLandscape(),
    isTablet: DeviceInfo.isTablet() 
}
