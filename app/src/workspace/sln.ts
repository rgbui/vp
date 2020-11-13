import Vue from 'vue';
import { Events } from '../../util/events';
import VpTree from "../components/present/tree.vue";
export class Sln extends Events {
    vm;
    tree;
    constructor(el: HTMLElement) {
        super();
        var self = this;
        this.vm = new Vue({
            el: el.appendChild(document.createElement('div')),
            render:(h)=>h(VpTree,{ ref: 'tree' }),
            mounted() {
                self.tree = this.$refs.tree;
            }
        })
    }
}