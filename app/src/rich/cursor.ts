import { Events } from "../../util/events";
import { Block } from "./block";
import { Editor } from "./editor";

export class Cursor extends Events {
    private el: HTMLElement;
    private editor: Editor;
    constructor(el: HTMLElement, editor: Editor) {
        super();
        this.el = el;
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
}