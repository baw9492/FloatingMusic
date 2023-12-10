import React from "react";
import { Text, StyleSheet, View, Pressable, StatusBar } from "react-native";
import type { PressableStateCallbackType, ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dv from "../styles/dv";
export default () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor={dv.themeColor} />
      <View style={styles.header}>
        <Pressable
          // android_ripple={{ color: "gray" }}
          style={(state) => [styles.btn, state.pressed && styles.btn_pressed]}
          onPress={navigation.goBack}
        >
          <Text style={styles.btn_text}>&#xe5c4;</Text>
        </Pressable>

        <Text style={styles.title}>本地音乐</Text>

        <Pressable style={(state) => [styles.btn, state.pressed && styles.btn_pressed]}>
          <Text style={styles.btn_text}>search</Text>
        </Pressable>
        <Pressable style={(state) => [styles.btn, state.pressed && styles.btn_pressed]}>
          <Text style={styles.btn_text}>menu</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: dv.themeColor,
  },
  btn: {
    height: "100%",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    color: "white",
    fontFamily: "gicon",
    fontSize: 24,
  },
  btn_pressed: {
    opacity: 0.5,
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 18,
  },
});
