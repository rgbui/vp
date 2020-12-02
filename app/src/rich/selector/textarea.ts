import { Events } from "../../../util/events";
import { Block } from "../block/block";
import { BlockType } from "../block/block.type";
import { Editor } from "../editor";
import { getEleFontStyle } from "../util/measure";
import { Cursor } from "./cursor";

export class Textarea extends Events {
    private vm: Vue;
    private editor: Editor;
    constructor(vm: Vue, editor: Editor) {
        super();
        this.vm = vm;
        this.editor = editor;
        this.textarea.addEventListener('blur', this.blur.bind(this));
        this.textarea.addEventListener('keyup', this.keyup.bind(this));
        this.textarea.addEventListener('paster', this.paster.bind(this));
    }
    get textarea(): HTMLTextAreaElement {
        return (this.vm as any).textarea;
    }
    blur(event: FocusEvent) {
        if (!event.relatedTarget) this.editor.blur()
        else if ((this.editor.vm.$el as HTMLDivElement).contains(event.relatedTarget as HTMLDivElement)) {
            this.editor.blur();
        }
    }
    focus() {
        if (document.activeElement !== this.textarea) {
            this.textarea.focus();
        }
    }
    keyup(event: KeyboardEvent) {
        if (event.key == 'Backspace' || event.key == 'Delete') {
            if (this.textarea.value) {
                this.editor.cursorBox.input(this.textarea.value);
            }
            else {
                //这里主要是判断当前的输入是否已同步至光标输入中，此时输入框是空的，但这是刚按下的，在按前可能还值
                //如果按前本身就是空的，那说明用户是想回退删除文本
                this.editor.cursorBox.back();
            }
        }
        else if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            this.editor.cursorBox.move(event.key as any);
        }
        else if (event.key == 'Enter') {
            //聚焦到输入空白处
            this.editor.cursorBox.focus();
        }
        else {
            if (this.editor.cursorBox.isBlank) {
                var newBlock = Block.createBlock(this.editor,
                    {
                        type: BlockType.rowText, props: [
                            { name: 'text', val: this.textarea.value },
                            { name: 'height', val: 20 }
                        ]
                    }
                );
                newBlock.once('mounted', () => {
                    var cursor = new Cursor(newBlock.ele, newBlock);
                    this.editor.cursorBox.focus(cursor);
                    this.editor.cursorBox.input(this.textarea.value);
                })
                this.editor.render();
            }
            else {
                this.editor.cursorBox.input(this.textarea.value);
            }
        }
    }
    paster(event: ClipboardEvent) {

    }
}