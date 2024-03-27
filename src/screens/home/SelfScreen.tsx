import React, {useEffect, useState} from 'react';
import FuncWrap from '../../components/FuncWrap';
import {Button, Text, TextInput, View, Modal, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SongListLink from '../../components/SongListLink';
import LocalSheet from '../../components/self/LocalSheet';
import {useLocalSheet} from '../../lib/states/localsheet';

export default () => {
  const [show, setShow] = useState(false);
  const [newl, setnewl] = useState('');
  const {value, setValue} = useLocalSheet()!;

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
  };

  return (
    <>
      {/* <FuncWrap /> */}
      <View className="flex-row justify-end">
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
              <View className="border border-black w-[80%] justify-between">
                <TextInput
                  className="mx-4 pb-1 border-b border-black"
                  placeholder="歌单名称"
                  value={newl}
                  onChangeText={setnewl}
                />
                <View className="p-2 w-[100%] flex-row">
                  <Pressable
                    onPress={() => {}}
                    className="flex-1 bg-red-400 h-8 justify-center items-center">
                    <Text className="text-white">取消</Text>
                  </Pressable>
                  <Pressable
                    onPress={createNewSheet}
                    className="flex-1 bg-blue-400 justify-center items-center">
                    <Text className="text-white">确定</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
      <LocalSheet dataArr={value} />
    </>
  );
};
