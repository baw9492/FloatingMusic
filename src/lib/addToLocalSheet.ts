import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getToLocalSheet() {
  const sheets = await AsyncStorage.getItem('locallist');
  console.log(sheets);
  return JSON.parse(sheets!);
}
