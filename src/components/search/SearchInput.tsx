import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import dv from "../../styles/dv";
import { useNavigation } from "@react-navigation/native";
import {
  setPageContext,
  useQueryContext,
  useSearchHistoryCtx,
  useSetPageContext,
  useSetQueryContext,
} from "./somestate";
export default () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const query = useQueryContext();
  const setQuery = useSetQueryContext();
  const setPage = useSetPageContext();
  const searchHistory = useSearchHistoryCtx();
  useEffect(() => {
    setText(query ? query : text);
    // console.log(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>返回</Text>
      </Pressable>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          onChangeText={(t) => {
            if (t === "") {
              setPage!(false);
            }
            setText(t);
          }}
          onSubmitEditing={() => {
            if (setQuery && setPage) {
              setQuery(text);
              setPage(true);

              const temp = Array.from(searchHistory!.value);
              const i = temp.indexOf(text);
              if (i !== -1) temp.splice(i, 1);
              temp.unshift(text);
              // console.log(temp);
              searchHistory?.setValue(temp);
            } else {
              console.log("setQuery 或 setPage 未定义");
            }
          }}
          value={text}
          placeholder="在此输入查找内容"
        />
        <Pressable style={styles.delBtn}>
          <Text>删除</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: dv.themeColor,
    alignItems: "center",
    flexDirection: "row",
  },
  inputBox: {
    borderColor: "white",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  delBtn: {},
  input: {
    // margin:0,
    fontSize: 16,
    padding: 2,
    color: "gray",
    flex: 1,
  },
});
