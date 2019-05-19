<template>
	<div>
		<v-header>
			<v-searchInput
					@v-cancel="goToBack"
					placeholder="搜索歌曲、歌单"
					v-model="keyword"
					@v-change="onKeywordChange"
					@v-clear="clear"
			></v-searchInput>
		</v-header>
		<v-content>
			<component :is="searchList.length <= 0 ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'">
				<v-container v-if="!keyword">
					<v-keyword
							:hotKeys="hotKeys"
							:historyKeys="searchHistory"
							@v-selectKeyword="selectKeyword"
							@v-selectHistoryKey="selectHistoryKey"
							@v-deleteHistoryKey="deleteHistoryKey"
							selectKeyword>
					</v-keyword>
				</v-container>
				<v-mescroll v-else @v-upCallback="upCallback" :page="page">
					<v-search-content
							:searchList="searchList"
							:zhida="singer"
							@v-selectItem="selectItem"
							@v-selectSong="selectSong"
							v-if="searchList.length"
					></v-search-content>
					<no-result v-else :blockquote="`很抱歉，没有找到与“${keyword}”相关的结果`"></no-result>
				</v-mescroll>
			</component>
		</v-content>
	</div>

</template>

<script>
    import mescroll from '@/components/mescroll/mescroll.vue'
    import searchInput from '@/components/search/searchInput.vue'
    import searchContent from '@/components/search/searchContent.vue'
    import keyword from '@/components/search/keyword.vue'
    import MHeader from '@/components/layout/MHeader.vue'
    import {apiURL} from "../../common/js/apiUrl";
    import {createSong, getFilenames, getVKey} from "../../common/js/songClass";
    import {mapActions, mapGetters} from "vuex";
    import Singer from "../../common/js/singerClass";
    import noResult from '@/components/search/noResults.vue'
    export default {
        name: "search",
        components: {
            'v-searchInput': searchInput,
            'v-header': MHeader,
            'v-keyword': keyword,
            'v-search-content': searchContent,
            'v-mescroll': mescroll,
	        'no-result': noResult
        },
        data() {
            return {
                hotKeys: [],
                historyKeys: [],
                keyword: '',
                singer: {},
                page: {
                    num: 0,
                    size: 20
                },
                searchList: []
            }
        },
        computed: {
            ...mapGetters([
                'searchHistory'
            ])
        },
        mounted() {
            this.getHotKey()
        },
        methods: {
            ...mapActions([
                'insertSong',
                'saveSearchHistory',
	            'deleteSearchHistory'
            ]),
            goToBack() {
                this.$router.go(-1)
            },
            getHotKey() {
                const params = this.qs.stringify({
                    action: 'qqmusic_gethotkey',
                    data: 'getdata',
                });
                this.$http.post(apiURL.qqmusic, params).then((res) => {
                    console.log(res);
                    this.hotKeys = res.data.hotkey.slice(0, 10)
                })
            },
            //v-keyword 派发事件-点击热搜词
            selectKeyword(value) {
                this.onKeywordChange(value.k);
            },
            //v-keyword 派发事件-点击历史关键词
            selectHistoryKey(value) {
                this.onKeywordChange(value);
            },
            //v-keyword 派发事件-删除关键词
            deleteHistoryKey(value, index) {
				this.deleteSearchHistory(value, index)
            },
            //mescroll上拉派发事件
            upCallback(page, mescroll) {
                this.page.size = page.size;
                this.page.num = page.num;
                this.onKeywordChange(this.keyword, mescroll)
            },
            clear() {
                this.searchList = [];
                this.singer = {};
                this.keyword = '';
                this.page.size = 30;
                this.page.num = 0;
            },
            //v-searchInput 派发事件-监听keyword变化
            onKeywordChange(value, mescroll) {
                this.saveSearchHistory(value);
                this.keyword = value;
                const params = this.qs.stringify({
                    action: 'qqmusic_search',
                    data: 'getdata',
                    keyword: value.replace(/^\s+|\s+$/g, ""),
                    page: this.page.num,
                    num: this.page.size
                });
                this.$http.post(apiURL.qqmusic, params).then((res) => {
                    console.log(res);
                    if (res.data.zhida && res.data.zhida.type > 0) {
                        this.singer = res.data.zhida
                    }
                    this.normalizeSongs(res.data.song.list).then((songs) => {
                        this.searchList = this.searchList.concat(songs);
                        if (mescroll) {
                            this.$nextTick(() => {
                                mescroll.endSuccess(this.searchList.length)
                            });
                        }
                    });
                })
            },
            //格式化
            normalizeSongs(list) {
                return new Promise((resolve, reject) => {
                    let reg = [];
                    let songMidList = list.map((value) => {
                        return value.songmid
                    });
                    let filenameList = getFilenames(songMidList);
                    getVKey(songMidList, filenameList)
                        .then((item) => {
                            item.songVKey.forEach((VkeyVal) => {
                                list.forEach((value, index) => {
                                    if (VkeyVal.songmid === value.songmid) {
                                        if (!!value.songid && !!value.albummid) {
                                            reg.push(createSong(value, VkeyVal.vkey, item.guid))
                                        }
                                    }
                                })
                            });
                            resolve(reg)
                        });
                })
            },
            //v-selectItem派发事件 点击专辑歌手等类型时触发
            selectItem(item) {
                if (item.type === 2) {
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    });
                    this.$router.push({
                        path: `/home/singerDetails/${singer.id}`
                    });
                } else {
                    this.$snackbar({
                        msg: '抱歉，暂只支持歌曲和歌手'
                    })
                }
            },
            //v-selectSong派发事件 点击音乐时触发
            selectSong(song) {
                console.log(song);
                this.insertSong({song})
            }
        }
    }
</script>

<style scoped>
</style>