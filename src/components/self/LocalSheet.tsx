import {View} from 'react-native';
import SongListLink from '../SongListLink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export default (props: {dataArr: any[]}) => {
  return (
    <View>
      {props.dataArr.map((v, i) => {
        return <SongListLink data={v} key={i} />;
      })}
    </View>
  );
};
