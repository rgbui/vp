import * as Vue from "vue/types/umd";

import DesignerExpress from "../express/desinger.vue";
import { Designer } from "./designer";
export class Designer$Render {
    vm;
    render(this: Designer) {
        var self = this;
        this.vm = new Vue({
            el: this.ele,
            provide() {
                return {
                    designer: self
                }
            },
            render: (h) => h(DesignerExpress)
        });
    }
}