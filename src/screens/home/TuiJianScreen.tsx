import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import {getRecommend} from '../../fn/qapi';
// import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import {useNavigation} from '@react-navigation/native';

export default () => {
  const [info, setInfo] = useState<songlistdata[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getRecommend(1).then(v => {
      setInfo(v);
    });
  }, []);

  const emptyArr = useMemo(() => {
    const len = 3 - (info.length % 3);
    return [...Array(len)].map((_, i) => (
      <View key={i} style={{width: '30%'}} />
    ));
  }, [info]);

  return (
    <FlatList
      // columnWrapperStyle={{ justifyContent: "space-evenly" }}
      numColumns={3}
      data={info}
      renderItem={i => (
        <ReSongListLink
          data={i.item}
          fn={() => {
            //@ts-ignore
            navigation.navigate('SongList', {data: i.item});
          }}
        />
      )}
      // estimatedItemSize={167}
      // ListFooterComponent={
      //   <View key={0} style={{ width: "30%", height: 20, backgroundColor: "pink" }} />
      // }
    />
  );
};

const imgWH = Dimensions.get('screen').width * 0.3;

function ReSongListLink(props: {data: songlistdata; fn: Function}) {
  return (
    <Pressable
      style={state => [styles_rsll.btn, state.pressed && {opacity: 0.7}]}
      onPress={() => props.fn()}>
      <Image source={{uri: props.data.cover}} style={styles.img} />
      <Text style={styles_rsll.text} numberOfLines={2}>
        {props.data.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  img: {
    width: imgWH,
    height: imgWH,
    borderRadius: 6,
    alignSelf: 'center',
  },
  list: {
    // alignItems:'center'
    // justifyContent: "space-evenly",
  },
});

const styles_rsll = StyleSheet.create({
  btn: {
    flex: 1,
    marginBottom: 15,
  },
  text: {
    color: 'black',
  },
});
