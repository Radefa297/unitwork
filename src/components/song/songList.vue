<template>
		<v-list two-line subheader>
			<v-list-tile>
				<v-list-tile-content>
					共计{{total}}首
				</v-list-tile-content>
				<v-list-tile-action>
					<v-flex>
						<v-btn icon ripple @click="playAll">
							<span class="subheading yellow-darken-2--text">播放全部</span>
							<v-icon color="yellow darken-2" >play_arrow</v-icon>
						</v-btn>
					</v-flex>
				</v-list-tile-action>
			</v-list-tile>
			<v-divider></v-divider>
			<template v-for="(songItem,index) in songList">
				<v-list-tile
					:key="index"
					ripple
					@click="selectSong(songItem,index)"
					avatar
				>
					<v-list-tile-avatar>
						<v-avatar>
							<span class="grey--text headline">{{index + 1}}</span>
						</v-avatar>
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title data-name="歌曲名称">
							{{songItem.name}}
							<span class="chip" v-if="songItem.isPayPlay">VIP</span>
						</v-list-tile-title>
						<v-list-tile-sub-title data-name="歌手-专辑名">
							{{` ${songItem.singer} - ${songItem.album}`}}
						</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-divider v-if="index + 1 < songList.length" :key="`divider-${index}`" inset></v-divider>
			</template>
		</v-list>
</template>

<script>
    export default{
        name: "songList",
	    props:{
            songList:{
                type: Array,
	            default: function () {
		            return []
                }
            },
            total: {
                type: Number,
	            default: 10
            }
	    },
	    data(){
            return{
            
              
            }
	    },
	    methods: {
            //当前点击选择的歌曲和索引
            selectSong(item, index){
                this.$emit('v-selectSong',item, index)
            },
            playAll(){
                this.$emit('v-playAll')
            },
            toggleFavorite(item) {
                this.$emit('v-toggleFavorite',item)
            }
	    }
    }
</script>

<style scope>
	.chip{
		border: 1px solid #f9a825;
		padding: 0 3px;
		border-radius: 5px;
		height: 19px!important;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		color: #f9a825;
		font-size: 12px;
		vertical-align: top;
	}
</style>
