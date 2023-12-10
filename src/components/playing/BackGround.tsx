import { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import Svg, { Defs, Rect, LinearGradient, Stop } from "react-native-svg";

const BackGround = (props: { uri: string; isLrcPage: boolean }) => {
  return (
    <View style={styles.main}>
      <Image source={{ uri: props.uri }} style={styles.img} blurRadius={30} />
      {/* <View style={styles.topShadow} />
      <View style={styles.bottomShadow} /> */}
      <Svg height="100%" width="100%" style={[StyleSheet.absoluteFillObject]}>
        <Defs>
          <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" id={"gradientUniqueId"}>
            <Stop offset="0%" stopColor="black" stopOpacity={0.4} />
            <Stop offset="30%" stopColor="transparent" stopOpacity={0} />
            <Stop offset="70%" stopColor="transparent" stopOpacity={0} />
            <Stop offset="100%" stopColor="black" stopOpacity={0.4} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${"gradientUniqueId"})`} />
        {props.isLrcPage && <Rect width="100%" height="100%" fill={`black`} opacity={0.5} />}
      </Svg>
    </View>
  );
};
export default memo(BackGround);

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  topShadow: {
    top: 0,
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "30%",
    opacity: 0.5,
  },
  bottomShadow: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "30%",
    opacity: 0.5,
  },
  svg: {
    position: "absolute",
  },
});
