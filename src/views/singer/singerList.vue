<template>
	<div>
		<v-list class="list-height">
			<template v-for="(singerItems, index) in singerList" >
				<v-subheader :id="singerItems.title.substring(0,1)">{{singerItems.title}}</v-subheader>
				<template v-for="(singer, singerIndex) in singerItems.items">
					<v-list-tile
							:key="`singerIndex-${index}-${singerIndex}`"
							ripple
							avatar
							@click="goToDetails(singer)"
					>
						<v-list-tile-avatar class="avatar">
							<img v-lazy="singer.avatar">
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>
								{{singer.name}}
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
				<v-divider v-if="index + 1 < singerList.length" :key="`divider-${index}`"></v-divider>
			</template>
		</v-list>
		<div class="absolute-block-r">
			<template v-for="iden in identification">
				<p @click="$vuetify.goTo(`#${iden}`, options)">{{iden}}</p>
			</template>
		</div>
	</div>
</template>

<script>
    import {apiURL} from "../../common/js/apiUrl"
	import Singer from '~/js/singerClass.js'
    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    export default {
        name: "singerList",
        data() {
            return {
                singerList: [],
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
            }
        },
        created() {
            this.getSingerList();
        },
	    computed: {
            identification(){
                return this.singerList.map((value)=>{
                    return value.title.substring(0,1)
                })
            },
            options () {
                return {
                    duration: this.duration,
                    offset: this.offset,
                    easing: this.easing
                }
            },
		    
        },
        methods: {
            getSingerList() {
                var params = this.qs.stringify({
                    action: 'qqmusic_singerlist',
                    data: 'getdata',
                });
                this.$http.post(apiURL.qqmusic, params)
                    .then((res) => {
                        this.singerList = this.formatSingerList(res.data.list);
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            formatSingerList(list) {
                let formatList = {};
                let hotList = [{
                    title: HOT_NAME,
                    items: []
                }];
                list.forEach((item, index) => {
					if (index <= HOT_SINGER_LEN){
                        hotList[0].items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }));
					}
					const key = item.Findex;
					if(!formatList[key]){
                        formatList[key] = {
                            title: key,
                            items: []
                        }
					}
                    formatList[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }));
                });
                let lists = Object.values(formatList);
                lists.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                });
	            return [...hotList,...lists]
            },
            goToDetails(singer){
                this.$router.push({
                    path:  `/home/singerDetails/${singer.id}`
                });
            }
        }

    }
</script>

<style scoped>
.absolute-block-r{
	font-size: 0.64rem;
	line-height: 1rem;
	text-align: center;
	right: 0;
	top: 50%;
	transform: translate(0, -50%);
	position: fixed;
	z-index: 899;
	width: 25px;
	font-weight: 600;
}
	.absolute-block-r p{
		margin-bottom: 0;
	}
</style>