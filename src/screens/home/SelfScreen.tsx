import React, {startTransition, useEffect, useState} from 'react';
import FuncWrap from '../../components/FuncWrap';
import SongSheetLink from '../../components/SongSheetLink';
import StateCtx from '../../fn/StateCtx';
import {Button, Text, TextInput, View, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SongListLink from '../../components/SongListLink';

export default () => {
  const [show, setShow] = useState(false);
  const [newl, setnewl] = useState('');
  const [ll, setll] = useState<songlistdata[]>([]);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('locallist');
      if (value) {
        setll(JSON.parse(value));
      }
    })();
  }, []);

  const createNewSheet = async () => {
    setShow(false);
    if (newl === '') return;
    const newData: songlistdata = {title: newl, songIds: []};
    const value = await AsyncStorage.getItem('locallist');
    if (!value) {
      AsyncStorage.setItem('locallist', JSON.stringify([newData]));
    } else {
      const parseData = JSON.parse(value) as songlistdata[];
      await AsyncStorage.setItem(
        'locallist',
        JSON.stringify([...parseData, newData]),
      );
    }
    setnewl('');
    setll(oldll => [...Array.from(oldll), newData]);
  };

  return (
    <>
      <FuncWrap />
      <Button
        title="创建歌单"
        onPress={() => {
          setShow(true);
        }}
      />
      {show && (
        <Modal animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'gray',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: 300, height: 300, backgroundColor: 'gray'}}>
              <TextInput
                placeholder="歌单名称"
                value={newl}
                onChangeText={setnewl}
              />
              <Button title="确认" onPress={createNewSheet} />
            </View>
          </View>
        </Modal>
      )}
      {ll.map((v, i) => {
        return <SongListLink data={v} key={i} />;
      })}
      <Button
        title="drop"
        onPress={async () => {
          AsyncStorage.removeItem('locallist');
          setll([]);
        }}
      />
    </>
  );
};
