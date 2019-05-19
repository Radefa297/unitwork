<template>
	<div class="favorite-history">
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
		<no-result v-else :blockquote="blockquote"></no-result>
	</div>
</template>

<script>
    import noResult from '@/components/search/noResults.vue'
    import {playListMixin} from '@/components/mixin/playList'
    import {mapGetters} from "vuex";
    import {FAVORITE_MAX_LEN} from "~/js/config";
    import {formatTime} from "~/js/util";
    export default {
        mixins: [playListMixin],
        name: "favorite",
        components: {
            noResult
        },
	    data() {
            return {
                blockquote: `暂无收藏记录 遇到喜欢的歌仔点点小爱心 ♥ 就有了噢~`
            }
	    },
        computed: {
            ...mapGetters({
                songList: 'favoriteList'
            }),
            cdInfo() {
                if(this.songList.length > 0) {
                    const newFavorite = this.songList[0];
                    return {
                        avatar : newFavorite.image,
                        name : '私の好きな歌',
                        subtitle : `${formatTime(new Date())}`
                    }
                }
            },
            maxLen() {
                return FAVORITE_MAX_LEN
            }
        }
    }
</script>

<style scoped>

</style>