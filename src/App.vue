<template>
	<div id="app">
		<v-app>
			<keep-alive>
				<router-view/>
			</keep-alive>
			<player></player>
		</v-app>
		<vue-element-loading :active="loading" :is-full-screen="true"></vue-element-loading>
	</div>
</template>
<script>
	import player from './components/song/player'
    import VueElementLoading from 'vue-element-loading'
    import {mapGetters} from "vuex";
    export default {
        name: 'App',
        components: {
            player,
            VueElementLoading
        },
	    computed: {
            ...mapGetters([
                'loading'
            ])
	    }
    }
</script>
<style slot>

</style>
