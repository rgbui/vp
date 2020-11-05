
import { Events } from "../../util/events";

import Vue from "vue";

import login from './login.view.vue';

export class LoginDialoug extends Events {
    constructor() {
        super();
        this.render();
    }
    private lg;
    private render() {
        var self = this;
        new Vue({
            el: document.body.appendChild(document.createElement('div')),
            render: (h) => h(login, { ref: 'login' }),
            mounted() {
                self.lg = this.$refs.login;
            }
        })
    }
    open() {
        if (this.lg) this.lg.open();
    }
    private static _dialoug: LoginDialoug;
    static get dialoug() {
        if (!this._dialoug) this._dialoug = new LoginDialoug();
        return this._dialoug
    }
}
