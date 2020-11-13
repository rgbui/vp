
import Vue from "vue";
import { Events } from "../../../util/events";

export type ContextmenuItem = {

    check?: boolean;
    name?: string;
    icon?: string;
    text?: string;
    type?: "text" | "html" | "devide" | "checked" | "input";
    disabled?: boolean;
    label?: string;
    value?: any;
    childs?:ContextmenuItem[]
}
import VpContextmenu from './contextmenu.vue';

export class Contextmenu extends Events {
    private vc;
    private isMounted: boolean = false;
    constructor() {
        super();
        var self = this;
        var vm = new Vue({
            el: document.body.appendChild(document.createElement('div')),
            render: h => h(VpContextmenu, { ref: 'contextmenu' }),
            data: {},
            mounted() {
                self.isMounted = true;
                self.vc = this.$refs.contextmenu;
                self.vc.$on('mousedown', (data) => {
                    self.emit('mousedown', data.item, data.event);
                });
                self.vc.$on('input', (data) => {
                    self.emit('input', data.item, data.event);
                });
                self.vc.$on('check', data => {
                    self.emit('check', data.item, data.event);
                });
                self.emit('mounted');
            },
            methods: {
                mousedown(item: ContextmenuItem, event) {
                    self.emit('mousedown', item, event);
                },
                input(item: ContextmenuItem, event) {
                    self.emit('input', item, event);
                },
                check(item: ContextmenuItem, event) {
                    self.emit('check', item, event);
                }
            }
        })
    }
    open(menus: ContextmenuItem[], point: { x: number, y: number }) {
        if (this.isMounted == true) {
            this.vc.open(menus, point);
        }
        else {
            this.on('mounted', () => {
                this.open(menus, point);
            })
        }
    }
    private static _contextmenu: Contextmenu;
    static get contextmenu() {
        if (typeof this._contextmenu == 'undefined') this._contextmenu = new Contextmenu();
        return this._contextmenu;
    }
}
export interface Contextmenu {
    on(name: 'mounted', fn: () => void);
    //on(name: 'mousedown', fn: (item: ContextmenuItem, event: MouseEvent) => void);
    //on(name: "input", fn: (item: ContextmenuItem, event: InputEvent) => void);
    //on(name: 'check', fn: (item: ContextmenuItem, event: MouseEvent) => void);
    once(name: 'mousedown', fn: (item: ContextmenuItem, event: MouseEvent) => void);
    once(name: "input", fn: (item: ContextmenuItem, event: InputEvent) => void);
    once(name: 'check', fn: (item: ContextmenuItem, event: MouseEvent) => void);
}