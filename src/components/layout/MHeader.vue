<template>
	<v-toolbar app color="yellow darken-2" dense scroll-off-screen scroll-target>
		<slot>
			<v-btn flat icon dark v-if="isOtherPage" @click="goBack">
				<v-icon>chevron_left</v-icon>
			</v-btn>
			<v-btn flat icon dark v-else>
				<v-icon>menu</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-title class="white--text subheading" ref="routeName">{{routeName}}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn flat icon dark @click="musicBox">
				<v-icon v-if="!playStatus">equalizer</v-icon>
				<div v-else class="v-btn__content">
					<div class="equalizer-css ng-scope">
						<div class="equalizer-facebook">
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</v-btn>
		</slot>
	</v-toolbar>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "MHeader",
        props: {
            isOtherPage: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            routeName() {
                return this.$route.name
            },
            ...mapGetters([
                'playStatus'
            ])
        },
        methods: {
            goBack() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            musicBox() {
                this.setFullScreen(true)
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        }
    }
</script>

<style scoped>

</style>
