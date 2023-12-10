import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import SearchInput from "../components/search/SearchInput";
import SearchHistoryWrap from "../components/search/SearchHistoryWrap";
import SearchResultWrap from "../components/search/SearchResultWrap";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  queryContext,
  setQueryContext,
  setPageContext,
  SearchHistoryCtxProvider,
} from "../components/search/somestate";

// SearchInput 和 SearchHistoryWrap 不会发起搜索, 只会记录搜索参数并跳到 SearchResultWrap 由 SearchResultWrap 发起搜索
export default () => {
  useEffect(() => {
    AsyncStorage.getItem("history");
  }, []);

  console.log("已更新searchScreen");
  const [query, setQuery] = useState("");
  const [isResPage, setIsResPage] = useState(false);
  const arr = ["真夜中", "茶店", "周杰伦", "历史4"];
  return (
    <queryContext.Provider value={query}>
      <setQueryContext.Provider value={setQuery}>
        <setPageContext.Provider value={setIsResPage}>
          <SearchHistoryCtxProvider>
            <SearchInput />
            {isResPage ? <SearchResultWrap /> : <SearchHistoryWrap />}
          </SearchHistoryCtxProvider>
        </setPageContext.Provider>
      </setQueryContext.Provider>
    </queryContext.Provider>
  );
};
