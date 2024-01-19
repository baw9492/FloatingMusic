import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';
import SongListHeader from '../components/songlist/SongListHeader';
import SongLink from '../components/songlist/SongLink';
import ds from '../../ds';
import {useRoute} from '@react-navigation/native';
import {
  getSource,
  getSourceFormSongList,
  getSongDataFromSongList,
} from '../fn/qapi';
import TrackPlayer, {Track} from 'react-native-track-player';
import {Button as Pbtn, Menu, Divider, PaperProvider} from 'react-native-paper';

export default () => {
  // @ts-ignore
  const data = useRoute().params.data as songlistdata;
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<songdata[]>();
  const [nowSongInfo, setNowSongInfo] = useState<null | songdata>(null);
  useEffect(() => {
    console.log('已更新SongsListScreen');
    console.log(data._id);
    getSongDataFromSongList(data._id!).then(v => {
      getSourceFormSongList(v.map(i => String(i._id))).then(v2 => {
        const res = v.map((item, index) => ({...item, src: v2[index]}));
        setSongs(res);
        // console.log(res[0]);
        setLoading(false);
      });
    });
  }, [data]);

  const setNewTrackAndPlay = async (index: number = 1) => {
    if (!songs) return;
    TrackPlayer.reset();
    const _ = songs.filter(i => i.src);
    await TrackPlayer.add(
      _.map<Track>(i => ({
        url: i.src!,
        title: i.name,
        artwork: i.cover,
        album: i.album,
        artist: i.artist ? i.artist.join('/') : 'unknow',
      })),
    );
    TrackPlayer.play();
  };

  return (
    <View style={ds.swell}>
      <Button title="bofang" onPress={() => setNewTrackAndPlay()} />
      <SongListHeader data={data} />
      {loading ? (
        <Text>加载中...</Text>
      ) : (
        <FlatList
          data={songs}
          initialNumToRender={15}
          renderItem={item => (
            <SongLink data={item.item} index={item.index} fn={() => {}} />
          )}
          // keyExtractor={(_, index) => String(index)}
          ListEmptyComponent={NoData}
        />
      )}
    </View>
  );
};

function NoData() {
  return <Text>没有数据</Text>;
}

function Temp() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderTopWidth: StyleSheet.hairlineWidth,
        height: 'auto',
        display: showMenu ? 'flex' : 'none',
      }}>
      <Pressable
        onPress={() => {
          setShowMenu(false);
        }}
        style={styles.menuitem}
        android_ripple={{color: 'gray'}}>
        <Text>关闭</Text>
      </Pressable>
      <Pressable style={styles.menuitem} android_ripple={{color: 'gray'}}>
        <Text>收藏到歌单</Text>
      </Pressable>
      {/* <Text>{nowSongInfo?.artist.}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  menuitem: {
    height: 40,
    justifyContent: 'center',
  },
});
