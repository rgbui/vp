import Vue from 'vue';
import App from './app.vue';
import "./style/theme.less";
import "./style/base.less";
// 引入路由
import router from "./router";   // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错
var div = document.body.appendChild(document.createElement('div'));
new Vue({
    el: div,
    router,  // 注入到根实例中
    render:h => h(App)
})