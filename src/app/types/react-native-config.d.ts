declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME: string;
    API_URL: string;
    API_IMAGE_URL: string;
    API_TOKEN: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
