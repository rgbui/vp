
import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import index from "./site/index.vue";
import page from "./src/index.vue";
import testComponent from "./test/component.vue";
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
let routes:any[] = [
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
];
if (MODE == 'dev') {
    routes.push(
        {
            path: '/test/component',
            component: testComponent
        }
    )
}
var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;