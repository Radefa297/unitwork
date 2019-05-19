<template>
	<v-list>
		<v-list-tile
				ripple
				avatar
				v-if="Object.keys(zhida).length > 0"
				@click="selectItem(zhida)"
		>
			<v-list-tile-avatar>
				<v-avatar>
					<v-img
							:src="zhida|imgUrl"
					>
					</v-img>
				</v-avatar>
			</v-list-tile-avatar>
			<v-list-tile-content>
				<v-list-tile-title data-name="歌曲名称/歌手">{{zhida|filterName}}</v-list-tile-title>
				<v-list-tile-sub-title data-name="歌手-专辑名">
					{{zhida|filterDetail}}
				</v-list-tile-sub-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-divider v-if="Object.keys(zhida).length > 0"></v-divider>
		<template v-for="(searchItem,index) in searchList">
			<v-list-tile
					:key="`searchItem-${index}`"
					ripple
					avatar
					@click="selectSong(searchItem)"
			>
				<v-list-tile-avatar>
					<v-avatar>
						<i class="material-icons">
							music_note
						</i>
					</v-avatar>
				</v-list-tile-avatar>
				<v-list-tile-content>
					<v-list-tile-title data-name="歌曲名称">{{searchItem.name}}</v-list-tile-title>
					<v-list-tile-sub-title data-name="歌手-专辑名">
						{{` ${searchItem.singer} - ${searchItem.album}`}}
					</v-list-tile-sub-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-divider v-if="index + 1 < searchList.length" :key="`divider-${index}`"></v-divider>
		</template>
	</v-list>
</template>

<script>
    import Singer from "../../common/js/singerClass";

    export default {
        name: "searchContent",
        props: {
            searchList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            zhida: {
                type: Object,
                default: {}
            }
        },
        filters: {
            imgUrl(value) {
                const table = {
                    2: `https://y.gtimg.cn/music/photo_new/T001R68x68M000${value.singermid}.jpg?max_age=2592000`,
                    3: `https://y.gtimg.cn/music/photo_new/T002R68x68M000${value.albummid}.jpg?max_age=2592000`
                };
                return table[value.type]
            },
            filterName(value) {
                const table = {
                    2: `${value.singername}`,
                    3: `${value.albumname}`
                };
                return table[value.type]
            },
            filterDetail(value) {
                const table = {
                    2: `单曲: ${value.songnum}  专辑: ${value.albumnum}`,
                    3: `${value.singername}`
                };
                return table[value.type]
            }
        },
        methods: {
            selectItem(item) {
                this.$emit('v-selectItem', item)
            },
            selectSong(item) {
                this.$emit('v-selectSong', item)
            }
        }
    }
</script>

<style scoped>

</style>