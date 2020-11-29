import Vue from "vue";

// Vue.directive('events', function (el, binding, vnode) {
//     let events = binding.value || {};
//     for (let k in events) {
//         let v = events[k];
//         vnode.componentInstance.$off(k, v);
//         vnode.componentInstance.$on(k, v);
//     } 
// })  