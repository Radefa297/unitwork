<template>
	<div class="singerDetails">
		<v-me-scroll @v-upCallback="getInfo" mescrollUpAuto>
			<v-imageCard
					subtitle
					title
					:info="singer"
					class="nav-top mescroll-touch-y"
			>
				<div slot="brief" class="briefOverflow-3 text-overflow">{{singer.brief}}</div>
			</v-imageCard>
			<v-songList
					:songList="songList"
					:total="total"
					@v-selectSong="selectSong"
					@v-playAll="togglePlayAll">
			</v-songList>
		</v-me-scroll>
	</div>
</template>

<script>
    import meScroll from '@/components/mescroll/mescroll.vue'
    import {apiURL} from "~/js/apiUrl";
    import {mapGetters, mapMutations} from 'vuex'
    import {createSong, getFilenames, getVKey} from "~/js/songClass";
    import Singer from "../../common/js/singerClass";
	import {playListMixin} from '@/components/mixin/playList'
    export default {
        mixins: [playListMixin],
        name: "singerDetails",
        components: {
            'v-me-scroll': meScroll
        },
        data() {
            return {
                total: null,
                songList: []
            }
        },
        mounted() {
            this.getSingerInfo();
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        methods: {
            getSingerInfo() {
                const params = this.qs.stringify({
                    action: 'qqmusic_singerInfo',
                    data: 'getdata',
                    value: {
                        singer: {
                            method: 'get_singer_detail_info',
                            param: {
                                singermid: this.$route.params.id
                            },
                            module: 'music.web_singer_info_svr'
                        }
                    }
                });
                this.$http.post(apiURL.qqmusic, params)
                    .then((res) => {
                        const response = res.singer.data;
                        const singerInfo = new Singer({
                            id: response.singer_info.mid,
                            name: response.singer_info.name,
                            subtitle: `${response.singer_info.fans} Fans`,
                            totalAlbum: response.total_album,
                            totalMv: response.total_mv,
                            totalSong: response.total_song,
                            brief: response.singer_brief.replace(`${response.singer_info.name}，`,'')
                        });
                        this.setSinger(singerInfo);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            //获取歌曲列表
            getInfo(page, mescroll) {
                if (!this.singer) {
                    this.$router.push('/home/singerList')
                }
                var params = this.qs.stringify({
                    action: 'qqmusic_singerDetails',
                    data: 'getdata',
                    id: this.$route.params.id,
                    begin: page.num,
                    num: page.size
                });
                this.$http.post(apiURL.qqmusic, params).then((res) => {
                    this.total = res.data.total;
                    if (page.num === 1) this.songList = [];
                    this.normalizeSongs(res.data.list).then((songs) => {
                        this.songList = this.songList.concat(songs);
                        this.$nextTick(() => {
                            mescroll.endSuccess(this.songList.length)
                        });
                    });


                }).catch((err) => {
                    mescroll.endErr();
                    this.$snackbar({
                        msg: err.message
                    });
                })
            },
            //格式花数据
            normalizeSongs(list) {
                return new Promise((resolve, reject) => {
                    let reg = [];
                    let songMidList = list.map((value) => {
                        return value.musicData.songmid
                    });
                    let filenameList = getFilenames(songMidList);
                    getVKey(songMidList, filenameList)
                        .then((item) => {
                            item.songVKey.forEach((vkeyVa) => {
                                list.forEach((value, index) => {
                                    let musicData = value.musicData;
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
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        }
    }
</script>

<style scoped>
	.briefOverflow-3 {
		-webkit-line-clamp: 3;
	}
</style>