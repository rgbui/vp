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
    if (word == '') return 0;
    if (!__g) {
        var canvas = document.createElement('canvas')//首先创建一个canvas标签
        __g = canvas.getContext("2d");//把canvas的画笔给调出来
        canvas.style.display = 'none';
    }
    __g.font = `${fontStyle.fontStyle} ${fontStyle.fontVariant} ${fontStyle.fontWeight} ${fontStyle.fontSize}/${fontStyle.lineHeight} ${fontStyle.fontFamily}`;
    return __g.measureText(word).width;
}
export type TextFontStyle={
    fontStyle:string,
    fontVariant:string,
    fontWeight:string,
    fontSize:string,
    lineHeight:string,
    fontFamily:string,
    letterSpacing:string
}
export function getEleFontStyle(ele: HTMLElement):TextFontStyle {
    return {
        fontStyle: util.getStyle(ele, 'fontStyle'),
        fontVariant: util.getStyle(ele, 'fontVariant'),
        fontWeight: util.getStyle(ele, 'fontWeight'),
        fontSize: util.getStyle(ele, 'fontSize'),
        lineHeight: util.getStyle(ele, 'lineHeight'),
        fontFamily: util.getStyle(ele, 'fontFamily'),
        letterSpacing: util.getStyle(ele, 'letterSpacing')
    }
}
