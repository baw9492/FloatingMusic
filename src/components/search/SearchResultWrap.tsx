import React, { createContext, useState, useEffect } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import dv from "../../styles/dv";
import { useQueryContext, useSearchFn } from "./somestate";
import SongListLink from "../SongListLink";
import { search } from "../../fn/qapi";
import ResSongItem from "./ResSongItem";

const dataContext = createContext<null | songdata[]>(null);
const renderScene = SceneMap({
  first: SongResultList,
  second: ResSongList,
});

export default () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "单曲" },
    { key: "second", title: "歌单" },
  ]);

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "white" }}
          indicatorStyle={{ backgroundColor: dv.themeColor }}
          activeColor={dv.themeColor}
          inactiveColor="gray"
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      lazy={true}
      // initialLayout={{ width: layout.width }}
      // style={{ display: "none" }}
    />
    // <Text>结果页</Text>
  );
};

function SongResultList() {
  const [data, setData] = useState<songdata[]>([]);
  const query = useQueryContext();

  useEffect(() => {
    if (!query || query === "") return;
    search(query, 1, "song").then((v) => {
      setData(v as songdata[]);
    });
  }, [query]);

  return (
    <FlatList
      data={data}
      initialNumToRender={15}
      renderItem={(value) => <ResSongItem value={value.item} />}
      ListEmptyComponent={nores}
      style={{ backgroundColor: "white" }}
    />
  );
}
function nores() {
  return <Text>未查找到数据</Text>;
}

function ResSongList() {
  const [data, setData] = useState<songlistdata[]>([]);
  const query = useQueryContext();
  const searchFn = useSearchFn();

  useEffect(() => {
    if (!query || query === "") return;
    // searchFn("songlist", query).then((value) => {
    //   setData(value);
    // });
    search(query, 1, "songlist").then((v) => {
      // if(typeof v ===  songlistdata[])
      console.log("请求成功");
      setData(v as songlistdata[]);
    });
  }, [query]);

  return (
    <FlatList
      data={data}
      initialNumToRender={15}
      renderItem={(value) => <SongListLink data={value.item} />}
      ListEmptyComponent={nores}
    />
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  serial_box: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  serial_text: {
    fontSize: 16,
  },
  more_btn: {
    width: 50,
    height: "100%",
  },
  info: {
    flex: 1,
  },
  bl: {
    flex: 1,
    height: "100%",
    borderBottomColor: "#73737370",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  ico: {
    fontFamily: "gicon",
    fontSize: 20,
  },
  dinfo: {
    fontSize: 12,
  },
});
