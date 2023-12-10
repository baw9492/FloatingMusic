import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Dispatch } from "react";
import dv from "../../styles/dv";

interface param {
  song: songdata[];
  songlist: songlistdata[];
}
/** 查找 */
async function search<K extends keyof param>(t: K, q: string): Promise<param[K]> {
  console.log("开始搜索");
  console.log(t);
  try {
    const res = (await (await fetch(`${dv.ipath}search?q=${q}&t=${t}`)).json()) as param[K];
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
}
const searchFn = createContext(search);
export const useSearchFn = () => {
  return useContext(searchFn);
};

export const queryContext = createContext<null | string>(null);
export const useQueryContext = () => {
  return useContext(queryContext);
};

export const setQueryContext = createContext<null | Dispatch<string>>(null);
export const useSetQueryContext = () => useContext(setQueryContext);
export const setPageContext = createContext<null | Dispatch<boolean>>(null);
export const useSetPageContext = () => useContext(setPageContext);

/* 查找历史 */
const SearchHistoryCtx = createContext<null | StateCtx<string[]>>(null);
export const useSearchHistoryCtx = () => useContext(SearchHistoryCtx);
export function SearchHistoryCtxProvider(prop: PropsWithChildren) {
  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    AsyncStorage.getItem("searchHistory").then((v) => {
      setValue(JSON.parse(v || "[]"));
    });
  }, []);
  return (
    <SearchHistoryCtx.Provider
      value={{
        value,
        setValue: (v) => {
          setValue(v);
          AsyncStorage.setItem("searchHistory", JSON.stringify(v));
        },
      }}
    >
      {prop.children}
    </SearchHistoryCtx.Provider>
  );
}
