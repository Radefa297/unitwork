<template>
	<v-layout>
		<v-flex>
			<!--轮播图-->
			<v-carousel :carousels="carousels"></v-carousel>
			<!--子菜单-->
			<v-container fluid grid-list-xl>
				<v-layout row wrap>
					<v-flex v-for="(shortcut,index) in shortcuts" :key="`shortcut-${index}`" xs3
					        @click="goToMenu(shortcut.route)">
						<v-img :src="shortcut.icon" contain aspect-ratio="2"></v-img>
						<div class="text-xs-center" v-text="shortcut.value"></div>
					</v-flex>
				</v-layout>
			</v-container>
			<v-divider></v-divider>
			<div data-name="推荐列表">
				<div class="list-title subheading" @click="getMore">
					<span>推荐歌单</span>
					<v-icon>navigate_next</v-icon>
				</div>
				<v-divider></v-divider>
				<v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
					<v-layout row wrap>
						<v-flex v-for="(recommendView,index) in recommendViews" :key="`recommendView-${index}`" xs4>
							<v-card :to="`/home/songList/${recommendView.id }`" class="shadow">
								<v-img :src="recommendView.picUrl" contain aspect-ratio="1"></v-img>
								<v-card-actions class="height-50">
									<span class="description body-2">{{recommendView.songListDesc}}</span>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</div>
			<div data-name="推荐电台">
				<div class="list-title subheading">
					<span>推荐电台</span>
					<v-icon>navigate_next</v-icon>
				</div>
				<v-divider></v-divider>
				<v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
					<v-layout row wrap>
						<v-flex v-for="(recommendView,index) in radioList" :key="`recommendView-${index}`" xs6>
							<v-img :src="recommendView.picUrl" contain aspect-ratio="1"></v-img>
							<v-card>
								<v-card-actions>
									<span class="description body-2">{{recommendView.Ftitle}}</span>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</div>
			<div class="text-xs-center">
	         <span class="font-weight-light copyright">
		            &copy;
		            {{ new Date().getFullYear() }}
		            Creative Radefa, We hope to do better
		            <v-icon
				            color="tertiary"
				            size="17">favorite</v-icon>
	        </span>
			</div>
		</v-flex>
	</v-layout>
</template>

<script lang="js">
    import carousel from '@/components/homePageComponent/carousel'
    import {apiURL} from "~/js/apiUrl";

    export default {
        name: 'homePage',
        components: {
            'v-carousel': carousel
        },
        data() {
            return {
                size: 'md',
                carousels: [],
                shortcuts: [
                    {
                        icon: require('~/images/San Mi App icon goodsList.png'),
                        value: '歌单',
                        route: '/home/getMore'
                    },
                    {
                        icon: require('~/images/San Mi App icon fill.png'),
                        value: '排行榜',
                        route: '/home/topList'
                    },
                    {
                        icon: require('~/images/San Mi App icon singer.png'),
                        value: '歌手',
                        route: '/home/singerList'
                    },
                    {
                        icon: require('~/images/San Mi App icon searchpng.png'),
                        value: '搜索',
                        route: '/home/search'
                    }
                ],
                recommendViews: [],
                radioList: []
            }
        },
        created() {
            this.getRecommend();
            // this.$snackbar({msg: '欢迎━(*｀∀´*)ノ亻!'})
        },
        methods: {
            getRecommend() {
                const params = this.qs.stringify({
                    action: 'qqmusic_index',
                    data: 'getdata',
                });
                this.$http({
                        url: apiURL.qqmusic,
                        method: 'post',
                        data: params
                    }
                ).then((res) => {
                    console.log(res);
                    this.recommendViews = res.data.songList;
                    this.carousels = res.data.slider;
                    this.radioList = res.data.radioList;
                })
            },
            goToMenu(route) {
                this.$router.push(route)
            },
            getMore() {
                this.$router.push('/home/getMore')
            }
        }
    }
</script>

<style scoped>
	.list-title {
		padding: 10px;
		border-left: solid 5px #fbc02d;
		line-height: 10px;
	}

</style>
