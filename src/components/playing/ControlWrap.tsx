import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PlayProgressBar from "./PlayProgressBar";
import TrackPlayer, { State } from "react-native-track-player";

export default () => {
  const funcBtn = [
    {
      ico: "\ue87d",
      func() {
        console.log("喜欢");
      },
    },
    {
      ico: "\uf090",
      func() {
        console.log("下载");
      },
    },
    {
      ico: "\ue146",
      func() {
        console.log("收藏");
      },
    },

    {
      ico: "\ue5d4",
      func() {
        console.log("更多");
      },
    },
  ];

  const playOrPause = async () => {
    console.log("播放/暂停");
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };
  const getState = async () => {
    const state = await TrackPlayer.getState();
    console.log(state);
  };
  const nextPlay = async () => {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  };
  const prevPlay = async () => {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  };

  return (
    <>
      <View style={styles.fnBtnGroup}>
        {funcBtn.map((item, index) => (
          <Pressable key={index} onPress={item.func}>
            <Text style={styles.ico}>{item.ico}</Text>
          </Pressable>
        ))}
      </View>
      <PlayProgressBar />
      <View style={styles.main}>
        <Pressable onPress={getState}>
          <Text style={styles.ico}>&#xe040;</Text>
        </Pressable>
        <Pressable onPress={prevPlay}>
          <Text style={styles.ico}>&#xe045;</Text>
        </Pressable>
        <Pressable onPress={playOrPause}>
          <Text style={[styles.ico, styles.pBtn]}>&#xe1a2;</Text>
        </Pressable>
        <Pressable onPress={nextPlay}>
          <Text style={styles.ico}>&#xe044;</Text>
        </Pressable>
        <Text style={styles.ico}>&#xe03d;</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ico: {
    fontFamily: "gicon",
    fontSize: 30,
    color: "white",
  },
  pBtn: {
    fontSize: 50,
  },
  fnBtnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
