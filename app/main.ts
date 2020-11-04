import Vue from 'vue';
import App from './app.vue';
import Axios from "axios";
import "./style/theme.less";
import "./style/base.less";
// 引入路由
import router from "./router";   // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错
import { user } from './user';
Axios.defaults.baseURL = 'http://api.viewparse.com';
Axios.defaults.withCredentials = true;
var div = document.body.appendChild(document.createElement('div'));
new Vue({
    el: div,
    router,  // 注入到根实例中
    render: h => h(App)
});
user.tryLogin(() => {
    if (user.userInfo) {
        //说明用户现在是登录状态，那么需要跳转相应的页面
    }
});