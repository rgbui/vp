
import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import index from "./site/index.vue";
import page from "./src/index.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
let routes: any[] = [
    {
        name: 'index',
        path: "/",
        component: index
    },
    {
        name: 'designer',
        path: '/designer',
        component: page
    }
];
if (MODE == 'dev') {
    routes.push(
        {
            name: 'test',
            path: '/test/component',
            component: () => import('./test/component.vue')
        }
    )
}
var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;