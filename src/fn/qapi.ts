async function searchSong(query: string, page_num: number) {
  try {
    const res = (
      await (
        await fetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "none",
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{"comm":{"ct":"19","cv":"1859","uin":"0"},"req":{"method":"DoSearchForQQMusicDesktop","module":"music.search.SearchCgiService","param":{"grp":1,"num_per_page":20,"page_num":${page_num},"query":"${query}","search_type":0}}}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        })
      ).json()
    ).req.data.body.song.list as any[];
    // fs.writeFile("./temp.json", JSON.stringify(res), () => {});
    // 格式化数据
    return res.map<songdata>((i) => ({
      _id: i.mid,
      name: i.name,
      artist: i.singer.map((i2: { name: any }) => i2.name),
      album: i.album.name,
      from: "qq",
      cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${i.album.mid}.jpg`,
      pay_play: Boolean(i.pay.pay_play),
      src: undefined,
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}
/** 查找歌单 */
async function searchSongList(query: string, page_num: number) {
  try {
    const res = (await (
      await (
        await fetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "none",
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{"comm":{"ct":"19","cv":"1859","uin":"0"},"req":{"method":"DoSearchForQQMusicDesktop","module":"music.search.SearchCgiService","param":{"grp":1,"num_per_page":20,"page_num":${page_num},"query":"${query}","search_type":3}}}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        })
      ).json()
    ).req.data.body.songlist.list) as any[];

    // 格式化数据
    return res.map<songlistdata>((i) => ({
      _id: i.dissid,
      title: i.dissname,
      cover: i.imgurl,
      // dec: i.introduction,
      song_count: i.song_count,
      dissid: i.dissid,
    })) as songlistdata[];
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function search(query: string, page_num: number, type: "song" | "songlist") {
  switch (type) {
    case "song":
      return searchSong(query, page_num);
    case "songlist":
      return searchSongList(query, page_num);
    default:
      return [];
  }
}

/**从歌单获取歌曲列表 */
export async function getSongDataFromSongList(dissid: string) {
  try {
    const res1 = await await (
      await fetch(
        `https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&nosign=1&disstid=${dissid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7",
            "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "none",
            Referer: "https://y.qq.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          body: null,
          method: "GET",
        }
      )
    ).json();
    // console.log(res1);

    const res = res1.cdlist[0].songlist as any[];

    // const mids = res.map<string>((i) => i.songmid);
    // fs.writeFile("./temp/mids.json", JSON.stringify(mids), () => {});
    // const srcs = await getSource(mids);
    // fs.writeFile("./temp/srcs.json", JSON.stringify(srcs), () => {});
    return res.map<songdata>((i, index) => ({
      _id: i.songmid,
      name: i.songorig,
      cover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${i.albummid}.jpg`,
      artist: i.singer.map((i2: { name: any }) => i2.name),
      album: i.albumname,
      from: "qq",
      src: undefined,
      pay_play: i.pay.payplay,
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

/** 获取歌曲地址 */
export async function getSource(mids: string[]) {
  const param = {
    req_0: {
      module: "vkey.GetVkeyServer",
      method: "CgiGetVkey",
      param: {
        filename: mids.map((mid) => `M500${mid}${mid}.mp3`),
        guid: "10000",
        songmid: mids,
        songtype: [0],
        uin: "0",
        loginflag: 1,
        platform: "20",
      },
    },
    loginUin: "0",
    comm: { uin: "0", format: "json", ct: 24, cv: 0 },
  };
  const data = await (
    await fetch(`https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=${JSON.stringify(param)}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7",
        "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "none",
        // cookie: dv.cookie,
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      method: "GET",
    })
  ).json();
  return data.req_0.data.midurlinfo.map((i: { purl: string }) =>
    i.purl ? data.req_0.data.sip[0] + "/" + i.purl : null
  ) as (string | null)[];
}

/** 从歌单获取歌曲url地址 */
export async function getSourceFormSongList(mids: string[]) {
  // 因为使用get请求, 参数太多会导致url过长, 所以需要分割数组, 设置每次请求50个数据
  const idArr = splitArr(mids, 50);
  const promiseArr = idArr.map((i) => getSource(i));
  const data = await Promise.all(promiseArr);
  let res: (string | null)[] = [];
  for (let i of data) {
    res = [...res, ...i];
  }
  return res;
}

/** 获取推荐歌单列表 */
export async function getRecommend(page: number) {
  const pageSize = 20;
  const params = new URLSearchParams({
    inCharset: "utf8",
    outCharset: "utf-8",
    sortId: "5",
    categoryId: "10000000",
    sin: String(pageSize * (page - 1)),
    ein: String(page * pageSize - 1),
  });
  const res = await fetch(
    "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?" + params,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7",
        "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "none",
        Referer: "https://y.qq.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  const data = await res.text();
  const list = JSON.parse(data.replace(/callback\(|MusicJsonCallback\(|jsonCallback\(|\)$/g, ""))
    .data.list as any[];
  return list.map<songlistdata>((i) => ({
    _id: i.dissid,
    title: i.dissname,
    cover: i.imgurl,
  }));
}

/** 分割数组 */
function splitArr<T>(ar: T[], size = 1) {
  let index = 0;
  let res = [];
  while (index < ar.length) {
    res.push(ar.slice(index, index + size));
    index += size;
  }
  return res;
}

/** 获取歌词 */
export async function getLrc(songmid: string): Promise<string> {
  return (
    await (
      await fetch(
        `https://i.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&format=json&inCharset=utf8&outCharset=utf-8&nobase64=1`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7",
            "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "none",
            Referer: "https://y.qq.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          method: "GET",
        }
      )
    ).json()
  ).lyric;
}
