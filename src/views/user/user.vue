<template>
	<div>
		<v-list>
			<template v-for="(centerItem,index) in centerList">
				<v-list-tile
						:key="index"
						ripple
						avatar
						@click="selectItem(centerItem)"
				>
					<v-list-tile-avatar>
						<v-avatar>
							<v-icon>{{centerItem.icon}}</v-icon>
						</v-avatar>
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title data-name="歌曲名称">
							{{centerItem.name}}
						</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-icon>chevron_right</v-icon>
					</v-list-tile-action>
				</v-list-tile>
				<v-divider v-if="index + 1 < centerList.length" :key="`divider-${index}`"></v-divider>
			</template>
		</v-list>
	</div>
</template>

<script>
    export default {
        name: "user",
	    data() {
            return {
                centerList: [
	                {
	                    name: '最近播放',
		                router: '/user/playHistory',
		                icon: 'history'
	                },
                    {
                        name: '我的收藏',
                        router: '/user/favorite',
                        icon: 'favorite'
                    }
                ]
            }
	    },
	    methods: {
            selectItem(item) {
                this.$router.push(item.router)
            },
            swipe(direction) {
                if (direction === 'Left') {
                    this.$router.push('/about')
                }else {
                    this.$router.push('/home')
                }
            }
	    }
    }
</script>

<style scoped>

</style>