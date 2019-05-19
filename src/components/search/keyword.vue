<template>
	<div class="keyword-wrap">
		<div class="hot-keyword">
			<v-subheader>热门搜索</v-subheader>
			<template v-for="(hotKey,index) in hotKeys">
				<v-chip
						:key="`hotKey-${index}`"
						@click="selectKeyword(hotKey)"
				>{{hotKey.k}}
				</v-chip>
			</template>
		</div>
		<div class="history-keyword" v-if="historyKeys.length">
			<v-subheader>历史记录</v-subheader>
			<v-slide-y-reverse-transition group tag="v-list" class="sheet-list transparent">
				<template v-for="(historyKey, index) in historyKeys">
					<v-list-tile
							avatar
							:key="`historyKey-${index}`"
							@click="selectHistoryKey(historyKey)"
					>
						<v-list-tile-content>
							<v-list-tile-title class="grey--text">
								<v-icon size="20" left color="grey">schedule</v-icon>
								{{historyKey}}
							</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action>
							<v-icon size="20" color="grey" @click.stop="deleteHistoryKey(historyKey, index)">close
							</v-icon>
						</v-list-tile-action>
					</v-list-tile>
					<v-divider :key="`divider-${index}`"></v-divider>
				</template>
			</v-slide-y-reverse-transition>
		</div>
	</div>
</template>

<script>
    export default {
        name: "keyword",
        props: {
            historyKeys: {
                default: [],
                type: Array
            },
            hotKeys: {
                default: [],
                type: Array
            }
        },
        methods: {
            //派发事件-点击keyword
            selectKeyword(keyword) {
                this.$emit('v-selectKeyword', keyword)
            },
            //派发事件-点击historyKey
            selectHistoryKey(keyword) {
                this.$emit('v-selectHistoryKey', keyword)
            },
            deleteHistoryKey(keyword, index) {
                this.$emit('v-deleteHistoryKey', keyword, index)
            }
        }
    }
</script>

<style scoped>

</style>