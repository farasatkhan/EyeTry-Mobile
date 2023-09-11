import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeDataAsyncStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Custom Error: " + error);
    }
}

export const getDataAsyncStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key).then((response) => {return response});
    } catch(e) {
      console.log(e)
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
}

export const remvoveItemAsyncStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error.code);
    }
}