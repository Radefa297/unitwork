<template>
	<v-layout
		v-touch="{
		  right: () => swipe()
		}"
	>
		<v-card
				class="mx-auto"
				max-width="400"
				flat
		>
			<v-card
					dark
					flat
			>
				<v-img
						src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
						gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
				>
					<v-container fill-height>
						<v-layout align-center>
							<strong class="display-4 font-weight-regular mr-4">{{new Date().getDate()}}</strong>
							<v-layout column justify-end>
								<div class="headline font-weight-light">{{new Date().getDay() | filterDay}}</div>
								<div class="text-uppercase font-weight-light">
									{{new Date().getMonth() | filterMonth}}
									{{new Date().getFullYear()}}
								</div>
							</v-layout>
						</v-layout>
					</v-container>
				</v-img>
			</v-card>
			<v-card-text class="py-0">
				<v-timeline
						align-top
						dense
				>
					<v-timeline-item
							v-for="(timeline,index) in timelines"
							:color="timeline.color"
							:key="`timeline-${index}`"
							small
					>
						<v-layout pt-3>
							<v-flex xs4>
								<strong>{{timeline.time}}</strong>
							</v-flex>
							<v-flex xs8>
								<strong>{{timeline.title}}</strong>
								<div class="caption">{{timeline.des}}</div>
							</v-flex>
						</v-layout>
					</v-timeline-item>
				</v-timeline>
			</v-card-text>
		</v-card>
	</v-layout>
</template>
<script lang="js">
    export default {
        data() {
            return {
                timelines: [
                    {
                        color: 'green',
                        time: '2019/5/17',
                        title: 'UPDATE',
                        des: '支持收藏歌曲并增加收藏列表页面，修复歌词时间不匹配以及更改歌曲时间出现的歌词错乱bug'
                    },
                    {
                        color: 'green',
                        time: '2019/5/16',
                        title: 'UPDATE',
                        des: '支持横向SCROLL歌单分类选择和歌单分页，修复播放BUG'
                    },
                    {
                        color: 'green',
                        time: '2019/5/15',
                        title: 'UPDATE',
                        des: '支持最近播放、搜索历史、Loading功能模块，优化并抽取公共Mixin'
                    },
                    {
                        color: 'green',
                        time: '2019/5/14',
                        title: 'UPDATE',
                        des: '支持播放列表功能模块'
                    },
                    {
                        color: 'green',
                        time: '2019/5/1',
                        title: 'UPDATE',
                        des: '支持搜索功能模块'
                    },
                    {
                        color: 'green',
                        time: '2019/4/30',
                        title: 'UPDATE',
                        des: '完善基础业务逻辑开发'
                    },
                    {
                        color: 'green',
                        time: '2019/4/10',
                        title: 'DDMusic BirthDay',
                        des: '初始化vue-cli3全家桶项目'
                    }
                ]
            }
        },
        filters: {
            filterDay(value) {
                const table = {
                    0: "Monday",
                    1: "Tuesday",
                    2: "Wednesday",
                    3: "Thursday",
                    4: "Friday",
                    5: "Saturday",
                    6: "Sunday"
                };
                return table[value]
            },
            filterMonth(value) {
                const table = {
                    0: "Jan",
                    1: "Feb",
                    2: "Mar",
                    3: "Apr",
                    4: "May",
                    5: "Jun",
                    6: "Jul",
                    7: "Aug",
                    8: "Spt",
                    9: "Oct",
                    10: "Nov",
                    11: "Dec"
                };
                return table[value]
            }
        },
	    methods: {
            swipe() {
                this.$router.push('/user')
            }
	    }
    }
</script>