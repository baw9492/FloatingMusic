import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native'

export default function ManageSongSheetBox() {
  const ssname = 'none'
  const mItems = [
    {
      title: '下载', ico: 'download', func() {
        console.log('下载')
      },
    },
    {
      title: '分享', ico: 'share', func() {
        console.log('分享')
      },
    },
    {
      title: '编辑', ico: 'edit', func() {
        console.log('编辑')
      },
    },
    {
      title: '删除', ico: 'delete', func() {
        console.log('删除')
      },
    },
  ]

  return (<View>
    <Text>{ssname}</Text>
    <View>
      {mItems.map((item, index) =>
      (<Pressable
        key={index}
        style={styles.btn}
        onPress={item.func}
        android_ripple={{ color: 'gray' }}
      >
        <Text style={styles.gico}>{item.ico}</Text>
        <Text>{item.title}</Text>
      </Pressable>))}
    </View>
  </View>)
}

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  gico: {
    fontFamily: 'gicon',
    color: '#333333',
    fontSize: 18,
    marginHorizontal: 10,
  },
})
