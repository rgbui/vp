import { util } from "../../../util/util";

let __g: CanvasRenderingContext2D;
/**
 * 测量字体的宽度
 * https://www.w3school.com.cn/tags/canvas_font.asp
 * https://www.jb51.net/article/155865.htm
 */
export function measureTextWidth(word: string, fontStyle: {
    fontStyle: string,
    fontVariant: string,
    fontWeight: string,
    fontSize: string,
    lineHeight: string,
    fontFamily: string,
}) {
    if (!__g) {
        var canvas = document.createElement('canvas')//首先创建一个canvas标签
        __g = canvas.getContext("2d");//把canvas的画笔给调出来
        canvas.style.display = 'none';
    }
    __g.font = `${fontStyle.fontStyle} ${fontStyle.fontVariant} ${fontStyle.fontWeight} ${fontStyle.fontSize}/${fontStyle.lineHeight} ${fontStyle.fontFamily}`;
    return __g.measureText(word).width;
}
export function getEleFontStyle(ele: HTMLElement) {
    return {
        fontStyle: util.getStyle(ele, 'fontStyle'),
        fontVariant: util.getStyle(ele, 'fontVariant'),
        fontWeight: util.getStyle(ele, 'fontWeight'),
        fontSize: util.getStyle(ele, 'fontSize'),
        lineHeight: util.getStyle(ele, 'lineHeight'),
        fontFamily: util.getStyle(ele, 'fontFamily')
    }
}
export function getCursorRect(ele: HTMLElement, left: number) {
    var bound = ele.getBoundingClientRect();
    var dx = left - bound.left;
    var text = ele.textContent;
    var ts = text.split("");
    var w = 0;
    var fontStyle = getEleFontStyle(ele);
    var rect: { top: number, left: number, height: number, offset: number } = { top: bound.top, height: bound.height } as any;
    for (let i = 0; i < ts.length; i++) {
        var d = measureTextWidth(ts[i], fontStyle);
        if (dx >= w && dx < w + d) {
            if (dx > w + d / 2) {
                rect.left = w + d + bound.left;
                rect.offset = i + 1;
            }
            else { rect.left = w + bound.left; rect.offset = i; }
            break;
        }
        else {
            w += d;
        }
    }
    if (typeof rect.left == 'undefined') { rect.left = w + bound.left; rect.offset = ts.length; }
    return rect;
}