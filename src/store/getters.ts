export const loading = (state: { loading: any; }) => state.loading;

export const singer = (state: { singer: any; }) => state.singer;

export const playStatus = (state: { playStatus: any; }) => state.playStatus;

export const fullScreen = (state: { fullScreen: any; }) => state.fullScreen;

export const playList = (state: { playList: any; }) => state.playList;

export const sequenceList = (state: { sequenceList: any; }) => state.sequenceList;

export const currentIndex = (state: { currentIndex: any; }) => state.currentIndex;

export const currentSong = (state: {
        currentIndex: any;
        playList: any;
    }) => {
        return state.playList[state.currentIndex] || {}
    };

export const mode = (state: { mode: any; }) => state.mode;

export const searchHistory = (state: { searchHistory: any; }) => state.searchHistory;

export const playHistory = (state: { playHistory: any; }) => state.playHistory;

export const favoriteList = (state: { favoriteList: any; }) => state.favoriteList;
