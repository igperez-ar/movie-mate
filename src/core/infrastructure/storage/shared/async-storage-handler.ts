import AsyncStorage from '@react-native-async-storage/async-storage';

const saveValue = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
  } catch (error) {
    throw error;
  }
};

const getValue = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    throw error;
  }
  return null;
};

const deleteValue = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (error) {
    throw error;
  }
};

const checkValue = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    return value !== null;
  } catch (error) {
    throw error;
  }
};

export { saveValue, getValue, deleteValue, checkValue };
