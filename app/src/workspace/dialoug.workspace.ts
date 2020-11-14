
import Dialoug from './dialoug.vue';
import Vue from 'vue';
let dialoug;
export function workspaceDialoug() {
    return new Promise((resolve: (dialoug: {
        open: () => void,
        $once(name: string, fn: (message: string) => void)
    }) => void, reject) => {
        if (!dialoug) {
            dialoug = new Vue({
                el: document.body.appendChild(document.createElement('div')),
                render: (h) => h(Dialoug, { ref: 'dialoug' }),
                mounted() {
                    resolve(this.$refs.dialoug);
                }
            });
        }
        else {
            resolve(dialoug.$refs.dialoug);
        }
    })
}