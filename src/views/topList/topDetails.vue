<template>
	<div>
		<v-imageCard
				:info="topInfo"
				subtitle
		>
			<div slot="brief">{{topInfo.date ? `${topInfo.date} 期` : '最近暂无更新'}}</div>
		</v-imageCard>
		<v-songList :songList="songList" :total="total" @v-selectSong="selectSong" @v-playAll="togglePlayAll"></v-songList>
	</div>
</template>

<script>
    import imageCard from '@/components/card/imageCard'
    import songList from '@/components/song/songList'
    import {apiURL} from "~/js/apiUrl";
    import {createSong, getFilenames, getVKey} from "~/js/songClass";
    import {mapActions} from "vuex";

    export default {
        name: "topDetails",
        components: {
            'v-imageCard': imageCard,
            'v-songList': songList
        },
	    data() {
            return {
                total: null,
                topInfo: {},
                songList: []
            }
	    },
        mounted() {
            this.getTopInfo();
        },
        methods: {
            ...mapActions([
                'selectPlay',
                'playAll'
            ]),
            getTopInfo() {
                if (!this.$route.params.id) {
                    this.$router.push('/home/topList')
                }
                const params = this.qs.stringify({
                    action: 'qqmusic_topDetails',
                    data: 'getdata',
                    id: this.$route.params.id
                });
                this.$http.post(apiURL.qqmusic, params).then((res) => {
                    this.total = res.cur_song_num;
                    const topSong = res.songlist[0].data;
                    this.topInfo = {
                        name: res.topinfo.ListName,
                        avatar: res.topinfo.pic_v12,
                        subtitle: res.day_of_year ? `至今更新了${res.day_of_year}天` : `至今更新了${res.date.substring(5)}周`,
                        date: res.update_time,
                    };
                    console.log(res)
                    this.normalizeSongs(res.songlist).then((songs) => {
                        this.songList = songs;
                    });
                }).catch((err) => {
                    this.$snackbar({
                        msg: err.message
                    });
                })
            },
            normalizeSongs(list){
                return new Promise((resolve, reject) => {
                    let reg = [];
                    let songMidList = list.map((value) => {
                        return value.data.songmid
                    });
                    let filenameList = getFilenames(songMidList);
                    getVKey(songMidList, filenameList)
                        .then((item) => {
                            item.songVKey.forEach((vkeyVa) => {
                                list.forEach((value, index) => {
                                    let musicData = value.data;
                                    if (vkeyVa.songmid === musicData.songmid) {
                                        if (!!musicData.songid && !!musicData.albummid) {
                                            reg.push(createSong(musicData, vkeyVa.vkey, item.guid))
                                        }
                                    }
                                })
                            });
                            resolve(reg)
                        });
                })
            },
            //songList派发事件 song index
            selectSong(item, index){
                this.selectPlay({
                    list: this.songList,
                    index: index
                })
            },
            //playAll派发事件
            togglePlayAll(){
                this.playAll({
                    list: this.songList
                })
            },
        }
    }
</script>

<style scoped>

</style>