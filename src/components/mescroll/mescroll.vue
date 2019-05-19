<template>
	<div id="mescroll-wrap">
		<mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
			<slot></slot>
		</mescroll-vue>
	</div>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'

    export default {
        name: "mescroll",
        props: {
            page: {
                default: function () {
                    return {
                        num: 0,
                        size: 30
                    }
                },
                type: Object
            },
            htmlLoading: {
                type: String,
                default: '<div class="lds-css ng-scope">' +
                    '<div class="lds-facebook">' +
                    '<div></div><div></div><div></div><div>' +
                    '</div>' +
                    // '<p class="upwarp-tip">loading..</p>'+
                    '</div>'
            },
            htmlNodata: {
                type: String,
                default: '<p class="upwarp-nodata">-- END --</p>'
            },
            mescrollUpAuto: {
                type: Boolean,
                default: false
            }
        },
        components: {
            MescrollVue
        },
        data() {
            return {
                mescroll: null,
                mescrollUp: {
                    offset: 100,
                    auto: this.mescrollUpAuto,
                    page: this.page,
                    noMoreSize: 5,
                    callback: this.upCallback,
                    toTop: {
                        //回到顶部按钮
                        warpId:'mescroll-wrap',
                        src: require('~/images/scrollTop.png'),
                        offset: 800
                    },
                    htmlLoading: this.htmlLoading, //上拉加载中的布局
                    htmlNodata: this.htmlNodata, //无数据的布局
                },
            }
        },
        beforeRouteEnter(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
            next(vm => {
                // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
                vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
            })
        },
        beforeRouteLeave(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
            // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
            this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
            next()
        },
        methods: {
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            upCallback(page, mescroll) {
                console.log(page, mescroll);
                this.$emit('v-upCallback', page, mescroll)
            },
        }
    }
</script>

<style scoped>
	>>> .mescroll-totop {
		right: 5%;
		bottom: 15%;
	}

</style>