import Snackbar from './snackbar.vue'
import Vue from 'vue'
let SnackbarConstructor = Vue.extend(Snackbar);
let instance;
let seed = 1;
let index = 2000;
const install = () => {
    Object.defineProperty(Vue.prototype, '$snackbar', {
        get () {
            let id = 'message_' + seed++;
            const alertMsg = options => {
                instance = new SnackbarConstructor({
                    propsData: options
                });
                index++;
                instance.id = id;
                instance.vm = instance.$mount();
                document.body.appendChild(instance.vm.$el);
                instance.vm.$el.style.zIndex = index;
                return instance.vm;
            };
            return alertMsg
        }
    })
};
export default install
