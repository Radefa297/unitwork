import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import goTo from 'vuetify/lib/components/Vuetify/goTo'

Vue.use(Router);
export default new Router({
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0;
        if (to.hash) {
            // @ts-ignore
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo)
    },
    mode: 'history',
    base: '/webApp',
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: () => import('@/components/layout/layout.vue'),
            children: [
                {
                    name: 'About DDMusic',
                    path: '/about',
                    component: () => import('@/views/About.vue')
                },
                {
                    name: '个人中心',
                    path: '/user',
                    component: () => import('@/views/user/user.vue')
                },
                {
                    name: '最近播放',
                    path: '/user/playHistory',
                    component: () => import('@/views/user/playHistory.vue')
                },
                {
                    name: '我的收藏',
                    path: '/user/favorite',
                    component: () => import('@/views/user/favorite.vue')
                },
                {
                    name: 'Welcome DDMusic',
                    path: '/home',
                    component: () => import('@/views/homePage.vue')
                },
                {
                    name: '更多歌单',
                    path: '/home/getMore',
                    meta: {
                      isRemoveInterceptor: true
                    },
                    component: () => import('@/views/song/getMore.vue')
                },
                {
                    name: '排行榜',
                    path: '/home/topList',
                    component: () => import('@/views/topList/topList.vue')
                },
                {
                    name: '排行榜详情',
                    path: '/home/topDetails/:id',
                    component: () => import('@/views/topList/topDetails.vue')
                },
                {
                    name: '推荐歌单',
                    path: '/home/songList/:id',
                    component: () => import('@/views/song/recommendList.vue')
                },
                {
                    name: '歌手',
                    path: '/home/singerList',
                    component: () => import('@/views/singer/singerList.vue'),
                },
                {
                    name: '歌手详情',
                    path: '/home/singerDetails/:id',
                    component: () => import('@/views/singer/singerDetails.vue')
                }
            ]
        },
        {
            name: '搜索',
            path: '/home/search',
            component: () => import('@/views/search/search.vue')
        }
    ]
})
