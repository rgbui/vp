import { Events } from "../../../util/events";
import { Block } from "../block/block";
import { BlockType } from "../block/block.type";
import { Editor } from "../editor";

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
                //正常的编辑
                if (this.editor.cursor.block) {
                    this.editor.cursor.block.updateText(this.textarea.value, this.editor.cursor.offset);
                    this.editor.render();
                }
                else throw 'the cursor block is not found'
            }
            else {
                //删除下一个字符
            }
        }
        else if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            this.editor.cursor.move(event.key as any);
        }
        else if (event.key == 'Enter') {

        }
        else {
            if (!this.editor.cursor.block) {
                var newBlock = Block.createBlock(this.editor,
                    { type: BlockType.text, props: [{ name: 'text', val: this.textarea.value }] }
                );
                this.editor.cursor.block = newBlock;
                this.editor.cursor.offset = 0;
            }
            this.editor.cursor.block.updateText(this.textarea.value, this.editor.cursor.offset);
            this.editor.render();
        }
    }
    paster(event: ClipboardEvent) {

    }
}