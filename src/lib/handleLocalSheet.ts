import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToLocalSheet() {
  const sheets = await AsyncStorage.getItem('locallist');
  console.log(sheets);
  return JSON.parse(sheets!);
}

// todo:需要修改sheetData 类型,
export async function addToLocalSheet(songId: string, sheetName: string) {
  try {
    const arr: any[] = [];
    const index = arr.findIndex(v => {
      // todo: v 是歌单信息, 当v.name === sheetName 时 return true
      if (false) {
      }
      return false;
    });
    arr[index].ids.unshift(songId);
    AsyncStorage.setItem('locallist', JSON.stringify(arr));
    return true;
  } catch (err) {
    console.log(JSON.stringify(err));
    return false;
  }
}
