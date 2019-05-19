<template>
	<v-dialog
			content-class="player"
			fullscreen hide-overlay
			transition="dialog-bottom-transition"
			v-model="playList.length > 0 && fullScreen"
	>
		<v-img :lazy-src="currentSong.image" class="blur" height="100%" width="100%">
			<v-toolbar
					app
					flat
					color="transparent"
			>
				<v-btn flat icon dark @click="goToBack">
					<v-icon>chevron_left</v-icon>
				</v-btn>
				<v-toolbar-title class="white--text text-xs-center ml-1 subheading">
					{{`${currentSong.name} - ${currentSong.singer}`}}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn
						flat
						icon
						:color="isFavorite(currentSong) ? 'yellow darken-2' : ''"
						dark
						@click.stop="toggleFavorite(currentSong)">
					<v-icon>{{isFavorite(currentSong) ? 'favorite' : 'favorite_border'}}</v-icon>
				</v-btn>
			</v-toolbar>
			<v-content app id="content" class="window-wrap" height="auto">
				<v-container fill-height>
					<v-layout row wrap app>
						<v-card color="transparent" flat min-width="100%" max-height="100%">
							<v-card-text>
								<v-flex
										align-center
										justify-center
										text-xs-center
								>
									<v-window
											v-model="isLyricOrImage"
									>
										<v-window-item @click="isLyricOrImage = 1" :value="0"
										               class="overFlowHeight image-card">
											<div :class="['currentSongImage',currentSongImageRotate]">
												<v-img class="radius" :src="currentSong.image" alt="avatar"></v-img>
											</div>
											<v-subheader class="shades white--text">
												{{currentLyricTxt && currentSongLyric.lines.length ? currentLyricTxt :
												'抱歉，暂无可播放的歌词'}}
											</v-subheader>
										</v-window-item>
										<v-window-item @click="isLyricOrImage = 0" :value="1" class="white--text">
											<div
													v-if="currentSongLyric && currentSongLyric.lines.length"
													ref="lyricList"
													class="overFlowHeight"
											>
												<p
														ref="lyricLines"
														:class="{'active': currentLyricIndex === index}"
														v-for="(lyric,index) in currentSongLyric.lines"
														:key="`lyric-${index}`">
													{{lyric.txt}}
												</p>
											</div>
											<p v-else class="fill-height">抱歉，暂无可播放的歌词</p>
										</v-window-item>
									</v-window>
								</v-flex>
							</v-card-text>
						</v-card>
					</v-layout>
				</v-container>
			</v-content>
			<v-footer app color="transparent" height="auto">
				<v-card color="transparent" class="text-xs-center" dark flat min-width="100%">
					<v-card-actions>
						<v-flex
								shrink
								class="pr-4 pl-4"
						>
							{{currentTime|filterTime}}
						</v-flex>
						<v-slider
								v-model="currentTime"
								color="yellow darken-2"
								:max="currentSong.duration"
								@change="changeSlider"
						></v-slider>
						<v-flex
								shrink
								class="pl-4 pr-4"
						>
							{{currentSong.duration|filterTime}}
						</v-flex>
					</v-card-actions>
					<v-card-actions>
						<v-layout>
							<v-flex xs2>
								<v-icon @click="changeMode">{{mode|filterMode}}</v-icon>
							</v-flex>
							<v-flex xs3>
								<v-icon large @click="skipPrevious">skip_previous</v-icon>
							</v-flex>
							<v-flex xs2>
								<v-icon large @click="togglePlaying">{{playStatusIcon}}</v-icon>
							</v-flex>
							<v-flex xs3>
								<v-icon large @click="skipNext">skip_next</v-icon>
							</v-flex>
							<v-flex xs2>
								<v-icon @click="showPlayList">queue_music</v-icon>
							</v-flex>
						</v-layout>
					</v-card-actions>
				</v-card>
			</v-footer>
		</v-img>
		<audio
				:src="currentSong.url"
				@ended="endedSong"
				ref="audio"
				@play="ready"
				@timeupdate="timeupdate"
				@error="error"
		></audio>
		<v-playList
				v-model="isShowPlayList"
				:playList="playList"
		></v-playList>
	</v-dialog>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {padnum, format} from "../../common/js/util";
    import {apiURL} from "../../common/js/apiUrl";
    import Lyric from 'lyric-parser'
    import playList from '@/components/song/playList'
    import {playMixin} from '@/components/mixin/play'
    import {playMode} from "../../common/js/config";

    export default {
        name: "player",
        mixins: [playMixin],
        components: {
            'v-playList': playList
        },
        data() {
            return {
                songReady: false,
                isShowPlayList: false,
                currentTime: 0,
                sliderValue: 50,
                currentSongLyric: null,
                isLyricOrImage: 0,
                currentLyricIndex: null,
                currentLyricTxt: ''
            }
        },
        computed: {
            ...mapGetters([
                'playList',
                'fullScreen',
                'playStatus'
            ]),
            playStatusIcon() {
                return this.playStatus ? 'stop' : 'play_circle_outline'
            },
            currentSongImageRotate() {
                return this.playStatus ? 'play' : 'pause'
            }
        },
        filters: {
            filterTime(value) {
                const minute = value / 60 | 0;
                const second = padnum(value % 60);
                return `${minute}:${second}`
            }
        },
        watch: {
            //进入时
            currentSong(newVal, oldVal) {
                if (!newVal.id) return;
                if (newVal.id === oldVal.id) return;
                if (this.currentSongLyric) {
                    this.currentSongLyric.stop();
                    this.currentTime = 0;
                    this.currentLyricIndex = 0;
                    this.currentLyricTxt = '';
                }
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.$refs.audio.play();
                    this.getLyric(newVal)
                }, 1000);
            },
            //控制播放开关
            playStatus(value) {
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    value ? audio.play() : audio.pause()
                });
            }
        },
        methods: {
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            }),
            ...mapActions([
                'savePlayHistory'
            ]),
            //获取歌词
            getLyric(value) {
                const params = this.qs.stringify({
                    action: 'qqmusic_lyric',
                    data: 'getdata',
                    id: value.mid
                });
                this.$http.post(apiURL.qqmusic, params)
                    .then((res) => {
                        if (this.currentSong.lyric) {
                            if (this.currentSong.lyric !== res) {
                                return
                            }
                        } else {
                            this.currentSong.lyric = res;
                        }
                        this.currentSongLyric = new Lyric(res.lyric, this.handleLyric);
                        if (this.playStatus) {
                            this.currentSongLyric.play()
                        }
                    }).catch((err) => {
                    this.currentLyricIndex = 0;
                    this.currentLyricTxt = '';
                    this.currentSongLyric = null;
                })
            },
            //new Lyric回调函数
            handleLyric(item) {
                this.currentLyricIndex = item.lineNum;
                this.currentLyricTxt = item.txt;
                if (item.lineNum > 5) {
                    let lineEl = this.$refs.lyricLines[item.lineNum - 5];
                    lineEl.scrollIntoView({
                        behavior: "smooth"
                    })
                } else {
                    this.$refs.lyricList.scrollTo(0, 0);
                }
            },
            goToBack() {
                this.setFullScreen(false)
            },
            //点击播放 暂停按钮
            togglePlaying() {
                if (!this.songReady) return;
                if (this.currentSong.isPayPlay === 1) {
                    this.$snackbar({
                        msg: '因版权限制或付费歌曲，暂不支持播放该歌曲',
                        color: 'error'
                    });
                    return;
                }
                this.setPlayStatus(!this.playStatus);
                if (this.currentSongLyric) {
                    this.currentSongLyric.togglePlay();
                }
            },
            //上一首
            skipPrevious() {
                if (!this.songReady) return;
                if (this.playList.length <= 1) {
                    this.loop();
                    return false
                } else {
                    let index = this.urrentIndex - 1;
                    index = index < 0 ? this.playList.length - 1 : index;
                    this.setCurrentIndex(index);
                    if (!this.playStatus) {
                        this.togglePlaying()
                    }
                }
            },
            //下一首
            skipNext() {
                if (!this.songReady) return;
                if (this.playList.length <= 1) {
                    this.loop();
	                return false
                } else {
                    let index = this.currentIndex + 1;
                    index = index >= this.playList.length ? 0 : index;
                    this.setCurrentIndex(index);
                    if (!this.playStatus) {
                        this.togglePlaying()
                    }
                }
            },
            //准备好播放的时候 避免多次点击歌曲错误
            ready() {
                this.songReady = true;
                this.savePlayHistory(this.currentSong)
            },
            //错误时
            error(error) {
                this.songReady = true;
                if (this.playStatus) {
                    this.togglePlaying()
                }
            },
            //audio时间更新派发
            timeupdate(e) {
                this.currentTime = e.target.currentTime;
            },
            //循环播放模式
            loop() {
                this.$refs.audio.currentTime = 0;
                this.$nextTick(() => {
                    this.$refs.audio.play();
                });
                if (this.currentSongLyric) {
                    this.currentSongLyric.seek(0);
                }
            },
            //当前歌曲播放结束时
            endedSong() {
                if (this.mode === playMode.loop) {
                    this.loop()
                } else {
                    this.skipNext()
                }
            },
            //进度条被修改时触发
            changeSlider(value) {
                console.log(value);
                this.currentTime = value;
                this.$refs.audio.currentTime = value;
                if (!this.playStatus) {
                    this.togglePlaying()
                }
                if (this.currentSongLyric) {
                    this.currentSongLyric.seek(value * 1000);
                }
            },
            download(url, name) {
                let myHeaders = new Headers({
                    'Content-Type': 'text/plain'
                });
                fetch(url, {
                    method: 'GET',
                    headers: myHeaders,
                    mode: 'no-cors'
                }).then(res => res.blob().then(blob => {
                    const a = document.createElement('a');
                    const url = window.URL.createObjectURL(blob);
                    const filename = `${name}.m4a`;
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                }).catch((err) => {
                    this.$snackbar({
                        msg: 'ERROR'
                    })
                }))
            },
            showPlayList() {
                this.isShowPlayList = true
            }
        }
    }
</script>


<style scoped>
	.player .v-responsive.v-image.blur {
		background: #3d3d3d;
	}
	
	.currentSongImage-wrap {
		-webkit-box-shadow: 0 12px 20px -10px rgba(251, 192, 45, 0.48), 0 4px 20px 0 rgba(251, 192, 45, 0.09), 0 7px 8px -5px rgba(255, 152, 0, 0.17);
		box-shadow: 0 12px 20px -10px rgba(251, 192, 45, 0.48), 0 4px 20px 0 rgba(251, 192, 45, 0.09), 0 7px 8px -5px rgba(255, 152, 0, 0.17);
	}
	
	.window-wrap {
		/*overflow-y: scroll;*/
		/*pointer-events: auto;*/
	}
	
	.window-footer {
		max-height: 20vh;
	}
	
	.image-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.currentSongImage {
		width: 85%;
	}
	
	.currentSongImage.play {
		animation: rotate 20s linear infinite;
		-webkit-animation: rotate 20s linear infinite;
		animation-play-state: running;
		-webkit-animation-play-state: running;
	}
	
	.currentSongImage.pause {
		animation-play-state: paused;
		-webkit-animation-play-state: paused;
	}
	
	.overFlowHeight {
		height: 60vh;
		overflow-y: auto;
	}
	
	.window-status {
		height: 3px;
		background: #ffffff;
		-moz-border-radius: 100px / 50px;
		-webkit-border-radius: 100px / 50px;
		border-radius: 100px / 50px;
	}
	
	.edit-status.window-status {
		width: 20px;
	}
	
	.noEdit-status.window-status {
		width: 10px;
	}
	
	.radius {
		border-radius: 50%;
		border: 10px solid #fbc02d1a;
	}
</style>
