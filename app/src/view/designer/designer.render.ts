import * as Vue from "vue/types/umd";

import DesignerExpress from "../express/desinger.vue";
import { Designer } from "./designer";
Vue.component('designer', DesignerExpress);

export class Designer$Render {
    vm;
    render(this: Designer) {
        var self = this;
        this.vm = new Vue({
            el: this.ele.appendChild(document.createElement('div')),
            data: this.getRenderProps(),
            provide() {
                return {
                    designer: self
                }
            },
            template: `<designer :page='page' ></designer>`
        });
    }
    getRenderProps(this: Designer) {
        var json: Record<string, any> = {};
        json.page = this.page.getRenderProps();
        return json;
    }
}