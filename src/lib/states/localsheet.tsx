import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

const _localsheetctx = createContext<null | {
  value: any[];
  setValue: Dispatch<any[]>;
}>(null);

export function LocalSheetCtx(props: PropsWithChildren) {
  const [value, setValue] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const _str = await AsyncStorage.getItem('locallist');
      if (_str) {
        const _data: any[] = JSON.parse(_str);
        setValue(_data);
      } else {
        console.log('不存在localist');
        console.log(_str);
      }
    })();
  });

  return (
    <_localsheetctx.Provider value={{value, setValue}}>
      {props.children}
    </_localsheetctx.Provider>
  );
}

export function useLocalSheet() {
  return useContext(_localsheetctx);
}
