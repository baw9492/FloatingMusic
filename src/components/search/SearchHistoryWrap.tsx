import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSearchHistoryCtx, useSetPageContext, useSetQueryContext } from "./somestate";

export default () => {
  const searchHistoryCtx = useSearchHistoryCtx();

  const setQuery = useSetQueryContext();
  const setPage = useSetPageContext();
  if (!searchHistoryCtx) {
    return <Text>出了一些问题</Text>;
  }
  return (
    <>
      <Text>搜索历史</Text>
      <FlatList
        data={searchHistoryCtx.value}
        renderItem={(item) => (
          <Pressable
            android_ripple={{ color: "gray" }}
            style={styles.hitem}
            onPress={() => {
              setQuery ? setQuery(item.item) : console.log("setQuery 未定义");
              const res = Array.from(searchHistoryCtx.value);

              res.splice(res.indexOf(item.item), 1);
              res.unshift(item.item);
              searchHistoryCtx.setValue(res);

              setPage ? setPage(true) : console.log(`setPage未定义`);
            }}
          >
            <Text style={styles.ico}>&#xe889;</Text>
            <View style={styles.bb}>
              <Text style={styles.text}>{item.item}</Text>

              <Pressable
                android_ripple={{ color: "gray" }}
                style={styles.delBtn}
                onPress={() => {
                  const temp = Array.from(searchHistoryCtx.value);
                  temp.splice(item.index, 1);
                  console.log(temp);
                  searchHistoryCtx.setValue(temp);
                }}
              >
                <Text style={styles.ico}>&#xe5cd;</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        keyExtractor={(_, index) => String(index)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  hitem: {
    // height: 50,
    flexDirection: "row",
  },
  bb: {
    flex: 1,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  ico: {
    fontFamily: "gicon",
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    flex: 1,
  },
  delBtn: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
