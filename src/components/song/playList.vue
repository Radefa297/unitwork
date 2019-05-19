<template>
	<div class="playListWarp">
		<v-bottom-sheet v-model="sheet">
			<v-subheader class="shades white">
				播放列表
				<v-spacer></v-spacer>
				<v-icon
						size="20"
						color="grey"
						@click.stop="showConfirmModel"
				>
					delete
				</v-icon>
			</v-subheader>
			<v-slide-y-reverse-transition group tag="v-list" class="sheet-list">
				<template v-for="(songItem, index) in playList">
					<v-list-tile
							:key="songItem.id"
							@click="selectSong(songItem, index)"
					>
						<v-list-tile-content ref="scrollSong">
							<v-list-tile-title
									data-name="歌曲名称"
									:class="currentIndex === index ? 'active' : ''"
							>
								<v-icon
										size="20"
										color="yellow darken-2"
								>
									{{currentIndex === index ? 'headset' : ''}}
								</v-icon>
								{{`${songItem.name} - ${songItem.singer}`}}
							</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action class="action-wrap">
							<v-icon
								size="20"
								@click.stop="toggleFavorite(songItem)"
								:color="isFavorite(songItem) ? 'yellow darken-2' : ''"
							>
								{{isFavorite(songItem) ? 'favorite' : 'favorite_border'}}
							</v-icon>
							<v-icon size="20" color="grey" @click.stop="deleteItem(songItem)">close</v-icon>
						</v-list-tile-action>
					</v-list-tile>
					<v-divider v-if="index + 1 < playList.length" :key="`divider-${index}`"></v-divider>
				</template>
			</v-slide-y-reverse-transition>
		</v-bottom-sheet>
		<v-alert
				type="info"
				v-model="confirmModel"
				title="确定清空播放列表？"
				disagreeContent="取消"
				agreeContent="删除"
				@v-agree="agreeDeleteAll"
		></v-alert>
	</div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import alert from '@/components/card/alert'
    import {playMixin} from '@/components/mixin/play'

    export default {
        name: "playList",
        mixins: [playMixin],
        components: {
            'v-alert': alert
        },
        props: {
            value: {},
            playList: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        watch: {
            value(newVal) {
                this.sheet = newVal;
            },
            sheet(newVal) {
                this.$emit('input', newVal);
                if (newVal) {
                    setTimeout(() => {
                        this.scrollTopCurrentSong()
                    }, 20)

                }
            }
        },
        data() {
            return {
                sheet: false,
                confirmModel: false,
                CIndex: -1
            }
        },
        mounted() {
            this.sheet = this.value
        },
        methods: {
            ...mapActions([
                'deleteSong',
                'deleteSongList'
            ]),
            selectSong(item, index) {
                this.setCurrentIndex(index);
                this.setPlayStatus(true)
            },
            scrollTopCurrentSong() {
                let currentLine = this.$refs.scrollSong[this.currentIndex];
                currentLine.scrollIntoView({
                    behavior: "auto"
                });
            },
            deleteItem(song) {
                this.deleteSong(song);
                if (!this.playList.length) {
                    this.hide()
                }
            },
            //打开警告确认框
            showConfirmModel() {
                this.confirmModel = true;
            },
            hide() {
                this.sheet = false
            },
            //清空列表
            agreeDeleteAll() {
                this.deleteSongList();
            }
        }
    }
</script>

<style scoped>
	.sheet-list {
		max-height: 350px;
		overflow-y: auto;
		margin-right: -20px;
		padding-right: 20px;
	}
	.action-wrap{
		justify-content: flex-end;
		 flex-direction: inherit;
	}
</style>