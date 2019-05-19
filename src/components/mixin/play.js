import {mapActions, mapGetters, mapMutations} from "vuex";
import {resetCurrentIndex, shuffle} from "../../common/js/util";
import {playMode} from "../../common/js/config";

export const playMixin = {
    computed: {
        ...mapGetters([
            'currentSong',
            'sequenceList',
            'currentIndex',
            'mode',
            'favoriteList'
        ])
    },
    filters: {
        filterMode(value) {
            const table = {
                0: 'repeat',
                1: 'repeat_one',
                2: 'shuffle',
            };
            return table[value]
        }
    },
    methods: {
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayStatus: 'SET_PLAY_STATUS',
            setMode: 'SET_MODE',
            setPlayList: 'SET_PLAY_LIST'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ]),
        //播放模式被修改时
        changeMode() {
            const mode = (this.mode + 1) % 3;
            this.setMode(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList);
            } else {
                list = this.sequenceList
            }
            let index = resetCurrentIndex(list, this.currentSong);
            this.setCurrentIndex(index);
            this.setPlayList(list)
        },
        //点击我收藏图标触发
        toggleFavorite(currentSong) {
            const status = this.isFavorite(currentSong);
            this.$snackbar({
                msg: status ? '收藏成功' : '取消收藏成功',
                // color: status ? 'success' : 'info'
            })
            !status ?  this.saveFavoriteList(currentSong) : this.deleteFavoriteList(currentSong)
        },
        //过滤是否收藏图标
        isFavorite(currentSong) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === currentSong.id
            });
            return index > -1
        }
    }
};