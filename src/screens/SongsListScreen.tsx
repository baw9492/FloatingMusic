import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
  Button,
  Pressable,
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
          renderItem={renderItem}
          // keyExtractor={(_, index) => String(index)}
          ListEmptyComponent={NoData}
        />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'white',
        }}>
        <Pressable onPress={() => {}} className="h-6">
          <Text>关闭</Text>
        </Pressable>
        <Pressable>
          <Text>收藏到歌单</Text>
        </Pressable>
      </View>
    </View>
  );
};

const renderItem = (item: ListRenderItemInfo<songdata>) => (
  <SongLink data={item.item} index={item.index} fn={() => {}} />
);

function NoData() {
  return <Text>没有数据</Text>;
}
