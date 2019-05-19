<template>
	<div>
		<m-header :isOtherPage="isOtherPage"></m-header>
		<v-content
				v-touch="{
						  left: () => swipe('Left'),
						  right: () => swipe('Right')
				}"
				class="content"
				app
		>
			<component
					:is="transitionName ? 'v-slide-x-transition' : 'v-slide-x-reverse-transition'"
			>
				<router-view class="child-view"></router-view>
			</component>
		</v-content>
		<v-footer app color="transparent">
			<v-bottom-nav
					:active.sync="bottomNav"
					:value="true"
					color="white"
					absolute
			>
				<v-btn flat v-for="(menus,index) in menuList" :key="`menu-${index}}`" color="yellow darken-2"
				       :to="menus.router">
					<span>{{menus.value}}</span>
					<v-icon>{{menus.icon}}</v-icon>
				</v-btn>
			</v-bottom-nav>
		</v-footer>
	</div>
</template>
<script lang="js">
    import MHeader from '@/components/layout/MHeader'

    export default {
        name: 'home',
        components: {
            MHeader
        },
        data() {
            return {
                bottomNav: 0,
                menuList: [
                    {
                        value: '发现',
                        icon: 'music_note',
                        router: '/home'
                    },
                    {
                        value: '我的',
                        icon: 'favorite',
                        router: '/user'
                    },
                    {
                        value: '关于',
                        icon: 'sentiment_satisfied_alt',
                        router: '/about'
                    }
                ],
                isOtherPage: true,
                transitionName: true
            }
        },
        mounted() {
            // console.log(this.$vuetify.breakpoint)
        },
        watch: {
            '$route'(to, from) {
                this.isOtherPage = to.path !== '/homePage';
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth;
            }
        },
        computed: {
            imageHeight() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return '220px';
                    case 'sm':
                        return '400px';
                    case 'md':
                        return '500px';
                    case 'lg':
                        return '600px';
                    case 'xl':
                        return '800px';
                }
            }
        },
        methods: {
            swipe(direction) {
                const index = this.menuList.findIndex((item) => {
                    return item.router === this.$router.currentRoute.path
                });
                if (index > -1) {
                    if (direction === 'Left' && index + 1 !== this.menuList.length) {
                        this.$router.push(this.menuList[index + 1].router)
                    }else if (direction === 'Right' && index !== 0) {
                        this.$router.push(this.menuList[index - 1].router)
                    }
                }
            }
        }
    }
</script>
<style scoped>
	.content {
		margin-bottom: 32px;
	}
	
	.child-view {
		transition: all .4s cubic-bezier(.55, 0, .1, 1);
	}
	
	.slide-left-enter, .slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(30px, 0);
		transform: translate(30px, 0);
	}
	
	.slide-left-leave-active, .slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(-30px, 0);
		transform: translate(-30px, 0);
	}
</style>
