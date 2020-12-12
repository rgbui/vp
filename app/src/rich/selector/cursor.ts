import { Events } from "../../../util/events";
import { Block } from "../block/block";
import { getEleFontStyle, measureTextWidth, TextFontStyle } from "../util/measure";
import { Selector } from "./selector";

export class Cursor extends Events {
    private selector: Selector;
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
    pos: number;
    x: number;
    col: number;
    /**
     * 行号
     */
    row: number;
    get y() {
        return this.row * this.lineHeight;
    }
    /**
    * 当前元素所处的文字样式
    */
    fontStyle: TextFontStyle
    get lineHeight() {
        return parseFloat(this.fontStyle.lineHeight.replace(/px/g, ''))
    }
    get letterSpacing() {
        return parseFloat(this.fontStyle.letterSpacing.replace(/px/g, ''))
    }
    rect: { x: number, y: number, width: number, height: number }
    constructor(selector: Selector) {
        super();
        this.selector = selector;
        this.block = this.selector.element.block;
        this.target = this.selector.element.ele;
        this.slotName = this.selector.element.slotName;
        this.value = this.target.textContent;
        this.fontStyle = getEleFontStyle(this.target);
        var rect = this.target.getBoundingClientRect();
        this.rect = {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        }
    }
    mousedown(event: MouseEvent) {
        var dx = event.pageX - this.rect.x;
        var dy = event.pageY - this.rect.y;
        this.setOffset(dx, dy);
    }
    /**
     * 通过鼠标点击确认光标位置
     * @param event 
     */
    setOffset(dx: number, dy: number) {
        var ts = this.value.split("");
        var w = 0;
        var h = 0;
        var col = 0;
        var i = 0;
        this.row = Math.floor(dy / this.lineHeight);
        for (; i < ts.length; i++) {
            var word = ts[i];
            var d = measureTextWidth(word, this.fontStyle) + this.letterSpacing;
            if (h < this.row) {
                if (w + d < this.rect.width)
                    w += d;
                else {
                    h += 1;
                    w = 0;
                    col = 0;
                }
            }
            if (h == this.row) {
                if (dx >= w && dx < w + d) {
                    if (dx > w + d / 2) {
                        w += d;
                        i += 1;
                        col += 1;
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    w += d;
                    col += 1;
                }
            }
        }
        this.x = w;
        this.pos = i;
        this.col = col;
    }
    /**
     * 通过字符的位置确认光标位置
     * @param pos 
     */
    setPos(pos: number) {
        var ts = this.value.split("");
        var w = 0;
        var h = 0;
        var col = 0;
        var i = 0;
        for (i; i <= pos; i++) {
            var word = ts[i];
            var d = measureTextWidth(word, this.fontStyle) + this.letterSpacing;
            if (w + d < this.rect.width) { w += d; col += 1; }
            else {
                h += 1;
                w = 0;
                col = 0;
            }
        }
        this.x = w;
        this.pos = i;
        this.col = col;
        this.row = h;
    }
    /**
     * 水平移动
     * @param pos -1 1 正向移动或负向移动
     */
    horizontal(pos: number) {
        if (pos > 0) {
            var word = this.value.slice(pos, pos + 1);
            var d = measureTextWidth(word, this.fontStyle) + this.letterSpacing;
            if (this.x + d > this.rect.x) {
                this.pos += 1;
                this.setPos(this.pos)
            }
            else {
                this.x += d;
                this.pos += 1;
                this.col += 1;
            }
        }
        else if (pos < 0) {
            if (this.col == 1 && this.row > 0) {
                this.pos -= 1;
                this.setPos(this.pos);
            }
            else if (this.col == 1 && this.row == 0 || this.col > 1 && this.row > 0) {
                var word = this.value.slice(pos - 1, pos);
                var d = measureTextWidth(word, this.fontStyle) + this.letterSpacing;
                this.x -= d;
                this.pos -= 1;
                this.col -= 1;
            }
        }
    }
    inputValue: string;
    get finallyInput() {
        var ts = this.inputValue.split('');
        var i = 0;
        var x = this.x;
        var y = this.y;
        var pos = this.pos + ts.length;
        var col = this.col;
        var row = this.row;
        for (; i < ts.length; i++) {
            var d = measureTextWidth(ts[i], this.fontStyle) + this.letterSpacing;
            if (x + d > this.rect.width) {
                x = d;
                y += this.lineHeight;
                col = 1;
                row += 1;
            }
            else {
                x += d;
                col += 1;
            }
        }
        return {
            x,
            y,
            row,
            col,
            pos,
            value: this.value.slice(0, this.pos) + (this.inputValue || '') + this.value.slice(this.pos)
        }
    }
    /**
     * 1.输入时光标向前移动
     * 2.输入文字时，当前行满了，光标移到下一位
     */
    input(text: string) {
        this.inputValue = text;
    }
    /**
     * 1.正常回退
     * 2.回退光标退到上一行
     * 3.元素回退完了
     */
    back() {
        if (this.col == 0 && this.row == 0) {

        }
        else {
            var pos = this.pos;
            this.horizontal(-1);
            this.value = this.value.slice(0, pos - 1) + this.value.slice(pos);
        }
    }
    /**
     * 左右移动时会
     * 1. 换行，上行或下行。如果碰到换行符，那么换到上行时，还要计算结束位置
     * 2. 正常的移动
     * 3. 移到上一个元素或下一个元素
     * 上下换行
     * 1. 换行，上行或下行。如果碰到换行符，那么换到上行时，还要计算结束位置
     * 2. 移动上一个元素或下一个元素
     * @param arrow 
     * 
     */
    move(arrow: 'ArrowRight' | 'ArrowLeft' | 'ArrowDown' | 'ArrowUp') {
        if (arrow == 'ArrowLeft') {
            if (this.col == 0 && this.row == 0) {

            }
            else this.horizontal(-1);
        }
        else if (arrow == 'ArrowRight') {
            if (this.pos == this.value.length) {

            }
            else this.horizontal(1)
        }
        else if (arrow == 'ArrowDown') {
            if (this.row == this.rowCount) {
                //
            }
            else {
                this.setOffset(this.x, this.y + this.lineHeight / 2);
            }
        }
        else if (arrow == 'ArrowUp') {
            if (this.row == 0) {

            }
            else {
                this.setOffset(this.x, this.y - this.lineHeight / 2);
            }
        }
    }
    /**
     * 计算总行数
     */
    get rowCount() {
        var ts = this.value.split("");
        var w = 0;
        var h = 0;
        var col = 0;
        var i = 0;
        for (i; i <= ts.length; i++) {
            var word = ts[i];
            var d = measureTextWidth(word, this.fontStyle) + this.letterSpacing;
            if (w + d < this.rect.width) { w += d; col += 1; }
            else {
                h += 1;
                w = 0;
                col = 0;
            }
        }
        return h;
    }
}