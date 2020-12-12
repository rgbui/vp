import { Events } from "../../util/events";
import { Block } from "./block/block";
import { Cursor } from "./selector/cursor";

import Vue from "vue";
import EditorView from "./vue/view.vue";
import { Selector } from "./selector/selector";
export class Editor extends Events {
    private blocks: Block[] = [];

    selector: Selector;
    vm;
    constructor(el: HTMLElement, options: {
        width: number,
        height: number
    }) {
        super();
        var self = this;
        new Vue({
            el: el.appendChild(document.createElement('div')),
            render: (h) => {
                return h(EditorView, {
                    ref: 'editor-view',
                    props: { width: options.width, height: options.height }
                })
            },
            computed: {
                editorView() {
                    return this.$refs['editor-view'];
                }
            },
            mounted() {
                self.vm = this.editorView;
                self.selector = new Selector(self.vm.selector, self);
                var ele = self.vm.$el as HTMLElement;
                ele.addEventListener('mousedown', self.mousedown.bind(self));
                ele.addEventListener('mouseup', self.mouseup.bind(self));
            }
        })
    }
    blur() {
        this.isFocus = false;
        // this.cursorView.close();
        this.emit("blur");
    }
    private isFocus: boolean = false;
    focus() {
        this.isFocus = true;
        this.emit('focus');
        // if (document.activeElement && (this.vm.$el as HTMLElement).contains(document.activeElement)) {
        //     if (document.activeElement !== this.textarea.textarea) {
        //         this.textarea.focus();
        //     }
        //     return;
        // }
        // this.textarea.focus();
        // this.isFocus = true;
        // this.cursorView.open();
        // this.emit("focus");
    }
    /**
     * 鼠标点击事件时，需要重新确认光标的位置，
     * 这里需要查询鼠标点在什么block上面
     * @param event 
     * 
     */
    mousedown(event: MouseEvent) {
        this.focus();
        this.selector.selectBlockByContentMousedown(event);
        var ele = event.target as HTMLElement;
        var componentEle = ele.closest("[data-name]") as HTMLElement;
        var slotEle = ele.closest("[data-slot]") as HTMLElement;
        if (componentEle && slotEle && !componentEle.contains(slotEle)) {
            slotEle = undefined;
        }
        var component = componentEle ? (componentEle as any).ref : undefined;
        var block = component ? component.block : undefined;
        var slotName = slotEle ? slotEle.getAttribute("data-slot") : undefined;
        // if (!block) {
        //     //这里需要 有可能点在当前行文字左右空白处
        // }
        // if (block) {
        //     var cursor = new Cursor(ele, block, slotName);
        //     cursor.mousedown(event);
        //     this.cursorView.focus(cursor);
        // }
        // else this.cursorView.focus();
    }
    mouseup(event: MouseEvent) {
        /**
         * 如果处于聚焦，但焦点没有处于textarea时，需要聚焦到textarea才能输入
         */
        if (this.isFocus == true && !this.selector.focusIsInTextearea)
            this.selector.focusTextearea()
    }
    append(block: Block, at?: number) {
        this.blocks.insertAt(typeof at == 'number' ? at : this.blocks.length, block);
    }
    render() {
        this.vm.updateBlocks(this.blocks.map(b => b.viewData));
    }
    get ele(): HTMLElement {
        return this.vm.$el as HTMLElement;
    }
}