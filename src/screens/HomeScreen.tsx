import React from "react";
import { View, StyleSheet, Text, Pressable, StatusBar } from "react-native";
import binliang from "../styles/dv";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelfScreen from "./home/SelfScreen";
import TuiJianScreen from "./home/TuiJianScreen";
import dv from "../styles/dv";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <>
      <StatusBar backgroundColor={dv.themeColor} />
      <Tab.Navigator tabBar={MyTabBar}>
        <Tab.Screen name="self" component={SelfScreen} />
        <Tab.Screen name="tuijian" component={TuiJianScreen} />
        <Tab.Screen name="video" component={VideoScreen} />
      </Tab.Navigator>
    </>
  );
}

const VideoScreen = () => {
  return <Text>视频页</Text>;
};

function MyTabBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable>
        <Text style={styles.gico}>menu</Text>
      </Pressable>
      <View style={styles.tabGroup}>
        <Pressable>
          <Text style={[styles.gico, styles.tabBtn]}>home</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.gico, styles.tabBtn]}>piano</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.gico, styles.tabBtn]}>group</Text>
        </Pressable>
      </View>
      <Pressable>
        {/* @ts-ignore */}
        <Text style={styles.gico} onPress={() => navigation.navigate("search")}>
          search
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: binliang.themeColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  gico: {
    fontFamily: "gicon",
    fontSize: 28,
  },
  tabGroup: {
    display: "flex",
    flexDirection: "row",
  },
  tabBtn: {
    marginHorizontal: 10,
  },
});
