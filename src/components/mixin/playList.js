import imageCard from '@/components/card/imageCard'
import songList from '@/components/song/songList'
import {mapActions} from "vuex";

export const playListMixin = {
    components: {
        'v-imageCard': imageCard,
        'v-songList': songList
    },
    methods: {
        ...mapActions([
            'selectPlay',
            'playAll'
        ]),
        //songList派发事件 song index
        selectSong(item, index) {
            if (item.isPayPlay === 1) {
                this.$snackbar({
                    msg: '因版权限制或付费歌曲，暂不支持播放该歌曲',
                    color: 'error'
                });
                return false
            }
            this.selectPlay({
                list: this.songList,
                index: index
            })
        },
        //playAll派发事件
        togglePlayAll() {
            this.playAll({
                list: this.songList
            })
        },
    }
};