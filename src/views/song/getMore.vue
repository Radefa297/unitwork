<template>
	<div class="getMore">
		<v-toolbar
				color="transparent"
				tabs
				flat
		>
			<v-tabs
					class="pa-2"
					v-model="active"
					hide-slider
					color="transparent"
					active-class="active-key-tab"
			>
				<v-tab
						v-for="(tag,index) in tags"
						:key="`tag-${index}`"
				>
					{{ tag.categoryName }}
				</v-tab>
			</v-tabs>
		</v-toolbar>
		<v-tabs-items v-model="active">
			<v-tab-item
					v-for="(tag,index) in tags.length"
					:key="`tag-${index}`"
			>
				<v-container fluid v-bind="{ [`grid-list-${size}`]: true }" pa-2>
					<v-layout row wrap>
						<v-flex v-for="(item,index) in list" :key="`item-${index}`" xs6>
							<v-card :to="`/home/songList/${item.dissid }`" class="shadow">
								<v-img
										:src="item.imgurl"
										:lazy-src="require('~/images/Facebook-1s-50px.svg')"
										contain aspect-ratio="1">
									<v-container
											fill-height
											fluid
											pa-1
									>
										<v-layout fill-height>
											<v-flex xs12 align-end flexbox class="text-xs-right">
												<v-icon small dark class="material-icons pr-1">
													headset
												</v-icon>
												<span class="caption white--text">{{item.listennum}}</span>
											</v-flex>
										</v-layout>
									</v-container>
								</v-img>
								<v-card-actions class="height-50">
									<span class="description body-2">{{item.dissname}}</span>
								</v-card-actions>
							</v-card>
						</v-flex>
						<infinite-loading class="margin-0" @infinite="infiniteHandler"></infinite-loading>
					</v-layout>
				</v-container>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
    import {apiURL} from "../../common/js/apiUrl";
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        name: "getMore",
        components: {
            InfiniteLoading
        },
        data() {
            return {
                size: 'md',
                tags: [],
                active: 0,
                list: [],
                page: {
                    sin: 0,
                    ein: 19,
                    size: 19
                },
            }
        },
        watch: {
            active(index) {
                this.getMore(this.tags[index])
            }
        },
        mounted() {
            this.getTags().then(res => {
                this.getMore(res[0])
            });
        },
        methods: {
            //歌单分类标签
            getTags() {
                return new Promise(resolve => {
                    const params = this.qs.stringify({
                        action: 'qqmusic_getTags',
                        data: 'getdata'
                    });
                    this.$http({
                            url: apiURL.qqmusic,
                            method: 'post',
                            data: params
                        }
                    ).then((res) => {
                        let categories = res.data.categories;
                        this.tags = categories[0].items.concat(categories[3].items);
                        resolve(this.tags)
                    })
                })
            },
            //监听组件的 infinite 事件
            infiniteHandler($state) {
                this.getMore(this.tags[this.active], $state)
            },
            getMore(item, $state) {
                const params = this.qs.stringify({
                    action: 'qqmusic_getMore',
                    data: 'getdata',
                    categoryId: item.categoryId,
                    sortId: item.allsorts[1].sortId,
                    sin: this.page.sin,
                    ein: this.page.ein
                });
                this.$http({
                        url: apiURL.qqmusic,
                        method: 'post',
                        data: params
                    }
                ).then((res) => {
                    const play = res.data.list;
                    if (play.length || this.page.ein > res.data.sum) {
                        this.page.sin = res.data.ein;
                        this.page.ein += this.page.size;
                        if ($state) {
                            this.list = this.list.concat(play);
                            $state.loaded();
                        }else {
                            this.list = play
                        }
                    } else {
                        $state && $state.complete();
                    }
                }).catch((err) => {
                    $state && $state.error();
                })
            }
        }
    }
</script>

<style scoped>
	.margin-0 {
		margin: 0 auto;
	}
</style>