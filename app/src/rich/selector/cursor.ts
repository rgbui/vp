
import { Events } from "../../../util/events";
import { Block } from "../block/block";

import { Editor } from "../editor";
import { getCursorRect, getEleFontStyle, measureTextWidth } from "../util/measure";

export class Cursor {
    /**
    * block组件
    */
    block: Block;
    /**
     * 插槽名
     */
    slotName?: string;
    /**
     * 这是光标聚焦的目标ele无素
     */
    target: HTMLElement;
    /**
     * 当前元素内的值
     */
    value: string;
    /**
     * 光标在元素中的位置
     */
    pos: number = 0;
    /**
     * 光标在元素中的初始距离
     */
    posX: number = 0;
    /**
    * 当前元素所处的文字样式
    */
    fontStyle: Record<string, any>;
    x: number;
    y: number;
    height: number;
    constructor(target: HTMLElement, block: Block, slotName?: string) {
        this.block = block;
        this.target = target;
        this.slotName = slotName;
        this.value = this.target.textContent;
        this.fontStyle = this.fontStyle;
        var rect = this.target.getBoundingClientRect();
        this.x = rect.left;
        this.y = rect.top;
        this.height = rect.height;
    }
    mousedown(event: MouseEvent) {
        var dx = event.pageX - (this.target.getBoundingClientRect().left);
        var ts = this.value.split("");
        let w = 0;
        for (let i = 0; i < ts.length; i++) {
            var d = measureTextWidth(ts[i], this.fontStyle as any);
            if (dx >= w && dx < w + d) {
                if (dx > w + d / 2) {
                    this.posX = w + d;
                    this.pos = i + 1;
                }
                else {
                    this.posX = w;
                    this.pos = i;
                }
                break;
            }
            else {
                w += d;
            }
        }
    }
    inputValue: string;
    get finallyValue() {
        return this.value.slice(0, this.pos) + (this.inputValue || '') + this.value.slice(this.pos);
    }
    get finallyPosX() {
        return this.x + this.posX + measureTextWidth(this.inputValue, this.fontStyle as any);
    }
}

export class CursorBox extends Events {

    private editor: Editor;
    private vm: Vue;    /**
     * 在光标处输入了一串文本
     * @param text 
     */
    input(text: string) {
        if (this.cursor) {
            this.cursor.inputValue = text;
            this.cursor.block.setText(this.cursor.finallyValue);
            this.cursor.target.textContent = this.cursor.finallyValue;

            this.render();
        }
        else throw 'not found cursor'
    }
    /**
     * 回退一格
     */
    back() {

    }
    /**
     * 光标移动
     * @param arrow 
     */
    move(arrow: 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp') {

    }
    constructor(vm: Vue, editor: Editor) {
        super();
        this.vm = vm;
        this.editor = editor;
    }
    cursor: Cursor;
    /**
     * 光标定位元素
     * @param event 
     */
    focus(cursor?: Cursor) {
        this.cursor = cursor;
    }
    get isBlank() {
        return this.cursor ? false : true;
    }
    render() {
        if (this.cursor) {
            (this.vm as any).setPosition({
                left: this.cursor.finallyPosX,
                height: this.cursor.height,
                top: this.cursor.y
            });
        }
    }
    private timer: number;
    open() {
        if (!this.timer)
            this.timer = setInterval(() => {
                if (this.vm.$el) {
                    var el = this.vm.$el as HTMLDivElement;
                    el.style.visibility =
                        el.style.visibility == "hidden" ? "visible" : "hidden";
                }
            }, 600);
    }
    close() {
        if (this.timer) {
            clearInterval(this.timer);
            delete this.timer;
        }
    }

}

