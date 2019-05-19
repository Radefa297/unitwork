<template>
	<div>
		<v-imageCard
			:info="cdInfo"
			subtitle
			title
		>
			<v-chip
					slot="brief"
					outline
					v-for="tag in cdInfo.tags"
					:key="`tagId-${tag.id}`"
					label
					small
					color="yellow darken-2"
			>
				{{tag.name}}
			</v-chip>
		</v-imageCard>
		<v-songList
				:total="total"
				:songList="songList"
				@v-selectSong="selectSong"
				@v-playAll="togglePlayAll"
		></v-songList>
	</div>
</template>

<script>
    import {apiURL} from "~/js/apiUrl";
    import {createSong, getFilenames, getVKey} from "~/js/songClass"
    import {playListMixin} from '@/components/mixin/playList'

    export default {
        mixins: [playListMixin],
        name: "songList",
	    created() {
		    this.getCDInfo()
        },
	    data(){
            return{
                cdInfo: {},
	            total: null,
	            songList: []
		    }
	    },
	    methods: {
            getCDInfo(){
                var params = this.qs.stringify({
                    action: 'qqmusic_playlist',
                    data: 'getdata',
	                id: this.$route.params.id,
	                url:`https://y.qq.com/n/yqq/playlist/${this.$route.params.id}.html`
                });
                this.$http.post(apiURL.qqmusic,params).then((res) => {
                    const cdDetail = res.cdlist[0];
                    this.cdInfo = {
                        avatar : cdDetail.logo,
                        name : cdDetail.dissname,
                        subtitle : `已有${cdDetail.visitnum}位豆油播放`,
                        tags : cdDetail.tags.slice(0,2)
                    };
                    this.total = cdDetail.songnum;
                    this.normalizeSongs(cdDetail.songlist).then((songs) => {
                        this.songList = songs;
                    });
                })
            },
            //格式花数据
            normalizeSongs(list) {
                return new Promise((resolve, reject) => {
                    let reg = [];
                    let songMidList = list.map((value) => {
                        return value.songmid
                    });
                    let filenameList = getFilenames(songMidList);
                    getVKey(songMidList, filenameList)
                        .then((item) => {
                            item.songVKey.forEach((vkeyVa) => {
                                list.forEach((value, index) => {
                                    if (vkeyVa.songmid === value.songmid) {
                                        if (!!value.songid && !!value.albummid) {
                                            reg.push(createSong(value, vkeyVa.vkey, item.guid))
                                        }
                                    }
                                })
                            });
                            resolve(reg)
                        });
                })
            },
	    }
    }
</script>

<style scoped>
	>>>.v-image__image--preload {
		-webkit-filter: blur(30px);
		filter: blur(30px);
	}
</style>