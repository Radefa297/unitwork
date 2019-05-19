import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Vuetify from 'vuetify'
import '~/css/base.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'babel-polyfill'
import VueLazyload from 'vue-lazyload'
// @ts-ignore
import VConsole from 'vconsole'
// @ts-ignore
import snakbar from '@/components/snackbar/index.js'

Vue.use(snakbar);
Vue.prototype.qs = require('qs');
Vue.config.productionTip = false;
Vue.use(Vuetify, {
    iconfont: 'md' // 'md' || 'mdi' || 'fa' || 'fa4'
});
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: require('./common/images/Facebook-1s-50px.svg'),
    attempt: 1
});
if (process.env.NODE_ENV === 'development') {
    new VConsole();
}
Vue.prototype.$http = axios;

axios.interceptors.request.use(
    config => {
        if (!router.currentRoute.meta.isRemoveInterceptor) {
            store.commit('SHOW_LOAD', true);
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
);

axios.interceptors.response.use(response => {
    store.commit('SHOW_LOAD', false);
    return response.data;
}, error => {
    store.commit('SHOW_LOAD', false);
    console.log(error.response);
    return Promise.reject(error.response);
});

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
