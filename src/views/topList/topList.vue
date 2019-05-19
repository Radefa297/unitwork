<template>
    <v-list class="list-height">
	    <template v-for="(topItem, index) in topList">
		    <v-list-tile
			    :key="index"
			    ripple
			    avatar
			    @click="goToDetails(topItem)"
		    >
			    <v-list-tile-avatar size="80" class="avatar">
				    <v-img :src="topItem.picUrl" :lazy-src="require('~/images/Facebook-1s-50px.svg')"></v-img>
			    </v-list-tile-avatar>
			    <v-list-tile-content>
<!--				    <v-list-tile-title v-html="topItem.topTitle"></v-list-tile-title>-->
				    <v-list-tile-sub-title v-for="(songItem,index) in topItem.songList" :key="`songItem-${index}`">
					   {{`${index + 1} ${songItem.songname} ${songItem.singername}`}}
				    </v-list-tile-sub-title>
			    </v-list-tile-content>
			    <v-list-tile-action>
				    <v-icon
					    color="yellow darken-2"
				    >
					    star
				    </v-icon>
			    </v-list-tile-action>
		    </v-list-tile>
		    <v-divider v-if="index + 1 < topList.length" :key="`divider-${index}`"></v-divider>
	    </template>
    </v-list>
</template>

<script>
    import {apiURL} from "../../common/js/apiUrl";

    export default {
        name: "TopList",
	    data(){
            return{
                topList: []
            }
	    },
	    created() {
            this.getTopList();
	    },
	    methods: {
            getTopList(){
                const params = this.qs.stringify({
                    action: 'qqmusic_toplist',
                    data: 'getdata'
                });
                this.$http.post(apiURL.qqmusic,params).then((res) => {
                    console.log(res);
                    this.topList = res.data.topList
                })
            },
		    goToDetails(topItem){
                this.$router.push({
                    path:  `/home/topDetails/${topItem.id}`
                });
		    }
	    }
    }
</script>

<style scoped>
	>>> .v-list__tile--avatar{
		min-height: 100px;
	}
	.avatar{
		min-width: 80px;
		margin-right: 0.5rem;
	}
</style>
