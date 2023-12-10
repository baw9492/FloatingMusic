import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  State,
  Track,
} from 'react-native-track-player';

class PlayControl {
  isPlaying = false;
  playList: songdata[] = [];
  playingIndex = -1; // playList为空时为-1
  playingTrack: songdata | undefined;

  constructor() {
    TrackPlayer.addEventListener(Event.PlaybackState, async event => {
      if (event.state === State.Playing) this.isPlaying = true;
    });
    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async event => {
      if (event.nextTrack === 0) {
        return;
      } else if (event.nextTrack === 1) {
        await TrackPlayer.reset();
        const nextSong = this.playList[this.playingIndex + 1];
        const track: Track = {
          url: nextSong.src ?? '',
          title: nextSong.name,
          album: nextSong.album,
          artwork: nextSong.cover,
          artist: nextSong.artist ? nextSong.artist[0] : undefined,
        };
        await TrackPlayer.add([track, track]);
        await TrackPlayer.play();
      }
    });
  }

  /** 设置播放列表 */
  setList(songs: songdata[]) {
    this.playList = songs;
  }

  /** 添加到下一首播放 */
  addToNext(song: songdata) {
    if (typeof this.playingIndex === 'number')
      this.playList.splice(this.playingIndex + 1, 0, song);
    else this.playList.push(song);
  }

  /** 跳到下一曲 */
  skipToNext() {}

  /** 设置新的播放轨道 */
  private async setTrack(songdata: songdata) {
    await TrackPlayer.reset();
    const track: Track = {
      url: songdata.src ?? '',
    };
    TrackPlayer.add([]);
  }
}

// useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
//   switch (event.type) {
//     case Event.PlaybackTrackChanged:
//       console.log(`当前正在播放${event.nextTrack}`);
//       break;

//     default:
//       break;
//   }
// });
