interface songdata {
  _id?: string;
  name: string;
  cover?: string;
  artist?: string[];
  album?: string;
  from?: string;
  src?: string|null;
  pay_play: boolean;
}

interface authorData {
  id: string;
  name: string;
  songs: [];
  albums: [];
  imgUrl?: string;
  dinfo?: string;
}

type albumData = {
  id: string;
  name: string;
  coverImgUrl: string;
  songs: [];
  author: string;
  authorId: string;
};

type songlistdata = {
  _id?: string;
  title: string | undefined;
  cover?: string;
  songIds?: string[];
  dec?: string;
  song_count?: number;
  dissid?: string;
};

type TrackState = {
  isPlaying?: boolean;
  playingIndex?: number;
  playingSongInfo?: songdata;
};

interface StateCtx<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}
