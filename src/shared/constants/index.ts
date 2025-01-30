import { Dimensions, Platform } from 'react-native';

export const ios = Platform.OS === 'ios';
export const android = Platform.OS === 'android';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
