import AsyncStorage from "@react-native-async-storage/async-storage";

/** 存储数据 */
export const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem("my-key", value);
  } catch (e) {
    console.log(e);
  }
};

/** 读取数据 */
export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("my-key");
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    console.log(e);
  }
};
