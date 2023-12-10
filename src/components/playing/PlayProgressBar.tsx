import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import dv from "../../styles/dv";
import TrackPlayer, { useProgress } from "react-native-track-player";

export default () => {
  const progress = useProgress(1000);
  const nowTime = useMemo(() => timeformat(progress.position), [progress.position]);
  const allTime = useMemo(() => timeformat(progress.duration), [progress.duration]);

  return (
    <View style={styles.main}>
      <Text style={styles.time}>{nowTime}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        minimumTrackTintColor={dv.themeColor}
        maximumTrackTintColor="white"
        thumbTintColor={"white"}
        onSlidingComplete={(v) => {
          TrackPlayer.seekTo(v);
        }}
      />
      <Text style={styles.time}>{allTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  slider: {
    flex: 1,
  },
  time: {
    color: "white",
    width: 36,
    textAlign: "center",
    fontSize: 12,
  },
});

function timeformat(stime: number) {
  stime = Math.round(stime);
  return `${Math.floor(Math.round(stime) / 60) < 10 ? 0 : ""}${Math.floor(
    Math.round(stime) / 60
  )}:${Math.round(stime) % 60 < 10 ? 0 : ""}${Math.round(stime) % 60}`;
  // 还不如用加号呢
}
