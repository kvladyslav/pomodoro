import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'focusHistory';

export const getList = async () => {
    return await AsyncStorage.getItem(STORAGE_KEY);
}

export const setList = async (focusHistory) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(focusHistory));
}

export const clearList = async () => {
    await AsyncStorage.clear();
}