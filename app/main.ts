import "./util/array";
import Vue from 'vue';
import App from './app.vue';
import Axios from "axios";
import "./assert/style/theme.less";
import "./assert/style/base.less";
// 引入路由
import router from "./router";   // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错
import { user } from './user';
import "./src/components/declare.components";
Vue.config.silent = true;
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.backspace = 8;
Vue.config.keyCodes.del = 46;
Vue.config.keyCodes.space = 32;
Vue.config.keyCodes.esc = 27;

Axios.defaults.baseURL = HOST;
Axios.defaults.withCredentials = true;
var div = document.body.appendChild(document.createElement('div'));
new Vue({
    el: div,
    router,  // 注入到根实例中
    render: h => h(App, { ref: 'app', props: { loading: true } }),
    created() {
        user.tryLogin(() => {
            if (user.userInfo) {
                //说明用户现在是登录状态，那么需要跳转相应的页面
                //location.href = '/designer'
                if (this.$router.currentRoute.name == 'index') {
                    this.$router.push({ name: 'designer' });
                }
            }
            if (this.app)
                this.app.loading = false;
        });
    },
    computed: {
        app() {
            return this.$refs.app;
        }
    }

});
