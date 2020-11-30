import { Events } from "../../../util/events";
import { Block } from "../block/block";
import { EditorMousedownEvent } from "../decare.type";
import { Editor } from "../editor";
import { getCursorRect, getEleFontStyle, measureTextWidth } from "../util/measure";


export class Cursor extends Events {

    private editor: Editor;
    private vm: Vue;
    constructor(vm: Vue, editor: Editor) {
        super();
        this.vm = vm;
        this.editor = editor;
    }
    /**
     * 光标所在的block元素
     */
    block: Block;
    /**
     * 光标所在的block元素中文本的偏移位置
     */
    offset: number;
    /**
     * 光标在bock所在的偏移位置上移动了距离
     */
    offsetCount: number;
    /**
     * 当标点击所处的文字样式
     */
    fontStyle: Record<string, any>;
    /**
     * 光标点击所在初始位置
     */
    x: number;
    y: number;
    h: number;
    /**
     * 光标移动的方向 上移动，下移动，左移动，右移动，每次移动一格
     * @param arrow 
     */
    move(arrow: 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp') {

        if (arrow == 'ArrowLeft') {
            if (this.offset > 0) {
                var w = this.block.getText(this.offset - 1, this.offset);
                this.x = this.x - measureTextWidth(w, this.fontStyle as any);
                this.offset -= 1;
                (this.vm as any).setPosition({ left: this.x + w, height: this.h, top: this.y });
            }
            else {
                //说明走完了
            }
        }
        else if (arrow == 'ArrowRight') {

        }
        else if (arrow == 'ArrowDown') {

        }
        else if (arrow == 'ArrowUp') {

        }
    }

    /**
     * 光标定位元素
     * @param event 
     */
    postion(event: EditorMousedownEvent) {
        console.log(this.block);
        /**
         * 说明是定位在这个block上面，这里需要判断当前的block是否支持编辑
         */
        if (this.block) {
            var ele = event.target;
            if (ele) {
                this.fontStyle = getEleFontStyle(ele);
                var rect = getCursorRect(ele, event.event.pageX);
                var editorBound = (this.editor.vm.$el as HTMLDivElement).getBoundingClientRect();
                rect.top -= editorBound.top;
                rect.left -= editorBound.left;
                this.y = rect.top;
                this.x = rect.left;
                this.h = rect.height;
                (this.vm as any).setPosition(rect);
                this.offset = rect.offset;
                this.offsetCount = 0;
            }
        }
        else {
            /**
             * 说明当前没有block可以定位
             */
        }
    }
    /**
     * 正在输入word，此时光标会伴随着移动，
     * 注意到边缘区需要换行
     * @param word 
     */
    keydownPosition(word: string) {
        if (this.fontStyle) {
            var w = measureTextWidth(word, this.fontStyle as any);
            (this.vm as any).setPosition({ left: this.x + w, height: this.h, top: this.y });
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

