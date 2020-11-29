import { Events } from "../../../util/events";
import { Block } from "../block/block";
import { EditorMousedownEvent } from "../decare.type";
import { Editor } from "../editor";
import { getCursorRect } from "../util/measure";


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
     * 光标移动的方向 上移动，下移动，左移动，右移动，每次移动一格
     * @param arrow 
     */
    move(arrow: 'ArrowDown' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp') {

    }
    /**
     * 光标定位元素
     * @param event 
     */
    postion(event: EditorMousedownEvent) {
        /**
         * 说明是定位在这个block上面，这里需要判断当前的block是否支持编辑
         */
        if (this.block) {
            var ele = event.target;
            if (ele) {
                var rect = getCursorRect(ele, event.event.pageX);
                var editorBound = (this.editor.vm.$el as HTMLDivElement).getBoundingClientRect();
                console.log(editorBound,(this.editor.vm.$el as HTMLDivElement));
                rect.top -= editorBound.top;
                rect.left -= editorBound.left;
                (this.vm as any).setPosition(rect);
                this.offset = rect.offset;
            }
        }
        else {
            /**
             * 说明当前没有block可以定位
             */
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

