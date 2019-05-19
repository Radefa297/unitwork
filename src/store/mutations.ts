import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state: { singer: any; }, singer: any){
        state.singer = singer
    },
    [types.SET_PLAY_STATUS](state: { playStatus: any; }, flag: any){
        state.playStatus = flag
    },
    [types.SET_FULL_SCREEN](state: { fullScreen: any; }, flag: any){
        state.fullScreen = flag
    },
    [types.SET_PLAY_LIST](state: { playList: any; }, list: any){
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state: { sequenceList: any; }, list: any){
        state.sequenceList = list
    },
    [types.SET_CURRENT_INDEX](state: { currentIndex: any; }, index: any){
        state.currentIndex = index
    },
    [types.SET_MODE](state: { mode: any; }, mode: any){
        state.mode = mode
    },
    [types.SET_SEARCH_HISTORY](state: { searchHistory: any; }, searchHistory: any){
        state.searchHistory = searchHistory
    },
    [types.SET_PLAY_HISTORY](state: { playHistory: any; }, playHistory: any){
        state.playHistory = playHistory
    },
    [types.SHOW_LOAD](state: { loading: any; }, loading: any){
        state.loading = loading
    },
    [types.SET_FAVORITE_LIST](state: { favoriteList: any; }, favoriteList: any){
        state.favoriteList = favoriteList
    }
};
export default mutations