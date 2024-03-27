import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import ds from '../../../ds';
import TrackPlayer from 'react-native-track-player';
import getToLocalSheet from '../../lib/addToLocalSheet';

export default function SongItem({value}: {value: any}) {
  const artists = value.artist?.join();
  const [showMenu, setShowMenu] = useState(false);
  const [showls, setShowls] = useState(false);
  const [localSheet, setLocalSheet] = useState<any[]>([]);
  // console.log(StyleSheet.hairlineWidth);
  const addAndPlay = async () => {
    console.log(value);

    // const uri = (await getSource([value._id!]))[0];
    if (!value.src) return;
    const index = await TrackPlayer.add({
      url: value.src,
      title: value.name,
      artist: value.artist?.join('/'),
      album: value.album,
      artwork: value.cover,
    });
    console.log('here');

    console.log(index);

    if (typeof index === 'number') {
      TrackPlayer.skip(index);
      console.log('开始播放');
      TrackPlayer.play();
    }
  };
  return (
    <View>
      <Pressable
        android_ripple={{color: 'gray'}}
        style={[styles.main, value.pay_play && styles.disable]}
        onPress={addAndPlay}
        disabled={value.pay_play}>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.title}>
            {value.name}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.dinfo}>{`${artists} - ${value.album}`}</Text>
        </View>
        <View>
          <Pressable
            android_ripple={{color: 'gray'}}
            style={[styles.more_btn, ds.center]}
            onPress={() => {
              setShowMenu(true);
            }}>
            <Text style={styles.ico}>&#xe5d4;</Text>
          </Pressable>
          {showMenu && (
            <Modal transparent={true}>
              <Pressable
                className="justify-center items-center flex-1 bg-[#00000050]"
                onPress={() => {
                  setShowMenu(false);
                }}>
                <View className="bg-gray-200 border border-black items-center">
                  <Pressable
                    className="p-2 w-full"
                    onPress={async () => {
                      const _d = await getToLocalSheet();
                      setLocalSheet(_d);
                      setShowMenu(false);
                      setShowls(true);
                    }}>
                    <Text>添加到歌单</Text>
                  </Pressable>
                  <Pressable
                    className="p-2 w-full "
                    onPress={() => setShowMenu(false)}>
                    <Text>关闭</Text>
                  </Pressable>
                </View>
              </Pressable>
            </Modal>
          )}
        </View>
      </Pressable>
      {showls && (
        <Modal transparent={true}>
          <View className=" justify-center items-center flex-1">
            <View className="bg-gray-200 border border-black items-center">
              {localSheet.map((v, i) => (
                <Pressable
                  key={i}
                  className="p-2 w-full"
                  onPress={() => {
                    setShowls(false);
                  }}>
                  <Text>{v.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  disable: {
    backgroundColor: 'gray',
  },
  serial_box: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serial_text: {
    fontSize: 16,
  },
  more_btn: {
    width: 50,
    height: '100%',
  },
  info: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
  ico: {
    fontFamily: 'gicon',
    fontSize: 20,
  },
  dinfo: {
    fontSize: 12,
  },
});
