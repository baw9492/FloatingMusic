import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ds from "../../../ds";
import TrackPlayer from "react-native-track-player";
import { getSource } from "../../fn/qapi";

export default function SongItem({ value }: { value: songdata }) {
  const artists = value.artist?.join();
  // console.log(StyleSheet.hairlineWidth);
  const addAndPlay = async () => {
    const uri = (await getSource([value._id!]))[0];
    if (!uri) return;
    const index = await TrackPlayer.add({
      url: uri,
      title: value.name,
      artist: value.artist?.join("/"),
      album: value.album,
      artwork: value.cover,
    });
    if (typeof index === "number") {
      TrackPlayer.skip(index);
      console.log("开始播放");
      TrackPlayer.play();
    }
  };
  return (
    <Pressable
      android_ripple={{ color: "gray" }}
      style={[styles.main, value.pay_play && styles.disable]}
      onPress={addAndPlay}
      disabled={value.pay_play}
    >
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {value.name}
        </Text>
        <Text numberOfLines={1} style={styles.dinfo}>{`${artists} - ${value.album}`}</Text>
      </View>
      <Pressable
        android_ripple={{ color: "gray" }}
        style={[styles.more_btn, ds.center]}
        onPress={() => {}}
      >
        <Text style={styles.ico}>&#xe5d4;</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  disable: {
    backgroundColor: "gray",
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
