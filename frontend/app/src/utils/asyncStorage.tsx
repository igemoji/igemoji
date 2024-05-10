import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw e;
  }
};

export const getItem = async (key: string) => {
  try {
    const res = JSON.parse((await AsyncStorage.getItem(key)) as string);

    return res || "";
  } catch (e) {
    throw e;
  }
};
