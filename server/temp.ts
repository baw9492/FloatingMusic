import {findSong, getSongsByIds} from './lib/db/find';

(async () => {
  // const data = await findSong('ユメの喫茶店', 0);
  // console.log(data);

  const data = await getSongsByIds([
    '65405bb1f431ecb0f7bc4364',
    '65405bb1f431ecb0f7bc4367',
  ]);
  console.log(data);
})();
