// @ts-ignore
import {playMode} from '@/common/js/config.js'
// @ts-ignore
import {loadStore} from '@/common/js/cache.js'
// @ts-ignore
import {PLAY_KEY, SEARCH_KEY, FAVORITE_KEY} from '~/js/config.js'

const state = {
    loading: false,
    singer: {},
    //是否播放
    playStatus: false,
    //是否全屏显示
    fullScreen: false,
    //当前播放列表
    playList: [],
    //顺序播放列表
    sequenceList: [],
    //当前播放索引
    currentIndex: -1,
    //模式
    mode: playMode.sequence,
    //搜索历史
    searchHistory: loadStore(SEARCH_KEY),
    //播放历史
    playHistory: loadStore(PLAY_KEY),
    //收藏列表
    favoriteList: loadStore(FAVORITE_KEY)
};
export default state