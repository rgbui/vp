import { Events } from "../../util/events";
import { Block } from "./block";
import { BlockType } from "./block.type";
import { Cursor } from "./cursor";

import "./editor.less";
import { Selection } from "./selection";

export class Editor extends Events {
    private el: HTMLElement;
    private textarea: HTMLTextAreaElement;
    private contentEl: HTMLDivElement;
    private blocks: Block[] = [];
    cursor: Cursor;
    selection: Selection;
    constructor(el: HTMLElement, options: {
        width: number,
        height: number
    }) {
        super();
        var self = this;
        this.el = el;
        this.el.innerHTML = `<div class='editor-box' tabindex='1'>
            <textarea></textarea>
            <div class='editor-box-cursor'></div>
            <div class='editor-box-range'></div>
            <div class='editor-box-content'></div>
        </div>`;
        this.el.style.width = options.width + "px";
        this.el.style.height = options.height + "px";
        this.textarea = this.el.querySelector('textarea');

        this.contentEl = this.el.querySelector('.editor-box-content');
        this.cursor = new Cursor(this.el.querySelector('.editor-box-cursor'), self);
        this.selection = new Selection(this.el.querySelector('.editor-box-range'), self);
        this.el.addEventListener('focusout', function (event) {
            if (!self.el.contains(event.relatedTarget as HTMLElement) && self.el !== (event.relatedTarget as HTMLElement)) {
                self.blur(event);
            }
        });
        this.el.addEventListener('focusin', function (event) {
            if (!self.el.contains(event.relatedTarget as HTMLElement) && self.el !== (event.relatedTarget as HTMLElement)) {
                self.focus(event);
            }
        });
        this.el.addEventListener('mousedown', self.mousedown.bind(this));
        this.textarea.addEventListener('keydown', self.keydown.bind(self));
    }
    blur(event: FocusEvent) {
        if (this.cursor.block) {
            delete this.cursor.block;
            delete this.cursor.offset;
        }
        this.emit('blur', event);
    }
    focus(event: FocusEvent) {
        this.emit('focus', event);
    }
    /**
     * 鼠标点击事件时，需要重新确认光标的位置，
     * 这里需要查询鼠标点在什么block上面
     * @param event 
     * 
     */
    mousedown(event: MouseEvent) {
        if (document.activeElement !== this.textarea) { this.textarea.value = ''; this.textarea.focus(); }

    }
    keydown(even: KeyboardEvent) {
        if (!this.cursor.block) {
            var newBlock = this.createBlock();
            this.cursor.block = newBlock;
            this.cursor.offset = 0;
        }
    }
    createBlock() {
        var block = new Block();
        block.type = BlockType.text;
        return block;
    }
}