import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key: string) => {
  let result = await AsyncStorage.getItem(key);
  if (!!result) {
    return JSON.parse(result);
  }
  return false;
};

const setItem = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const USER = 'USER';

export {getItem, setItem, USER};
