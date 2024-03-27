import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, Image, View, StyleSheet, Pressable} from 'react-native';
import {noImgUrl} from '../styles/dv';

export default ({data}: {data: songlistdata}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.main}
      android_ripple={{color: 'gray'}}
      onPress={() => {
        console.log('导航到歌单' + data._id);
        // @ts-ignore
        navigation.navigate('SongList', {data: data});
      }}>
      <Image source={{uri: data.cover || noImgUrl}} style={styles.img} />
      <View style={styles.bl}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.count}>{`${data.song_count ?? 0} 首`}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  img: {width: 50, height: 50, marginHorizontal: 10},
  title: {
    color: 'black',
    fontSize: 16,
  },
  count: {
    color: 'gray',
    fontSize: 12,
  },
  bl: {
    borderColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});
