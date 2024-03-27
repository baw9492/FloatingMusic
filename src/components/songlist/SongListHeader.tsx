import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import dv, {noImgUrl} from '../../styles/dv';

export default function SongListHeader({data}: {data: songlistdata}) {
  return (
    <View className="p-4 border-b border-black">
      <View style={styles.info}>
        <Pressable style={styles.imgBtn}>
          <Image source={{uri: data.cover ?? noImgUrl}} style={styles.cover} />
          <Text style={styles.count}>3412</Text>
          <Text style={[styles.infoSign, styles.ico]}>&#xe88e;</Text>
        </Pressable>

        <View style={styles.textInfo}>
          <Text style={styles.songListTitle}>{data.title || 'title'}</Text>
          <Text style={styles.UserInfo}>{`共${data.song_count || 0}首`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ico: {
    fontFamily: 'gicon',
  },
  info: {
    flexDirection: 'row',
  },
  imgBtn: {},
  count: {
    color: 'white',
    position: 'absolute',
    top: 2,
    right: 5,
    fontSize: 12,
  },
  infoSign: {
    color: 'white',
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 16,
  },
  cover: {
    height: 120,
    width: 120,
  },
  textInfo: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginLeft: 10,
  },
  songListTitle: {
    fontSize: 20,
    color: 'black',
  },
  UserInfo: {},
});
