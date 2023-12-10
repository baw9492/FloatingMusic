import React, {memo, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Button} from 'react-native';
import ds from '../../../ds';
import {Divider, Menu} from 'react-native-paper';

const SongLink = (props: {
  data: songdata;
  index: number;
  fn?: (number: number) => any;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Pressable
      android_ripple={{color: 'gray'}}
      style={[styles.main, props.data.pay_play && styles.disable]}
      onPress={() => {}}
      disabled={Boolean(props.data.pay_play)}>
      <View style={styles.serial_box}>
        <Text style={styles.serial_text} numberOfLines={1}>
          {props.index + 1}
        </Text>
      </View>
      <View style={styles.bl}>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.title}>
            {props.data.name}
          </Text>
          <Text numberOfLines={1} style={styles.dinfo}>{`${
            props.data.artist![0]
          } - ${props.data.album}`}</Text>
        </View>
        <Pressable
          android_ripple={{color: 'gray'}}
          style={[styles.more_btn, ds.center]}
          onPress={() => {}}>
          <Text style={styles.ico}>&#xe5d4;</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};
export default memo(SongLink);

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  disable: {backgroundColor: 'gray'},
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
  bl: {
    flex: 1,
    height: '100%',
    borderBottomColor: '#73737370',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  ico: {
    fontFamily: 'gicon',
    fontSize: 20,
  },
  dinfo: {
    fontSize: 12,
  },
});
