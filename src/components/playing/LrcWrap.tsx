import React, { PropsWithChildren, memo, useEffect, useMemo, useRef, useState } from "react";
import { Button, FlatList, LayoutRectangle, StyleSheet, Text, View } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import LyricParser from "../../fn/lrcParser";
import { useProgress } from "react-native-track-player";

export default () => {
  const listRef = useRef<FlatList<ILyric.IParsedLrcItem> | null>(null);
  // const [wordIndex, setWordIndex] = useState<number>(0);
  const [layout, setLayout] = useState<LayoutRectangle>();
  const [em1, setEm1] = useState(false);
  const [em2, setEm2] = useState(false);
  const emptyHeight = useMemo(() => (layout?.height ?? 0) / 2, [layout]);
  const position = useProgress(100).position;

  const lrc = useMemo(() => {
    const temp = new LyricParser(
      "[ti:残機 (《电锯人》TV动画片尾曲)]\n[ar:ずっと真夜中でいいのに。 (永远是深夜有多好｡)]\n[al:残機]\n[by:]\n[offset:0]\n[kana:1ざん1き1ま1よ1なか111111111し1きょく1へん1きょく1ひゃっ1かい1おう1と1はじ1か1な1で1あ1じ1ぼう1じ1き1へい1きん1てき1せい1ろん1びん1ぼう1ま1め1ざ1けん1こう1たい1はら1うた1み1ゆう1とう1せい1む1ち1おど1けっ1てん1げん1じょう1は1あく1ちゅう1だん1ちゅう1じょう1と1み1あ1れっ1とう1かん1もう1か1ちょっ1かん1じ1こ1ちゅう1り1かい1ふ1のう1もと1さん1じ1かい1くち1げん1か1い1がい1つら1さけ1く1ゆず1ひ1び1えい1よう1よご1ざん1き1あ1せき1ずい1はん1しゃ1るい1せん1にご1こえ1うた1かん1しゃ1ため1ぜっ1たい1ぜつ1めい1よる1き1も1へい1ぼん1せい1かつ1せん1て1ひっ1しょう1き1も1かえ1みず1にん1げん1いとな1じつ1めぐ1きょ1む1かん1とも1ねむ1け1さ1みみ1う1の1ほ1あい1ず1ち1なか1よ1じ1かん1ちょっ1かん1じ1こ1ちゅう1り1かい1ふ1のう1もと1さん1じ1かい1こま1し1てき1あ1がた1けっ1きょく1どう1こう1ひら1さけ1く1ゆず1ひ1び1えい1よう1よご1ざん1き1あ1せき1ずい1はん1しゃ1るい1せん1にご1こえ1うた1かん1しゃ1ため1ぜっ1たい1ぜつ1めい1よる1き1も1へい1ぼん1せい1かつ1せん1て1ひっ1しょう1き1も1おだ1だれ1めい1わく1おも1たたか1な1たん1じゅん1めい1かい1さけ1く1ゆず1ひ1び1えい1よう1よご1ざん1き1あ1せき1ずい1はん1しゃ1るい1せん1にご1こえ1うた1かん1しゃ1い1あい1こ1じっ1かん1わ1こしら1は1あっ1け1せき1ずい1はん1しゃ1るい1せん1しぼ1のう1うた1かん1しゃ1かゆ1うす1わら1まかな1み1ふ1あん1かん1あば1つか1あなど1きず1ぜっ1ちょう1けん1こう]\n[00:00.00]残機 - ずっと真夜中でいいのに。 (永远是深夜有多好｡)\n[00:07.63]词：ACAね\n[00:08.81]曲：ACAね\n[00:10.57]编曲：100回嘔吐/ZTMY\n[00:15.27]しょっぱいぜ\n[00:16.36]初めて嗅いで舐めた出会い\n[00:18.58]自暴自棄です 平均的な正論が貧乏\n[00:21.82]いらっしゃいませ\n[00:23.22]ニンニク増しで目指した健康体\n[00:25.28]腹歌満たしてる\n[00:27.43]\n[00:28.70]優等生\n[00:29.99]無知なフリして踊っちゃって\n[00:32.16]欠点です\n[00:33.49]現状把握しちゃうから中断中\n[00:35.57]もう譲渡\n[00:36.85]見せびらかし合いましょ劣等感妄\n[00:39.01]変えられゃしないって\n[00:40.52]わかってるからぁ？\n[00:41.67]直感で自己中な\n[00:43.62]理解不能プレイヤー\n[00:45.38]求められたなら惨事会\n[00:48.97]くだらん口喧嘩でマシになんだ\n[00:52.38]モットーもっと？\n[00:54.13]もう意外と辛いのに\n[00:56.43]\n[00:58.29]うざいくらい\n[00:59.20]叫んだって喰らったって\n[01:01.03]譲れない日々よ\n[01:02.79]栄養になってまた 汚しあえ\n[01:05.82]残機わかんなくて 上がんなくて\n[01:07.96]脊髄反射の涙腺は\n[01:09.46]濁った声で歌えば感謝です\n[01:12.93]試したいわ あたたかくて\n[01:16.34]絶体絶命な 夜は気持ちい\n[01:19.83]平凡な生活 ゆめみたけど\n[01:23.17]先手必勝が 気持ちいいな\n[01:26.93]\n[01:29.64]帰ってすぐに水やり 人間の営み\n[01:32.98]実のところ恵まれても\n[01:34.74]虚無感が友だち\n[01:36.39]眠気覚まし耳打ち\n[01:38.07]飲み干すまで合図血\n[01:40.11]仲良しこよしの時間\n[01:43.12]直感で自己中な\n[01:45.19]理解不能プレイヤー\n[01:46.61]求められたなら三次会\n[01:50.28]細かいご指摘も有り難き\n[01:53.50]結局 瞳孔開いてしまうのに\n[01:57.94]うざいくらい\n[01:59.01]叫んだって喰らったって\n[02:00.63]譲れない日々よ\n[02:02.34]栄養になってまた 汚しあえ？\n[02:05.20]残機わかんなくて 上がんなくて\n[02:07.46]脊髄反射の涙腺は\n[02:09.11]濁った声で歌えば感謝です\n[02:12.39]試したいわ あたたかくて\n[02:15.91]絶体絶命な 夜は気持ちい\n[02:19.34]平凡な生活 ゆめみたけど\n[02:22.74]先手必勝が 気持ちいいな\n[02:26.29]\n[02:39.54]ただ穏やかでいたい\n[02:42.22]誰にも\n[02:43.76]迷惑かけたくはないと思うが\n[02:48.95]戦わないと 撫でてもらえない\n[02:54.68]\n[02:55.96]単純明快でした\n[02:59.22]うざいくらい\n[03:00.33]叫んだって喰らったって\n[03:01.92]譲れない日々よ\n[03:03.52]栄養になってまた 汚しあえ\n[03:06.62]残機わかんなくて 上がんなくて\n[03:08.74]脊髄反射の涙腺は\n[03:10.35]濁った声で歌えば感謝です\n[03:13.42]言いたいことジャンケン\n[03:15.37]ご愛顧じゃ\n[03:16.88]まずは実感湧くまで 拵え\n[03:20.34]すぐ吐けなくて 呆気なくて\n[03:22.25]脊髄反射の涙腺は\n[03:23.86]萎んだ脳で歌えて感謝です\n[03:27.09]\n[03:29.19]だりいし痒いし薄っぺらい\n[03:30.74]くだらないことで笑いたかった\n[03:32.41]賄いじゃ満たされない不安感\n[03:34.16]暴れるのは疲れる でも侮れない\n[03:37.20]傷にはセッションで絶頂で健康で\n[03:39.94]きもちいな"
    );
    return temp.getLyric();
  }, []);

  const wordIndex: number = useMemo(() => {
    for (let i = 0; i < lrc.length; i++) {
      if (i + 1 === lrc.length || (position >= lrc[i].time && position < lrc[i + 1].time)) {
        // setWordIndex(i);
        return i;
      }
    }
    return 0;
  }, [position]);

  useEffect(() => {
    // console.log("触发滚动");
    // if (wordIndex == 0) return;
    if (wordIndex >= lrc.length) return;
    listRef.current?.scrollToIndex({ index: wordIndex, viewPosition: 0.5 });
  }, [wordIndex]);

  // useEffect(() => {
  //   for (let i = 0; i < lrc.length; i++) {
  //     if (i + 1 === lrc.length || (position >= lrc[i].time && position < lrc[i + 1].time)) {
  //       setWordIndex(i);
  //       return;
  //     }
  //   }
  // }, [position]);

  return (
    <>
      <FlatList
        style={styles.list}
        ref={(_) => (listRef.current = _)}
        data={lrc}
        renderItem={(item) => (
          <Text style={[styles.text, item.index === wordIndex && styles.highlight]}>
            {item.item.lrc}
          </Text>
        )}
        onLayout={(e) => {
          console.log("flatlist 加载完成");
          setLayout(e.nativeEvent.layout);
        }}
        ListHeaderComponent={<View style={{ height: emptyHeight }} onLayout={() => setEm1(true)} />}
        ListFooterComponent={<View style={{ height: emptyHeight }} onLayout={() => setEm2(true)} />}
        // initialScrollIndex={wordIndex}
        onScrollToIndexFailed={(info) => {
          // 等待500毫秒后再次尝试滚动到指定元素
          console.log(`滚动失败: ${JSON.stringify(info)}`);
          const wait = new Promise((resolve) => setTimeout(resolve, 1000));
          wait.then(() => {
            listRef.current?.scrollToIndex({ index: info.index, viewPosition: 0.5 });
            console.log("滚动完成");
          });
        }}
        // getItemLayout={() => ({ index: wordIndex, offset: 0, index: 0 })}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const EmptyView = (height: number) => {
  return <View style={{ height: height }} />;
};

const styles = StyleSheet.create({
  list: {
    width: "80%",
  },
  highlight: {
    color: "white",
  },
  text: {
    color: "gray",
    // marginVertical: 12,
    textAlign: "center",
    fontSize: 15,
    paddingVertical: 12,
  },
});
