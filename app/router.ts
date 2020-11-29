
import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import index from "./site/index.vue";
import page from "./src/index.vue";
import createWorkspace from "./src/workspace/create.vue";
import page_500 from "./site/500.vue";
import page_404 from "./site/404.vue";
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
let routes: any[] = [
    {
        name: 'index',
        path: '/',
        component: () => import('./test/editor.vue')
    },
    {
        name: 'designer',
        path: '/designer',
        component: page
    },
    {
        name: 'createWorkspace',
        path: '/workspace/create',
        component: createWorkspace
    },
    {
        name: '500',
        path: '/error',
        component: page_500
    },
    {
        name: '404',
        path: '*',
        component: page_404
    }
];
if (MODE == 'dev') {
    routes.push(
        {
            name: 'test',
            path: '/test/component',
            component: () => import('./test/component.vue')
        }
    );
    routes.push({
        name: 'editor',
        path: '/editor',
        component: () => import('./test/editor.vue')
    })
}
var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;