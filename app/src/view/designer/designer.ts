import { Events } from "../../../util/events";
import { util } from "../../../util/util";
import { Page } from "../model/page";
import { Designer$Render } from "./designer.render";
export class Designer extends Events {
    page?: Page;
    ele: HTMLElement;
    constructor(el: HTMLElement) {
        super();
        this.ele = el;
    }
    /**
     * 输入数据，构建对象
     * 有部分的数据载入可能是异步的（如引入别的页面内容）
     * @param data 
     */
    load(data) {
        for (var n in data) {
            if (n == 'page') continue;
            this[n] = data[n];
        }
        this.page = new Page(this);
        if (data.page) this.page.load(data.page);
        else this.page.createDefault();
    }
    /**
     * 读取当前设计器里面设计的数据内容
     */
    get() {
        var json: Record<string, any> = {};
        json.page = this.page.get();
        return json;
    }
}

export interface Designer extends Designer$Render { }
util.inherit(Designer, Designer$Render);