import {ObjectId} from 'mongodb';
import {songlists, songs} from '.';
enum SearchType {
  Song,
  SongList,
}

export async function findSong(keyWord: string, type: SearchType) {
  switch (type) {
    case SearchType.Song: {
      const cur = songs.find({
        $or: [
          {name: {$regex: keyWord}},
          {album: {$regex: keyWord}},
          {artist: {$regex: keyWord}},
        ],
      });
      let sArr: any[] = [];
      for await (const item of cur) {
        sArr.push(item);
      }
      return sArr;
    }
    case SearchType.SongList: {
      const cur = songlists.find({title: keyWord}).limit(20);
      let slArr: any[] = [];
      for await (const item of cur) {
        slArr.push(item);
      }
      return slArr;
    }
    default:
      return [];
  }
}

export async function getSongsByIds(Ids: string[]) {
  const objectIds = Ids.map(v => new ObjectId(v));
  const cur = songs.find({_id: {$in: objectIds}});
  const res = new Array(objectIds.length);
  for await (const item of cur) {
    res[objectIds.indexOf(item._id)] = item;
  }
  return res;
}
