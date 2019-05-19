import {apiURL} from "./apiUrl";

const qs = require('qs');
const axios = require('axios');
export default class Song {
    /*
    *   {id}音乐ID
    *   {mid}音乐mid
    *   {singer}歌手
    *   {name}歌曲名称
    *   {album}专辑NAME
    *   {duration}时长
    *   {url}歌曲播放地址
    *   {image}歌曲IMG
    * */
    constructor({id, mid, singer, name, album, duration, image, url, isPayPlay}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
        this.isPayPlay = isPayPlay;
    }
}

export function createSong(musicData, vkey, guid) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        duration: musicData.interval,
        isPayPlay: musicData.pay.payplay,
        // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=${guid}&vkey=${vkey}&uin=0&fromtag=38`
        url: `http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=${guid}&vkey=${vkey}&uin=0&fromtag=38`
    })
}

export function getVKey(songMid, filename) {
    return new Promise((resolve, reject) => {
        songMid = songMid.length > 0 && songMid instanceof Array ? songMid.join(",") : songMid;
        filename = filename.length > 0 && filename instanceof Array ? filename.join(",") : filename;
        let _guid = getRandom();
        let params = qs.stringify({
            action: 'qqmusic_songVKey',
            data: 'getdata',
            id: songMid,
            filename: filename,
            guid: _guid
        });
        axios.post(apiURL.qqmusic, params)
            .then((res) => {
                resolve({
                    songVKey: res.data.items,
                    guid: _guid
                })
            });
    })
}

//根据songMid拼接成filename
export function getFilenames(songMids) {
    if (!songMids instanceof Array) return `C400${songMids}.m4a`;
    return songMids.map((value) => {
        return `C400${value}.m4a`
    })
}

//获取随机数
function getRandom() {
    const t = (new Date).getUTCMilliseconds();
    return Math.round(2147483647 * Math.random()) * t % 1e10;
}

function filterSinger(singer) {
    if (!singer) return '';
    const reg = singer.map((value) => {
        return value.name
    });
    return reg.join('/');
}