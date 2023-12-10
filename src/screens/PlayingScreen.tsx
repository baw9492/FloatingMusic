import React, { useRef, useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import PlayingHeader from "../components/playing/PlayingHeader";
import ControlWrap from "../components/playing/ControlWrap";
import { useDState } from "../state/dstate";
import { noImgUrl } from "../styles/dv";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import LrcWrap from "../components/playing/LrcWrap";
import BackGround from "../components/playing/BackGround";

export default function PlayingScreen() {
  // console.log("playingscreen已更新");
  const b = useDState();
  const [lrcPage, setLrcPage] = useState<boolean>(false);
  const changePage = () => setLrcPage(!lrcPage);
  const tap = Gesture.Tap()
    .onStart(() => {
      changePage();
    })
    .maxDistance(5)
    .maxDuration(200);

  return (
    <GestureHandlerRootView style={[styles.main]}>
      <BackGround uri={b?.artwork?.toString() ?? ""} isLrcPage={lrcPage} />
      {/* <View style={{backgroundColor:'black'}}/> */}
      <PlayingHeader title={b?.title ?? "title"} dec={b?.artist ?? "album"} />
      <GestureDetector gesture={tap}>
        <View style={styles.mid_wrap}>
          {lrcPage ? (
            <LrcWrap />
          ) : (
            <Image
              style={styles.img}
              source={{
                uri: String(b?.artwork ?? noImgUrl),
              }}
            />
          )}
        </View>
      </GestureDetector>
      <ControlWrap />
    </GestureHandlerRootView>
  );
}

const imgWH = Dimensions.get("screen").width * 0.7;
const styles = StyleSheet.create({
  mid_wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 1,
  },
  img: {
    width: imgWH,
    height: imgWH,
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 12,
  },
});
