import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import {getLrc} from '../fn/qapi';

const stateContext = createContext<Track | null>(null);
export const useDState = () => useContext(stateContext);
const lrcContex = createContext<null | ILyric.ILyricItem>(null);
export const useLrcContex = () => useContext(lrcContex);

export const DState = ({children}: PropsWithChildren) => {
  console.log('全局状态已更新');

  const [track, setTrack] = useState<Track | null>(null);
  const [TrackState, setTrackState] = useState<TrackState>();

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      switch (event.type) {
        case Event.PlaybackTrackChanged:
          // console.log(await TrackPlayer.getTrack(event.nextTrack));
          console.log(event.nextTrack);
          if (event.nextTrack === undefined) break;
          const tempT = await TrackPlayer.getTrack(event.nextTrack);
          setTrack(tempT!);
          break;

        case Event.PlaybackState:
          if (event.state === State.Playing)
            setTrackState({...TrackState, isPlaying: true});
          break;
        default:
          break;
      }
    },
  );
  return (
    <stateContext.Provider value={track}>{children}</stateContext.Provider>
  );
};
