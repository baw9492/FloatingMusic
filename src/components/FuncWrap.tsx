import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function FuncWrap() {
  const navigation = useNavigation();

  const warpItems = [
    {
      title: '本地音乐',
      ico: 'save',
      func() {
        console.log('本地音乐');
        // @ts-ignore
        navigation.navigate('local')
      },
    },
    {
      title: '我的最爱',
      ico: 'favorite',
      func() {
        console.log('我的最爱');
      },
    },
    {
      title: '播放历史',
      ico: '\ue889',
      func() {
        console.log('播放历史');
      },
    },
    // {
    //   title: "订阅广播",
    //   ico: "podcasts",
    //   func() {
    //     console.log("订阅广播");
    //   },
    // },
  ];

  return (
    <View style={styles.func_wrap}>
      {warpItems.map((item, index) => (
        <Pressable
          android_ripple={{color: 'gray'}}
          key={index}
          style={styles.func_btn}
          onPress={() => item.func()}>
          <Text style={styles.gico}>{item.ico}</Text>
          <Text>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  func_wrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth / 2,
  },
  func_btn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  gico: {
    fontSize: 30,
    fontFamily: 'gicon',
  },
});
