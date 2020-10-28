import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import index from "./site/index.vue";
import reg from "./site/reg.vue";
import login from "./site/login.vue";
// import about from "./about.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: index
    },
    {
        path: "/login",
        component: login
    },
    {
        path: "/reg",
        component: reg
    },
]
var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;