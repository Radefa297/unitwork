import * as types from './mutation-types'
// @ts-ignore
import {playMode} from '~/js/config'
// @ts-ignore
import {shuffle, resetCurrentIndex} from '~/js/util'
// @ts-ignore
import {saveStore, clearStore, deleteStore} from '~/js/cache'
// @ts-ignore
import {PLAY_KEY, SEARCH_KEY, FAVORITE_KEY, PLAY_MAX_LEN, SEARCH_MAN_LEN, FAVORITE_MAX_LEN} from '~/js/config.js'
//播放歌曲
export const selectPlay = ({commit, state}: { commit: any; state: any }, {list, index}: { list: any; index: any }) => {
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.mode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAY_LIST, randomList);
        index = resetCurrentIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAY_LIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAY_STATUS, true)
};
//顺序播放全部
export const playAll = ({commit}: { commit: any }, {list}: { list: any }) => {
    commit(types.SET_MODE, playMode.sequence);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_PLAY_LIST, list);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAY_STATUS, true)
};
//单曲插入播放列表
export const insertSong = ({commit, state}: { commit: any; state: any }, {song}: { song: any }) => {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    //查到当前播放列表没有这首歌
    //顺序播放
    let fpIndex = resetCurrentIndex(playList, song);
    currentIndex++;
    //插入当前歌曲后一位
    playList.splice(currentIndex, 0, song);
    if (fpIndex > -1) {
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1);
            currentIndex--;
        } else {
            playList.splice(fpIndex + 1, 1);
        }
    }
    //随机播放
    let fsIndex = resetCurrentIndex(sequenceList, song);
    sequenceList.splice(currentIndex, 0, song);
    if (fsIndex > -1) {
        if (currentIndex > fsIndex) {
            playList.splice(fsIndex, 1);
        } else {
            playList.splice(fsIndex + 1, 1);
        }
    }
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_PLAY_LIST, playList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAY_STATUS, true)
};
//删除歌曲
export const deleteSong = ({commit, state}: { commit: any; state: any }, song: { song: any; }) => {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    //顺序播放
    let fpIndex = resetCurrentIndex(playList, song);
    playList.splice(fpIndex, 1);
    //随机播放
    let fsIndex = resetCurrentIndex(sequenceList, song);
    sequenceList.splice(fsIndex, 1);
    //如果删除的是index后面的不作为，反之index更改为当前歌
    if (currentIndex > fpIndex || currentIndex === playList.length) {
        currentIndex--;
    }
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_PLAY_LIST, playList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    //当没有歌曲了PLAY_STATUS false 还有true
    const playingState = playList.length > 0;
    commit(types.SET_PLAY_STATUS, playingState)
};
//删除全部
export const deleteSongList = ({commit}: { commit: any }) => {
    commit(types.SET_SEQUENCE_LIST, []);
    commit(types.SET_PLAY_LIST, []);
    commit(types.SET_CURRENT_INDEX, -1);
    commit(types.SET_PLAY_STATUS, false)
};
//保存搜索历史
export const saveSearchHistory = ({commit}: { commit: any }, key: { key: any; }) => {
    commit(types.SET_SEARCH_HISTORY, saveStore(SEARCH_KEY, key, (item: { key: any; }) => {
        return item === key
    }), SEARCH_MAN_LEN);
};
//删除搜索历史
export const deleteSearchHistory = ({commit}: { commit: any }, key: { key: any; }, index: { index: any }) => {
    commit(types.SET_SEARCH_HISTORY, deleteStore(SEARCH_KEY, index));
};
//保存历史纪录
export const savePlayHistory = ({commit}: { commit: any }, song: {
    id: any;
}) => {
    commit(types.SET_PLAY_HISTORY, saveStore(PLAY_KEY, song, (item: {
        id: any;
    }) => {
        return item.id === song.id
    }), PLAY_MAX_LEN);
};
//删除历史纪录
export const deletePlayHistory = ({commit}: { commit: any }, key: { key: any; }, index: { index: any }) => {
    commit(types.SET_PLAY_HISTORY, deleteStore(PLAY_KEY, index));
};
//清空历史纪录
export const clearPlayHistory = ({commit}: { commit: any }) => {
    commit(types.SET_PLAY_HISTORY, clearStore(PLAY_KEY, []));
};
//保存收藏列表
export const saveFavoriteList = ({commit}: { commit: any }, song: {
    id: any;
}) => {
    commit(types.SET_FAVORITE_LIST, saveStore(FAVORITE_KEY, song, (item: {
        id: any;
    }) => {
        return item.id === song.id
    }), FAVORITE_MAX_LEN);
};
//删除收藏列表
export const deleteFavoriteList = ({commit}: { commit: any }, key: { key: any; }, index: { index: any }) => {
    commit(types.SET_FAVORITE_LIST, deleteStore(FAVORITE_KEY, index));
};
//清空收藏列表
export const clearFavoriteList = ({commit}: { commit: any }) => {
    commit(types.SET_FAVORITE_LIST, clearStore(FAVORITE_KEY, []));
};