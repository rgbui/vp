import { Events } from "../../util/events";
import { Block } from "./block/block";
import { Cursor } from "./selector/cursor";
import { Selection } from "./selector/selection";
import Vue from "vue";
import EditorView from "./vue/view.vue";
import { EditorMousedownEvent } from "./decare.type";
import { Textarea } from "./selector/textarea";
import { Selector } from "./selector/selector";
export class Editor extends Events {

    private blocks: Block[] = [];
    cursor: Cursor;
    selection: Selection;
    textarea: Textarea;
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
                self.textarea = new Textarea(self.vm.textarea, self);
                self.selection = new Selection(self.vm.selection, self);
                self.cursor = new Cursor(self.vm.cursor, self);
                self.selector = new Selector(self.vm.selector, self);
                var ele = self.vm.$el as HTMLElement;
                ele.addEventListener('mousedown', self.mousedown.bind(self));
                ele.addEventListener('mouseup', self.mouseup.bind(self));
            }
        })
    }
    blur() {
        this.isFocus = false;
        this.cursor.close();
        this.emit("blur");
    }
    private isFocus: boolean = false;
    focus() {
        if (document.activeElement && (this.vm.$el as HTMLElement).contains(document.activeElement)) {
            if (document.activeElement !== this.textarea.textarea) {
                this.textarea.focus();
            }
            return;
        }
        this.textarea.focus();
        this.isFocus = true;
        this.cursor.open();
        this.emit("focus");
    }
    /**
     * 鼠标点击事件时，需要重新确认光标的位置，
     * 这里需要查询鼠标点在什么block上面
     * @param event 
     * 
     */
    mousedown(event: MouseEvent) {
        this.isFocus = true;
        var ele = event.target as HTMLElement;
        var componentEle = ele.closest("[data-name]") as HTMLElement;
        var slotEle = ele.closest("[data-slot]") as HTMLElement;
        if (componentEle && slotEle && !componentEle.contains(slotEle)) {
            slotEle = undefined;
        }
        var component = componentEle ? (componentEle as any).ref : undefined;
        var block = component ? component.block : undefined;
        var ev = {
            event,
            block,
            component,
            target: ele,
            componentEle,
            slotEle,
            slotName: slotEle ? slotEle.getAttribute("data-slot") : undefined,
        };
        this.textarea.textarea.value = '';
        if (!ev.block) {
            this.cursor.block = null;
        }
        if (!this.cursor.block) {
            /**
             * 有可能点在当前行文字左右空白处
             * 还有就是可能点在末尾处理，这里自动创建一个空白处的编辑输入范围
             */
        }
        this.cursor.postion(ev);
    }
    mouseup(event: MouseEvent) {
        this.focus();
    }
    append(block: Block, at?: number) {
        this.blocks.insertAt(typeof at == 'number' ? at : this.blocks.length, block);
    }
    render() {
        this.vm.updateBlocks(this.blocks.map(b => b.viewData));
    }
}