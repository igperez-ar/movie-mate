import { Dimensions, Platform } from 'react-native';

export const IOS = Platform.OS === 'ios';
export const ANDROID = Platform.OS === 'android';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
