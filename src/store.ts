import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import state from './store/state'
import mutations from './store/mutations'
import * as actions from './store/actions'
import * as getters from './store/getters'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production';
// @ts-ignore
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})