import { useNavigation, useNavigationState } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDState } from "../state/dstate";
import dv, { noImgUrl } from "../styles/dv";

export default function PlayingBar() {
  console.log("已更新PlayingBar");
  const dstate = useDState();
  const curRoute = useNavigationState((state) => {
    if (state) {
      return state.routes[state.index].name;
    }
  });

  const navigation = useNavigation();
  const isShow: boolean = Boolean(dstate) && curRoute !== "Playing";

  return (
    <Pressable
      android_ripple={{ color: "gray" }}
      // @ts-ignore
      onPress={() => navigation.navigate("Playing")}
      style={[styles.main, { display: isShow ? "flex" : "none" }]}
    >
      <Image
        source={{ uri: dstate?.artwork ? String(dstate?.artwork) : noImgUrl }}
        style={styles.img}
      />
      <View style={styles.text}>
        <Text>{dstate?.title}</Text>
        <Text>歌词</Text>
      </View>
      <Pressable onPress={() => {}}>
        <Text>播放/暂停</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log(curRoute);
        }}
      >
        <Text>播放列表</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    backgroundColor: "gray",
    height: 60,
    width: "100%",
    left: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: 50,
    width: 50,
  },
  text: {
    flex: 1,
  },
});
