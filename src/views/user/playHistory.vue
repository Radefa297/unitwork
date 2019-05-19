<template>
	<div class="play-history">
		<v-imageCard
			:info="cdInfo"
			subtitle
			title
		>
			<p slot="brief">{{`最大存储容量为${maxLen}首`}}</p>
		</v-imageCard>
		<v-songList
				:total="songList.length"
				:songList="songList"
				@v-selectSong="selectSong"
				@v-playAll="togglePlayAll"
				v-if="songList.length"
		></v-songList>
		<no-result v-else blockquote="暂无播放记录 听听歌就有了噢~"></no-result>
	</div>
</template>

<script>
    import {playListMixin} from '@/components/mixin/playList'
    import {mapGetters} from "vuex";
    import {formatTime} from "~/js/util";
    import {PLAY_MAX_LEN} from "~/js/config";
    import noResult from '@/components/search/noResults.vue'
    export default {
        mixins: [playListMixin],
        name: "playHistory",
	    components: {
            noResult
	    },
	    computed: {
            ...mapGetters({
                songList: 'playHistory'
            }),
            cdInfo() {
                if(this.songList.length > 0) {
                    const firstHistory = this.songList[0];
		            console.log(firstHistory);
		            return {
		                avatar : firstHistory.image,
		                name : '最近播放的歌曲',
		                subtitle : `${formatTime(new Date())}`
		            }
                }
            },
            maxLen() {
                return PLAY_MAX_LEN
            }
	    }
    }
</script>

<style scoped>

</style>