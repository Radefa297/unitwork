import Vue from 'vue'
import {mount} from '@vue/test-utils'
import login from '@/components/login/login.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify);
const apiUrl = {
    Authenticate : 'http://183.233.172.205:21021/api/api/TokenAuth/Authenticate'
};
const axios = require('axios');
describe('login.vue 校验测试用例', () => {
    const wrapper = mount(login);
    let vm = wrapper.vm;
    it('用户名/密码为空时是否触发校验，提示输入内容不能为空并禁止提交表单', () => {
        wrapper.find('.v-btn').trigger('click');
        const message = wrapper.find('.v-messages__message');
        expect(message.text()).toEqual('输入内容不能为空');
        // expect(vm.$refs.formLabelAlign.validate().toBe(false))
    });

    it('Failed to login if typing 12345@qq.com & 123456', async () => {
        await axios.post(apiUrl.Authenticate, {
            userNameOrEmailAddress: '12345@qq.com',
            password: '123',
        }).catch((err: {
            response: any;
        }) => {
            expect(err.response.data.success).toBe(false);
            expect(err.response.data.error.details).toBe('Invalid user name or password')
        })
    });

    it('Successed to login if typing 12345@qq.com & 123456', async () => {
        await axios.post(apiUrl.Authenticate, {
            userNameOrEmailAddress: 'admin',
            password: 'qwe123',
        }).then((res: {
            response: any;
        }) => {
            expect(res.response.data.success).toBe(true);
            expect(res.response.status).toBe(200)
        })

    });
});
