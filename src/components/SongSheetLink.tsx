import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import dv from '../styles/dv'
// function pcolor(color) {

//   return {}
// }

export default function SongSheetLink() {
  const navigation = useNavigation()
  return (
    <Pressable
      style={[styles.main]}
      android_ripple={{ color: 'gray' }}
      onPress={() => {
        // @ts-ignore
        navigation.navigate('SongList')
      }}
    >
      <Image
        style={styles.img}
        source={{ uri: `${dv.ipath}/img/1.jpg` }} />
      <View style={styles.bd}>
        <View style={styles.textBox}>
          <Text style={styles.title} numberOfLines={1}>歌单标题</Text>
          <Text numberOfLines={1}>歌单描述</Text>
        </View>
        <Pressable
          style={styles.moreBtn}
          android_ripple={{ color: 'gray' }}
        >
          <Text style={styles.gico}>more_vert</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    // backgroundColor:'blue',

  },
  img: {
    height: 50,
    width: 50,
    margin: 5,
  },
  textBox: {
    flex: 1,
    // marginLeft: 10,
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
  gico: {
    fontFamily: 'gicon',
    fontSize: 20,
  },
  moreBtn: {
    width: 30,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bd: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    alignItems:'center',
    height: '100%',
  },
})
