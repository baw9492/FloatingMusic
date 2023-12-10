import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default ({ title, dec }: { title: string; dec: string }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.ico}>&#xe5e0;</Text>
        </Pressable>
        <View style={styles.textBox}>
          <Text style={[styles.songName, styles.text]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {dec}
          </Text>
        </View>
        <Pressable>
          <Text style={styles.ico}>&#xe80d;</Text>
        </Pressable>
      </View>
      {/* <Text style={{ textAlign: 'center' }}>wenzi</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ico: {
    fontFamily: "gicon",
    fontSize: 20,
  },
  textBox: {
    justifyContent: "center",
    flex: 1,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  songName: {
    fontSize: 20,
  },
});
