
import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import index from "./site/index.vue";
import page from "./src/index.vue";
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: index
    },
    {
        path: '/designer',
        component: page
    },
    {
        path: '/view/:id',
        component: page
    }
]
var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;